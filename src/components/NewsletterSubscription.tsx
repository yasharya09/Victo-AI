'use client';

import React, { useState } from 'react';
import config from '@/config';

interface NewsletterSubscriptionProps {
  title: string;
  description: string;
  type: 'investors' | 'resources' | 'newsletter';
}

export default function NewsletterSubscription({ title, description, type }: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${config.api.baseUrl}/newsletter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subscription_type: type
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.email?.[0] || data.error || 'Failed to subscribe');
      }
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="bg-card rounded-lg p-8 border border-border">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">{title}</h2>
        <p className="text-[var(--text-secondary)] mb-8">{description}</p>

        {status === 'success' ? (
          <div className="bg-accent-cyan/10 text-accent-cyan p-4 rounded-lg">
            <p className="font-medium">Thank you for subscribing!</p>
            <p className="text-sm mt-1 text-[var(--text-secondary)]">
              {type === 'investors' 
                ? "You'll receive updates about our financial performance and company milestones."
                : "You'll receive updates about new resources and insights."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
} 