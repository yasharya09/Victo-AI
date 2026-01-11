'use client';

import React, { useEffect, useState } from 'react';
import { getBlogPost, incrementBlogPostViews } from '@/services/api';
import CommentSection from './CommentSection';

interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogPost(slug);
        setPost(data);
        // Increment view count
        await incrementBlogPostViews(slug);
      } catch (err) {
        setError('Failed to load blog post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
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

  if (!post) {
    return (
      <div className="text-[var(--text-secondary)] text-center py-8">
        <p>Blog post not found.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-[var(--text-secondary)]">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{new Date(post.published_at).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.views} views</span>
        </div>
      </header>

      {post.cover_image && (
        <div className="mb-8">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none text-[var(--text-primary)]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-8 pt-8 border-t border-border">
        <CommentSection blogPost={slug} />
      </div>
    </article>
  );
} 