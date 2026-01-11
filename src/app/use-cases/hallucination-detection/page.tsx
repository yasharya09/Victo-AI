'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function HallucinationDetection() {
  const { openDemoModal } = useCTA();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">Hallucination Detection</h1>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Our hallucination detection system helps identify and mitigate instances where AI models generate false or misleading information, ensuring the reliability and trustworthiness of your AI applications.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Real-time Detection</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Instant identification of hallucinations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Continuous monitoring of AI outputs
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Mitigation Strategies</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Automated correction suggestions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                User notification and feedback
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Enhanced Reliability</h3>
            <p className="text-[var(--text-secondary)]">
              Improve the accuracy and trustworthiness of your AI systems.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Risk Mitigation</h3>
            <p className="text-[var(--text-secondary)]">
              Reduce the impact of false information on your operations.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Compliance Support</h3>
            <p className="text-[var(--text-secondary)]">
              Meet regulatory requirements for AI system reliability.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-border">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Ready to Enhance AI Reliability?</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Learn how our hallucination detection system can improve your AI's accuracy and trustworthiness.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={openDemoModal}
            className="bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Schedule a Demo
          </button>
          <Link 
            href="/use-cases"
            className="bg-transparent border-2 border-[var(--foreground)] hover:bg-[var(--foreground)]/10 text-[var(--foreground)] px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            View All Use Cases
          </Link>
        </div>
      </section>
    </div>
  );
} 