'use client';

import React, { useState, useEffect } from 'react';
import { getComments, createComment } from '@/services/api';
import Comment from './Comment';

interface CommentData {
  id: number;
  content: string;
  author: string;
  created_at: string;
  replies: CommentData[];
  blog_post?: string;
  case_study?: string;
}

interface CommentSectionProps {
  blogPost?: string;
  caseStudy?: string;
}

export default function CommentSection({ blogPost, caseStudy }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const data = await getComments({
        blog_post: blogPost,
        case_study: caseStudy,
      });
      setComments(data.data || []);
    } catch (err) {
      setError('Failed to load comments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogPost, caseStudy]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      await createComment({
        content: newComment,
        blog_post: blogPost ? Number(blogPost) : undefined,
        case_study: caseStudy ? Number(caseStudy) : undefined,
      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Comments</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          rows={4}
          disabled={isSubmitting}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-[var(--text-secondary)]">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              blogPost={blogPost}
              caseStudy={caseStudy}
              onCommentAdded={fetchComments}
            />
          ))
        )}
      </div>
    </div>
  );
} 