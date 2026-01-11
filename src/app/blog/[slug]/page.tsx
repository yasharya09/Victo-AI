'use client';

import React, { useEffect, useState } from 'react';

import { contentService, BlogPost } from '@/services/content';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const resolvedParams = await params;
        const postData = await contentService.getBlogPostBySlug(resolvedParams.slug);
        setPost(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {error || 'Blog post not found'}
          </h1>
          <p className="text-muted-foreground">
            The blog post you're looking for doesn't exist or has been removed.
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
              <a href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </a>
              <span>/</span>
              <span className="text-foreground">{post.title}</span>
            </nav>

            {/* Post Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span>{formatDate(post.published_date)}</span>
                {post.author && <span>by {post.author.name}</span>}
                {post.read_time && <span>{post.read_time} min read</span>}
              </div>
            </div>

            {/* Cover Image */}
            {post.cover_image && (
              <div className="mb-8">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent-cyan prose-blockquote:border-l-accent-cyan">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Post Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap items-center gap-4">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 text-sm rounded-full bg-accent-cyan/20 text-accent-cyan"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
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
