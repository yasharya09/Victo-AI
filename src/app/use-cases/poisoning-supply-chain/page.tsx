'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function PoisoningSupplyChain() {
  const { openDemoModal } = useCTA();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-[var(--text-primary)]">AI Poisoning & Supply-chain Attack Prevention</h1>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            AI poisoning and supply-chain attacks target the integrity of AI systems by compromising training data or model components. Our solutions help detect and prevent these sophisticated attacks, ensuring the security and reliability of your AI infrastructure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Data Poisoning</h3>
              <p className="text-[var(--text-secondary)]">
                Detection of malicious training data manipulation
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Model Tampering</h3>
              <p className="text-[var(--text-secondary)]">
                Prevention of unauthorized model modifications
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Supply Chain Security</h3>
              <p className="text-[var(--text-secondary)]">
                Protection against compromised dependencies
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
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Attack Vectors</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Training data manipulation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Model backdoor insertion
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Dependency compromise
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Detection Complexities</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Subtle data manipulations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Sophisticated backdoors
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Supply chain vulnerabilities
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Data Validation</h3>
            <p className="text-[var(--text-secondary)]">
              Advanced techniques for detecting poisoned training data
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Model Integrity</h3>
            <p className="text-[var(--text-secondary)]">
              Verification of model authenticity and integrity
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Supply Chain Protection</h3>
            <p className="text-[var(--text-secondary)]">
              Comprehensive security for AI supply chain components
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
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Risk Assessment</h3>
                  <p className="text-[var(--text-secondary)]">
                    Evaluation of current AI infrastructure vulnerabilities
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Security Implementation</h3>
                  <p className="text-[var(--text-secondary)]">
                    Deployment of protection mechanisms and monitoring systems
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Continuous Monitoring</h3>
                  <p className="text-[var(--text-secondary)]">
                    Real-time detection of potential attacks and anomalies
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Response & Recovery</h3>
                  <p className="text-[var(--text-secondary)]">
                    Automated incident response and system recovery procedures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Secure Your AI Supply Chain</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Defend your AI systems against poisoning and supply chain attacks with our robust solutions.
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