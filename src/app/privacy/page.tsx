'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function PrivacyPage() {
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
              <span className="text-foreground">Privacy Policy</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent-cyan prose-blockquote:border-l-accent-cyan">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:
              </p>
              <ul>
                <li>Name, email address, and contact information</li>
                <li>Company and job title information</li>
                <li>Usage data and service preferences</li>
                <li>Communication records and support requests</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with:
              </p>
              <ul>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>

              <h2>5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. We may retain certain information for longer periods when required by law or for legitimate business purposes.
              </p>

              <h2>6. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access and receive a copy of your data</li>
                <li>The right to rectify or update your information</li>
                <li>The right to delete your information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
              </ul>

              <h2>7. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences, though disabling cookies may affect some functionality.
              </p>

              <h2>8. Third-Party Services</h2>
              <p>
                Our services may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties and encourage you to review their privacy policies.
              </p>

              <h2>9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this policy.
              </p>

              <h2>10. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>

              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
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
