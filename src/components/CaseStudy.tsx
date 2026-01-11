'use client';

import React, { useEffect, useState } from 'react';
import { getCaseStudy, incrementCaseStudyViews } from '@/services/api';
import CommentSection from './CommentSection';

interface CaseStudyProps {
  slug: string;
}

export default function CaseStudy({ slug }: CaseStudyProps) {
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const data = await getCaseStudy(slug);
        setCaseStudy(data);
        // Increment view count
        await incrementCaseStudyViews(slug);
      } catch (err) {
        setError('Failed to load case study. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="text-[var(--text-secondary)] text-center py-8">
        <p>Case study not found.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          {caseStudy.title}
        </h1>
        <div className="flex items-center space-x-4 text-[var(--text-secondary)]">
          <span>Client: {caseStudy.client}</span>
          <span>•</span>
          <span>Industry: {caseStudy.industry}</span>
          <span>•</span>
          <span>{caseStudy.views} views</span>
        </div>
      </header>

      {caseStudy.cover_image && (
        <div className="mb-8">
          <img
            src={caseStudy.cover_image}
            alt={caseStudy.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-[var(--text-primary)]">
        <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Results</h2>
        <div dangerouslySetInnerHTML={{ __html: caseStudy.results }} />
      </div>

      <div className="mt-8 pt-8 border-t border-border">
        <CommentSection caseStudy={slug} />
      </div>
    </article>
  );
} 