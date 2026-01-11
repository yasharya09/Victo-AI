'use client';

import React, { useEffect, useState } from 'react';
import { getBlogPosts, getCategories, getTags } from '@/services/api';
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData, tagsData] = await Promise.all([
          getBlogPosts({ category: selectedCategory, tag: selectedTag }),
          getCategories(),
          getTags(),
        ]);
        setPosts(postsData.data || []);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (err) {
        setError('Failed to load blog posts. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, selectedTag]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  !selectedCategory
                    ? 'bg-accent-cyan text-[var(--primary-900)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    selectedCategory === category.slug
                      ? 'bg-accent-cyan text-[var(--primary-900)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 rounded-full text-sm ${
                  !selectedTag
                    ? 'bg-accent-cyan text-[var(--primary-900)]'
                    : 'bg-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.slug)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === tag.slug
                      ? 'bg-accent-cyan text-[var(--primary-900)]'
                      : 'bg-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent-cyan transition-colors">
                  {post.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-accent-cyan transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-4">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                      <span>{post.author}</span>
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 