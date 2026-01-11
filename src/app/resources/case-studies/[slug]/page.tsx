'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { contentService, CaseStudy } from "@/services/content";

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const fetchedCaseStudy = await contentService.getCaseStudyBySlug(slug);
        setCaseStudy(fetchedCaseStudy);
      } catch (err) {
        console.error("Failed to fetch case study:", err);
        setError("Failed to load case study. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudy();
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-[var(--text-primary)]">Loading case study...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error: {error}</div>;
  }

  if (!caseStudy) {
    return <div className="flex justify-center items-center h-screen text-xl text-[var(--text-primary)]">Case study not found.</div>;
  }

  const pageUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/resources/case-studies/${caseStudy.slug}`;

  const socialShareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(caseStudy.title)}&url=${encodeURIComponent(pageUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/resources/case-studies"
            className="text-accent-cyan hover:text-accent-teal"
          >
            Case Studies
          </Link>
          {caseStudy.industry && (
            <>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-muted)]">{caseStudy.industry}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">{caseStudy.title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {caseStudy.client && (
              <Image
                src={caseStudy.client.logo || '/images/default-company-logo.jpg'}
                alt={caseStudy.client.name}
                width={48}
                height={48}
                className="rounded-lg bg-muted"
              />
            )}
            <div>
              <p className="font-medium text-[var(--text-primary)]">{caseStudy.client?.name || 'Anonymous Client'}</p>
              <p className="text-sm text-[var(--text-muted)]">{caseStudy.industry || ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[var(--text-muted)]">
            <span>{new Date(caseStudy.published_date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{caseStudy.read_time} min read</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="aspect-video bg-muted rounded-lg mb-12 overflow-hidden">
        {caseStudy.cover_image ? (
          <Image
            src={caseStudy.cover_image}
            alt={caseStudy.title}
            width={1200}
            height={675}
            layout="responsive"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            [No Featured Image]
          </div>
        )}
      </div>

      {/* Social Share */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-[var(--text-muted)]">Share:</span>
        <div className="flex gap-3">
          <a
            href={socialShareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-accent-cyan"
            aria-label="Share on Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a
            href={socialShareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-accent-cyan"
            aria-label="Share on LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href={socialShareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-accent-cyan"
            aria-label="Share on Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <button
            onClick={handleCopyLink}
            className="text-[var(--text-muted)] hover:text-accent-cyan flex items-center gap-1"
            aria-label="Copy link to clipboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Copy Link</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <article
        className="prose dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: caseStudy.content }}
      />

      {/* Key Results */}
      {caseStudy.key_results && caseStudy.key_results.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Key Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.key_results.map((result, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">{result.title}</h3>
                <p className="text-[var(--text-secondary)]">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technologies Used */}
      {caseStudy.technologies && caseStudy.technologies.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {caseStudy.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Case Studies */}
      {caseStudy.related_case_studies && caseStudy.related_case_studies.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Related Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudy.related_case_studies.map((relatedCaseStudy, index) => (
              <Link href={`/resources/case-studies/${relatedCaseStudy.slug}`} key={index}>
                <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">{relatedCaseStudy.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm flex-grow mb-4">{relatedCaseStudy.excerpt}</p>
                  <p className="text-xs text-[var(--text-muted)]">{new Date(relatedCaseStudy.published_date).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}