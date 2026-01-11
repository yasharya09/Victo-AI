'use client';

import React, { useState } from "react";
import Link from "next/link";
import config from '@/config'; // ✅ Imported config

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    privacy_policy_accepted: false
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${config.api.baseUrl}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors || 'Failed to send message');
      }

      setStatus('success');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        privacy_policy_accepted: false
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <div className="min-h-screen bg-background text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-[var(--text-secondary)]">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-[var(--text-secondary)]">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)]">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[var(--text-secondary)]">Company (Optional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-secondary)]">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                >
                  <option value="">Select a subject</option>
                  <option value="general_inquiry">General Inquiry</option>
                  <option value="sales_inquiry">Sales Inquiry</option>
                  <option value="support_request">Support Request</option>
                  <option value="partnership">Partnership</option>
                  <option value="careers">Careers</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-border bg-background text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                ></textarea>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy_policy_accepted"
                  name="privacy_policy_accepted"
                  checked={formData.privacy_policy_accepted}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-accent-cyan focus:ring-accent-cyan border-border rounded"
                />
                <label htmlFor="privacy_policy_accepted" className="ml-2 block text-sm text-[var(--text-secondary)]">
                  I agree to the <Link href="/privacy-policy" className="text-accent-cyan hover:underline">Privacy Policy</Link>
                </label>
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              {status === 'success' && (
                <p className="text-green-500 text-sm">Your message has been sent successfully!</p>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-card p-8 rounded-lg shadow-lg border border-border space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-[var(--text-primary)]">Address</h3>
                <p className="text-[var(--text-secondary)]">123 AI Street, Suite 456<br />Innovation City, IC 78901</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[var(--text-primary)]">Phone</h3>
                <p className="text-[var(--text-secondary)]">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[var(--text-primary)]">Email</h3>
                <p className="text-[var(--text-secondary)]">info@victo.ai</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[var(--text-secondary)] hover:text-accent-cyan transition-colors"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-accent-cyan transition-colors"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-accent-cyan transition-colors"><i className="fab fa-facebook"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
