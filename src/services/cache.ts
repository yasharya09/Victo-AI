import { cache } from 'react';

interface CacheConfig {
  ttl?: number; // Time to live in seconds
  key?: string;
}

const DEFAULT_TTL = 60; // 1 minute

class CacheService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();

  private generateKey(key: string, params?: any): string {
    if (!params) return key;
    return `${key}:${JSON.stringify(params)}`;
  }

  private isExpired(timestamp: number, ttl: number): boolean {
    return Date.now() - timestamp > ttl * 1000;
  }

  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    config: CacheConfig = {}
  ): Promise<T> {
    const cacheKey = this.generateKey(key, config.key);
    const cached = this.cache.get(cacheKey);

    if (cached && !this.isExpired(cached.timestamp, config.ttl || DEFAULT_TTL)) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  }

  invalidate(key: string): void {
    const keys = Array.from(this.cache.keys()).filter(k => k.startsWith(key));
    keys.forEach(k => this.cache.delete(k));
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cacheService = new CacheService();

// React cache wrapper
export const getCachedData = cache(async <T>(
  key: string,
  fetcher: () => Promise<T>,
  config: CacheConfig = {}
): Promise<T> => {
  return cacheService.get(key, fetcher, config);
}); 