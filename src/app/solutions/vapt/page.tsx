'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function VAPT() {
  const { openDemoModal } = useCTA();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">VAPT for AI/LLMs</h1>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Our Vulnerability Assessment and Penetration Testing services are specifically designed for LLM applications to ensure robust security.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Prompt Injection Detection</h3>
              <p className="text-[var(--text-secondary)]">Identify and prevent malicious prompt injection attacks that can compromise your AI models.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Data Leakage Analysis</h3>
              <p className="text-[var(--text-secondary)]">Detect and mitigate risks of sensitive data exposure from your LLMs during processing.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Model Evasion Testing</h3>
              <p className="text-[var(--text-secondary)]">Assess how easily your AI models can be bypassed or manipulated by adversarial inputs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section (Adapted from AI SOC's Services) */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Comprehensive Prompt Security</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Advanced Prompt Injection detection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Defense against Jailbreaking techniques
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Secure input sanitization
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Data & Model Integrity</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Sensitive Data Leakage analysis
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                AI Model Exfiltration prevention
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Robust Supply Chain Vulnerability scanning
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Approach Section (Adapted from AI SOC's Implementation Process) */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Our Approach</h2>
        <div className="bg-card rounded-lg border border-border hover:shadow-lg transition-shadow overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Discovery & Scope</h3>
                  <p className="text-[var(--text-secondary)]">
                    Understand your AI/LLM architecture and define the VAPT scope.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Vulnerability Identification</h3>
                  <p className="text-[var(--text-secondary)]">
                    Execute tailored tests for AI-specific and traditional vulnerabilities.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Reporting & Remediation</h3>
                  <p className="text-[var(--text-secondary)]">
                    Provide actionable insights and support for mitigation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Secure Your AI Innovations</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Partner with Victo AI to proactively identify and fix vulnerabilities in your AI/LLM applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={openDemoModal}
            className="bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Request a VAPT Scan
          </button>
          <Link 
            href="/solutions"
            className="bg-transparent border-2 border-[var(--foreground)] hover:bg-[var(--foreground)]/10 text-[var(--foreground)] px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Explore All Services
          </Link>
        </div>
    </section>
    </div>
  );
} 