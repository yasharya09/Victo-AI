'use client';

import React, { useState } from 'react';
import config from '@/config';

interface DemoRequestModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function DemoRequestModal({ isOpen, onCloseAction }: DemoRequestModalProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    phone_number: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${config.api.baseUrl}/demo-request/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? JSON.stringify(data.errors) : data.error || 'Failed to send demo request');
      }

      setStatus('success');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        phone_number: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send demo request. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-card p-8 rounded-lg shadow-2xl w-full max-w-lg relative border border-border">
        <button
          onClick={onCloseAction}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-2xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-6">Request a Demo</h2>
        
        {status === 'success' ? (
          <div className="bg-accent-cyan/10 text-accent-cyan p-6 rounded-lg text-center">
            <p className="font-medium text-lg mb-2">Thank you for your demo request!</p>
            <p className="text-sm text-[var(--text-secondary)]">We'll get in touch with you shortly to schedule your personalized demo.</p>
            <button
              onClick={onCloseAction}
              className="mt-6 px-6 py-3 bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="demo-first_name" className="block text-sm font-medium text-[var(--text-secondary)]">First Name</label>
                <input
                  type="text"
                  id="demo-first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="demo-last_name" className="block text-sm font-medium text-[var(--text-secondary)]">Last Name</label>
                <input
                  type="text"
                  id="demo-last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                  disabled={status === 'loading'}
                />
              </div>
            </div>
            <div>
              <label htmlFor="demo-email" className="block text-sm font-medium text-[var(--text-secondary)]">Email</label>
              <input
                type="email"
                id="demo-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                disabled={status === 'loading'}
              />
            </div>
            <div>
              <label htmlFor="demo-company" className="block text-sm font-medium text-[var(--text-secondary)]">Company (Optional)</label>
              <input
                type="text"
                id="demo-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                disabled={status === 'loading'}
              />
            </div>
            <div>
              <label htmlFor="demo-phone_number" className="block text-sm font-medium text-[var(--text-secondary)]">Phone Number (Optional)</label>
              <input
                type="tel"
                id="demo-phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                disabled={status === 'loading'}
              />
            </div>
            <div>
              <label htmlFor="demo-message" className="block text-sm font-medium text-[var(--text-secondary)]">Message (Optional)</label>
              <textarea
                id="demo-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                disabled={status === 'loading'}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'Submit Demo Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}