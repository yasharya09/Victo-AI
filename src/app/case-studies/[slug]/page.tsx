'use client';

import React, { useEffect, useState } from 'react';
import { contentService, CaseStudy } from '@/services/content';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { formatDate } from '@/lib/utils';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const resolvedParams = await params;
        const caseStudyData = await contentService.getCaseStudyBySlug(resolvedParams.slug);
        setCaseStudy(caseStudyData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {error || 'Case study not found'}
          </h1>
          <p className="text-muted-foreground">
            The case study you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-foreground transition-colors">
                Home
              </a>
              <span>/</span>
              <a href="/case-studies" className="hover:text-foreground transition-colors">
                Case Studies
              </a>
              <span>/</span>
              <span className="text-foreground">{caseStudy.title}</span>
            </nav>

            {/* Case Study Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {caseStudy.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span>{formatDate(caseStudy.published_date)}</span>
                {caseStudy.client && <span>Client: {caseStudy.client.name}</span>}
                {caseStudy.industry && <span>Industry: {caseStudy.industry}</span>}
              </div>
            </div>

            {/* Cover Image */}
            {caseStudy.cover_image && (
              <div className="mb-8">
                <img
                  src={caseStudy.cover_image}
                  alt={caseStudy.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Summary */}
            {caseStudy.summary && (
              <div className="mb-8 p-6 bg-card rounded-lg border border-border">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Summary</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.summary}
                </p>
              </div>
            )}

            {/* Case Study Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent-cyan prose-blockquote:border-l-accent-cyan">
              <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
            </div>

            {/* Key Results */}
            {caseStudy.key_results && caseStudy.key_results.length > 0 && (
              <div className="mt-12 p-6 bg-card rounded-lg border border-border">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Key Results</h2>
                <ul className="space-y-2">
                  {caseStudy.key_results.map((result, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-accent-cyan mt-1">•</span>
                      <span className="text-muted-foreground">{result.title}: {result.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Case Study Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center gap-4">

                
                {caseStudy.categories && caseStudy.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.categories.map((category) => (
                      <span
                        key={category.id}
                        className="px-3 py-1 text-sm rounded-full bg-accent-purple/20 text-accent-purple"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
} 