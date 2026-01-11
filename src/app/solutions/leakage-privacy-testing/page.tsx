'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function LeakagePrivacyTesting() {
  const { openConsultationModal } = useCTA();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">Leakage & Privacy Testing</h1>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Our comprehensive testing suite helps identify and prevent data leakage and privacy violations in AI systems, ensuring your models maintain confidentiality and comply with regulations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Data Leakage Detection</h3>
              <p className="text-[var(--text-secondary)]">
                Identify unintended data exposure in model outputs
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Privacy Compliance</h3>
              <p className="text-[var(--text-secondary)]">
                Ensure adherence to privacy regulations and standards
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Vulnerability Assessment</h3>
              <p className="text-[var(--text-secondary)]">
                Comprehensive testing for privacy vulnerabilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Methods Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Testing Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Automated Testing</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Continuous integration testing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Automated vulnerability scanning
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Real-time monitoring and alerts
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Manual Assessment</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Expert-led penetration testing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Privacy impact assessments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Compliance verification
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Implementation Process</h2>
        <div className="bg-card rounded-lg border border-border hover:shadow-lg transition-shadow overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Initial Assessment</h3>
                  <p className="text-[var(--text-secondary)]">
                    Evaluate your current privacy measures and identify potential risks.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Testing Implementation</h3>
                  <p className="text-[var(--text-secondary)]">
                    Deploy automated and manual testing procedures.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Ongoing Monitoring</h3>
                  <p className="text-[var(--text-secondary)]">
                    Continuous testing and improvement of privacy measures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Protect Your Data</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Ensure your AI systems maintain data privacy and comply with regulations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={openConsultationModal}
            className="bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] px-8 py-3 rounded-lg font-medium transition-colors transform hover:-translate-y-1 duration-300"
          >
            Schedule a Consultation
          </button>
          <Link 
            href="/solutions"
            className="bg-transparent border-2 border-[var(--foreground)] hover:bg-[var(--foreground)]/10 text-[var(--foreground)] px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            View All Solutions
          </Link>
        </div>
      </section>
    </div>
  );
} 