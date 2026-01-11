'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { contentService, Category, BlogPost } from "@/services/content";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('🔄 Fetching blog content...');
        const fetchedPosts = await contentService.getBlogPosts(selectedCategory ? { category: selectedCategory } : {});
        setPosts(Array.isArray(fetchedPosts) ? fetchedPosts : []);
        const fetchedCategories = await contentService.getCategories();
        setCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
        console.log('✅ Content fetched successfully');
              } catch (err) {
          console.error("Failed to fetch content:", err);
          const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
          
          // Provide more specific error messages
          if (errorMessage.includes('Network error')) {
            setError(`Connection failed: ${errorMessage}. Please check if the backend server is running at ${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000'}`);
          } else if (errorMessage.includes('404')) {
            setError('API endpoint not found. Please check the backend configuration.');
          } else {
            setError(`Failed to load content: ${errorMessage}`);
          }
          
          // Set empty arrays to prevent crashes
          setPosts([]);
          setCategories([]);
        } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-[var(--text-primary)]">Blog</h1>
        <div className="flex justify-center items-center h-64 text-xl text-[var(--text-primary)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan mx-auto mb-4"></div>
            <p>Loading blog posts...</p>
            <p className="text-sm text-[var(--text-secondary)] mt-2">Connecting to API...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            // Retry fetch
            setTimeout(() => {
              const fetchContent = async () => {
                try {
                  const fetchedPosts = await contentService.getBlogPosts(selectedCategory ? { category: selectedCategory } : {});
                  setPosts(fetchedPosts);
                  const fetchedCategories = await contentService.getCategories();
                  setCategories(fetchedCategories);
                  setError(null);
                } catch (err) {
                  setError('Retry failed. Please check your connection and try again.');
                } finally {
                  setLoading(false);
                }
              };
              fetchContent();
            }, 1000);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          🔄 Retry
        </button>
        <div className="mt-4 text-sm text-gray-500">
          <p>If the problem persists, please check:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Backend server is running on port 8000</li>
            <li>No firewall blocking the connection</li>
            <li>API endpoints are accessible at /swagger/</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-[var(--text-primary)]">Blog</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-12">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full ${!selectedCategory ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-card hover:bg-accent-cyan/10 text-[var(--text-secondary)] hover:text-accent-cyan'} transition-colors border border-border`}
        >
          All Categories
        </button>
        {categories && categories.length > 0 ? categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => setSelectedCategory(category.slug)}
            className={`px-4 py-2 rounded-full ${selectedCategory === category.slug ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-card hover:bg-accent-cyan/10 text-[var(--text-secondary)] hover:text-accent-cyan'} transition-colors border border-border`}
          >
            {category.name}
          </button>
        )) : (
          <span className="text-[var(--text-secondary)] text-sm">No categories available</span>
        )}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 gap-12">
        {posts && posts.length > 0 ? posts.map((post) => (
          <Link href={`/resources/blog/${post.slug}`} key={post.slug}>
            <div 
              className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="aspect-video md:aspect-auto bg-card">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title || 'Blog Post'} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--text-secondary)]">
                      [No Image]
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
                      <span className="px-3 py-1 text-sm rounded-full bg-accent-cyan/20 text-accent-cyan">
                        {post.categories[0]?.name || 'Uncategorized'}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-[var(--text-primary)]">{post.title || 'Untitled Post'}</h2>
                  <p className="text-[var(--text-secondary)] mb-6">
                    {post.author?.name || 'Unknown Author'}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Summary</h3>
                      <p className="text-[var(--text-secondary)]">
                        {post.excerpt || 'No excerpt available'}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Content Preview</h3>
                      <p className="text-[var(--text-secondary)]">
                        {post.content ? `${post.content.substring(0, 200)}...` : 'No content available'}
                      </p>
                    </div>
                  </div>

                  <Link 
                    href={`/resources/blog/${post.slug}`}
                    className="inline-flex items-center mt-6 text-accent-cyan hover:text-accent-teal transition-colors"
                  >
                    Read Full Article
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        )) : (
          <div className="text-center py-12">
            <p className="text-[var(--text-secondary)] text-lg">No blog posts available</p>
            <p className="text-[var(--text-secondary)] text-sm mt-2">Check back later for new content</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="mt-16 bg-[var(--text-primary)] p-8 rounded-lg border border-border">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-50">Stay Updated with AI Security</h2>
        <p className="text-neutral-200 mb-6">
          Subscribe to our newsletter for the latest insights on AI security and best practices.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/subscribe"
            className="bg-accent-cyan hover:bg-accent-teal text-primary-900 px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Subscribe Now
          </Link>
          <Link 
            href="/resources"
            className="bg-transparent border-2 border-neutral-50 text-neutral-50 hover:bg-neutral-50/10 px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            View All Resources
          </Link>
        </div>
      </section>
    </div>
  );
}