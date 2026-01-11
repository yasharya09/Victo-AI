'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { createComment } from '@/services/api';
import { LoadingButton } from '@/components/ui/LoadingSpinner';
import { formatDate, formatRelativeTime } from '@/lib/utils';

interface CommentData {
  id: number;
  content: string;
  author: string;
  created_at: string;
  replies: CommentData[];
  blog_post?: string;
  case_study?: string;
}

interface CommentProps {
  comment: CommentData;
  blogPost?: string | undefined;
  caseStudy?: string | undefined;
  onCommentAdded?: (() => void) | undefined;
  depth?: number;
  maxDepth?: number;
}

export default function Comment({ 
  comment, 
  blogPost, 
  caseStudy, 
  onCommentAdded, 
  depth = 0,
  maxDepth = 5 
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id, content, author, created_at, replies } = comment;

  // Memoize formatted dates to avoid recalculation
  const formattedDate = useMemo(() => formatDate(created_at), [created_at]);
  const relativeTime = useMemo(() => formatRelativeTime(created_at), [created_at]);

  // Check if we've reached maximum nesting depth
  const canReply = depth < maxDepth;

  const handleReply = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replyContent.trim()) {
      setError('Reply content cannot be empty');
      return;
    }

    if (!canReply) {
      setError('Maximum reply depth reached');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createComment({
        content: replyContent.trim(),
        blog_post: blogPost ? Number(blogPost) : undefined,
        case_study: caseStudy ? Number(caseStudy) : undefined,
        parent_comment: id,
      });
      
      setReplyContent('');
      setIsReplying(false);
      onCommentAdded?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to post reply. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [replyContent, canReply, blogPost, caseStudy, id, onCommentAdded]);

  const handleCancelReply = useCallback(() => {
    setIsReplying(false);
    setReplyContent('');
    setError(null);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
    if (error) setError(null);
  }, [error]);

  const toggleReply = useCallback(() => {
    setIsReplying(!isReplying);
    if (isReplying) {
      setReplyContent('');
      setError(null);
    }
  }, [isReplying]);

  return (
    <article 
      className="border-l-2 border-accent-cyan pl-4 mb-4"
      aria-labelledby={`comment-${id}-author`}
    >
      <div className="bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        {/* Comment Header */}
        <header className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-cyan rounded-full flex items-center justify-center">
              <span className="text-[var(--primary-900)] font-semibold text-sm">
                {author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 
                id={`comment-${id}-author`}
                className="font-medium text-[var(--text-primary)] text-sm"
              >
                {author}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-[var(--text-secondary)]">
                <time dateTime={created_at} title={formattedDate}>
                  {relativeTime}
                </time>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Comment Content */}
        <div className="mb-4">
          <p className="text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>

        {/* Comment Actions */}
        <footer className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {canReply && (
              <button
                onClick={toggleReply}
                className="text-accent-cyan hover:text-accent-teal text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 rounded"
                aria-expanded={isReplying}
                aria-controls={`reply-form-${id}`}
              >
                {isReplying ? 'Cancel Reply' : 'Reply'}
              </button>
            )}
            {!canReply && (
              <span className="text-xs text-[var(--text-secondary)] italic">
                Maximum reply depth reached
              </span>
            )}
          </div>
        </footer>

        {/* Reply Form */}
        {isReplying && (
          <form 
            id={`reply-form-${id}`}
            onSubmit={handleReply} 
            className="mt-4 space-y-4"
            aria-label={`Reply to comment by ${author}`}
          >
            <div>
              <label htmlFor={`reply-content-${id}`} className="sr-only">
                Reply content
              </label>
              <textarea
                id={`reply-content-${id}`}
                value={replyContent}
                onChange={handleInputChange}
                placeholder="Write your reply..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-colors resize-none"
                rows={3}
                disabled={isSubmitting}
                aria-describedby={error ? `reply-error-${id}` : undefined}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-[var(--text-secondary)]">
                  {replyContent.length}/1000 characters
                </span>
                {error && (
                  <p 
                    id={`reply-error-${id}`}
                    className="text-red-500 text-xs"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                loadingText="Posting Reply..."
                disabled={!replyContent.trim() || isSubmitting}
                className="px-6 py-2 bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Post Reply
              </LoadingButton>
              
              <button
                type="button"
                onClick={handleCancelReply}
                className="px-6 py-2 border border-border text-[var(--text-secondary)] hover:bg-[var(--card-background)] rounded-lg font-medium transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Nested Replies */}
      {replies && replies.length > 0 && (
        <div className="mt-4 space-y-4 ml-4">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              blogPost={blogPost}
              caseStudy={caseStudy}
              onCommentAdded={onCommentAdded}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}
    </article>
  );
} 
