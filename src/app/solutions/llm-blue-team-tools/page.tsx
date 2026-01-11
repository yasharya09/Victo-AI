'use client';

import React from "react";
import Link from "next/link";

import { useCTA } from "@/components/CTAManager";

export default function LLMBlueTeamTools() {
  const { openDemoModal } = useCTA();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">LLM Blue Team Tools</h1>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Our LLM Blue Team Tools include a Prompt Sanitizer API, jailbreak pattern blocklists, and an output watermark verification engine to enhance your AI security defenses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Prompt Sanitizer API</h3>
              <p className="text-[var(--text-secondary)]">
                Cleans and filters malicious inputs to LLMs
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Jailbreak Blocklists</h3>
              <p className="text-[var(--text-secondary)]">
                Maintains lists of known jailbreaking patterns
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Output Watermark Verification</h3>
              <p className="text-[var(--text-secondary)]">
                Verifies the authenticity and origin of AI outputs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Advanced Filtering</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Context-aware prompt analysis
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Heuristic and rule-based detection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Dynamic content modification
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Real-time Protection</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Low-latency API integration
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Continuous threat intelligence updates
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Automated response to detected threats
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Integration & Deployment</h2>
        <div className="bg-card rounded-lg border border-border hover:shadow-lg transition-shadow overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">API Integration</h3>
                  <p className="text-[var(--text-secondary)]">
                    Easily integrate our Prompt Sanitizer API into your existing applications.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Customizable Rules</h3>
                  <p className="text-[var(--text-secondary)]">
                    Tailor blocklists and filtering rules to your specific security needs.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Comprehensive Support</h3>
                  <p className="text-[var(--text-secondary)]">
                    Access to our security experts for deployment and ongoing support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Enhance Your AI Security</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Equip your team with the best tools to defend against sophisticated AI attacks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={openDemoModal}
            className="bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Request a Demo
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