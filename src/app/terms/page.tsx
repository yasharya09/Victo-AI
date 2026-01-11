'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function TermsPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-foreground transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-foreground">Terms of Service</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent-cyan prose-blockquote:border-l-accent-cyan">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using VICTO AI's services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                VICTO AI provides AI security solutions, including but not limited to security assessments, consulting services, and software tools designed to protect AI and LLM systems from various security threats.
              </p>

              <h2>3. User Responsibilities</h2>
              <p>
                Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users must not use the service for any illegal or unauthorized purpose.
              </p>

              <h2>4. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the VICTO AI service, including but not limited to text, graphics, logos, and software, are owned by VICTO AI and are protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h2>5. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
              </p>

              <h2>6. Limitation of Liability</h2>
              <p>
                VICTO AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>

              <h2>7. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which VICTO AI operates, without regard to its conflict of law provisions.
              </p>

              <h2>9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2>10. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="/contact" className="text-accent-cyan hover:text-accent-teal">
                  our contact page
                </a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}
