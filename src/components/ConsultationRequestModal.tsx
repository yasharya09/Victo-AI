'use client';

import React, { useState } from 'react';
import config from '@/config';

interface ConsultationRequestModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function ConsultationRequestModal({ isOpen, onCloseAction }: ConsultationRequestModalProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    phone_number: '',
    preferred_date: '',
    preferred_time: '',
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
      const response = await fetch(`${config.api.baseUrl}/consultation-request/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? JSON.stringify(data.errors) : data.error || 'Failed to send consultation request');
      }

      setStatus('success');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        phone_number: '',
        preferred_date: '',
        preferred_time: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send consultation request. Please try again.');
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
        <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-6">Schedule a Consultation</h2>
        
        {status === 'success' ? (
          <div className="bg-accent-cyan/10 text-accent-cyan p-6 rounded-lg text-center">
            <p className="font-medium text-lg mb-2">Thank you for your consultation request!</p>
            <p className="text-sm text-[var(--text-secondary)]">We'll review your request and get back to you shortly to confirm your consultation time.</p>
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
                <label htmlFor="consultation-first_name" className="block text-sm font-medium text-[var(--text-secondary)]">First Name</label>
                <input
                  type="text"
                  id="consultation-first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="consultation-last_name" className="block text-sm font-medium text-[var(--text-secondary)]">Last Name</label>
                <input
                  type="text"
                  id="consultation-last_name"
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
              <label htmlFor="consultation-email" className="block text-sm font-medium text-[var(--text-secondary)]">Email</label>
              <input
                type="email"
                id="consultation-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                disabled={status === 'loading'}
              />
            </div>
            <div>
              <label htmlFor="consultation-company" className="block text-sm font-medium text-[var(--text-secondary)]">Company (Optional)</label>
              <input
                type="text"
                id="consultation-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                disabled={status === 'loading'}
              />
            </div>
            <div>
              <label htmlFor="consultation-phone_number" className="block text-sm font-medium text-[var(--text-secondary)]">Phone Number (Optional)</label>
              <input
                type="tel"
                id="consultation-phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                disabled={status === 'loading'}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="consultation-preferred_date" className="block text-sm font-medium text-[var(--text-secondary)]">Preferred Date</label>
                <input
                  type="date"
                  id="consultation-preferred_date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="consultation-preferred_time" className="block text-sm font-medium text-[var(--text-secondary)]">Preferred Time</label>
                <input
                  type="time"
                  id="consultation-preferred_time"
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                  disabled={status === 'loading'}
                />
              </div>
            </div>
            <div>
              <label htmlFor="consultation-message" className="block text-sm font-medium text-[var(--text-secondary)]">Message (Optional)</label>
              <textarea
                id="consultation-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                disabled={status === 'loading'}
                placeholder="Please let us know what you'd like to discuss during the consultation..."
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
              {status === 'loading' ? 'Submitting...' : 'Submit Consultation Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 