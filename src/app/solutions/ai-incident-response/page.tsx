'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function AIIncidentResponse() {
  const { openConsultationModal } = useCTA();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-[var(--text-primary)]">AI Incident Response</h1>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Our AI Incident Response system is designed to address AI/LLM threats and breaches, providing rapid detection and recovery protocols. This ensures business continuity and minimizes damage from security incidents involving your AI infrastructure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Rapid Detection</h3>
              <p className="text-[var(--text-secondary)]">
                Quick identification of security incidents
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Automated Response</h3>
              <p className="text-[var(--text-secondary)]">
                Automated protocols for immediate containment
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Post-Incident Analysis</h3>
              <p className="text-[var(--text-secondary)]">
                Detailed analysis to prevent future occurrences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Key Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Complexity of AI Systems</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Intricate model architectures and dependencies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Distributed nature of AI deployments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Lack of standardized incident response frameworks for AI
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Rapid Evolution of Threats</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                New attack vectors emerging constantly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Sophisticated adversarial techniques
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Difficulty in distinguishing malicious from benign anomalies
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Threat Detection</h3>
            <p className="text-[var(--text-secondary)]">
              Utilizing advanced analytics and machine learning to identify anomalous behavior.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Automated Containment</h3>
            <p className="text-[var(--text-secondary)]">
              Implementing automated responses to isolate compromised components and prevent further spread.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7h16M12 5v14" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Forensic Analysis</h3>
            <p className="text-[var(--text-secondary)]">
              Conducting deep-dive investigations to understand the root cause and impact of incidents.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Minimized Downtime</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Faster recovery from incidents
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Reduced impact on operations
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Enhanced Security Posture</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Proactive identification of vulnerabilities
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Continuous improvement of defenses
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Secure Your AI Future</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Don't wait for a breach to act. Implement a robust AI Incident Response plan today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={openConsultationModal}
            className="bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] px-6 py-3 rounded-lg font-medium transition-colors text-center"
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