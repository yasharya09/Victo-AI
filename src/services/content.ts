import config from '@/config';
import { getToken } from './auth';

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  published_date: string;
  read_time: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  categories: Category[];
  tags: { id: string; name: string }[];
  related_posts: {
    title: string;
    slug: string;
    excerpt: string;
    published_date: string;
  }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  published_date: string;
  read_time: number;
  industry: string;
  client: {
    name: string;
    logo: string;
  };
  categories: Category[];
  summary: string;
  results: string;
  key_results: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  related_case_studies: {
    title: string;
    slug: string;
    excerpt: string;
    published_date: string;
  }[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Comment {
  id: number;
  content: string;
  author: string; // username
  created_at: string;
  is_approved: boolean;
  parent_comment?: number;
  replies?: Comment[];
}

const API_BASE_URL = config.api.baseUrl;

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    console.log(`🔗 Fetching: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.detail || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`❌ Fetch error for ${url}:`, error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Network error: Unable to connect to API at ${config.api.baseUrl}`);
    }
    throw error;
  }
}

export const contentService = {
  // Blog Posts
  getBlogPosts: async (params?: { category?: string; tag?: string }): Promise<BlogPost[]> => {
    const query = new URLSearchParams(params).toString();
    return fetcher<BlogPost[]>(`${API_BASE_URL}blog-posts/?${query}`);
  },
  getBlogPostBySlug: async (slug: string): Promise<BlogPost> => {
    const blogPost = await fetcher<BlogPost>(`${API_BASE_URL}blog-posts/${slug}/`);
    // Increment views after fetching
    await fetcher(`${API_BASE_URL}blog-posts/${slug}/increment_views/`, { method: 'POST' });
    return blogPost;
  },

  // Case Studies
  getCaseStudies: async (params?: { category?: string; tag?: string }): Promise<CaseStudy[]> => {
    const query = new URLSearchParams(params).toString();
    return fetcher<CaseStudy[]>(`${API_BASE_URL}case-studies/?${query}`);
  },
  getCaseStudyBySlug: async (slug: string): Promise<CaseStudy> => {
    const caseStudy = await fetcher<CaseStudy>(`${API_BASE_URL}case-studies/${slug}/`);
    // Increment views after fetching
    await fetcher(`${API_BASE_URL}case-studies/${slug}/increment_views/`, { method: 'POST' });
    return caseStudy;
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    return fetcher<Category[]>(`${API_BASE_URL}categories/`);
  },
  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const categories = await fetcher<Category[]>(`${API_BASE_URL}categories/?search=${slug}`);
    if (!categories || categories.length === 0) {
      throw new Error(`Category with slug '${slug}' not found`);
    }
    return categories[0]!;
  },

  // Tags
  getTags: async (): Promise<Tag[]> => {
    return fetcher<Tag[]>(`${API_BASE_URL}tags/`);
  },
  getTagBySlug: async (slug: string): Promise<Tag> => {
    const tags = await fetcher<Tag[]>(`${API_BASE_URL}tags/?search=${slug}`);
    if (!tags || tags.length === 0) {
      throw new Error(`Tag with slug '${slug}' not found`);
    }
    return tags[0]!;
  },

  // Comments
  getCommentsForBlogPost: async (blogPostSlug: string): Promise<Comment[]> => {
    return fetcher<Comment[]>(`${API_BASE_URL}comments/?blog_post=${blogPostSlug}`);
  },
  getCommentsForCaseStudy: async (caseStudySlug: string): Promise<Comment[]> => {
    return fetcher<Comment[]>(`${API_BASE_URL}comments/?case_study=${caseStudySlug}`);
  },
  submitComment: async (commentData: { content: string; blog_post?: number; case_study?: number; parent_comment?: number }): Promise<Comment> => {
    return fetcher<Comment>(`${API_BASE_URL}comments/`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  },
};