'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function AIModelExfiltration() {
  const { openDemoModal } = useCTA();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-[var(--text-primary)]">AI Model Exfiltration & Leakage Prevention</h1>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            AI model exfiltration and leakage represent critical security challenges where attackers attempt to extract or steal proprietary AI models, their architecture, or training data. This can lead to intellectual property theft, competitive advantage loss, and potential misuse of sensitive AI systems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Model Theft</h3>
              <p className="text-[var(--text-secondary)]">
                Unauthorized extraction of model architecture, weights, or parameters
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Data Leakage</h3>
              <p className="text-[var(--text-secondary)]">
                Exposure of sensitive training data through model outputs
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Model Inversion</h3>
              <p className="text-[var(--text-secondary)]">
                Reverse engineering of model architecture and parameters
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
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Model Extraction Attacks</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Query-based model extraction through API endpoints
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Adversarial examples to probe model architecture
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Gradient-based attacks to extract model parameters
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Data Privacy Risks</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Membership inference attacks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Training data reconstruction
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Model inversion attacks
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Our Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Model Protection</h3>
            <p className="text-[var(--text-secondary)]">
              Advanced techniques to prevent model extraction and reverse engineering
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Privacy Preservation</h3>
            <p className="text-[var(--text-secondary)]">
              Differential privacy and secure inference to protect sensitive data
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Monitoring & Detection</h3>
            <p className="text-[var(--text-secondary)]">
              Real-time monitoring and detection of extraction attempts
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Implementation Approach</h2>
        <div className="bg-card rounded-lg shadow overflow-hidden border border-border">
          <div className="p-6">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Assessment</h3>
                  <p className="text-[var(--text-secondary)]">
                    Evaluate current model deployment and identify potential vulnerabilities
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Protection Implementation</h3>
                  <p className="text-[var(--text-secondary)]">
                    Deploy model protection mechanisms and privacy-preserving techniques
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Monitoring Setup</h3>
                  <p className="text-[var(--text-secondary)]">
                    Implement real-time monitoring and detection systems
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Continuous Improvement</h3>
                  <p className="text-[var(--text-secondary)]">
                    Regular updates and improvements based on emerging threats
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-border">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Ready to Secure Your AI Models?</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Learn how our AI security solutions can protect your models from exfiltration and leakage.
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