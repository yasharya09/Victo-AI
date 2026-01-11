'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function InferenceAbuse() {
  const { openDemoModal } = useCTA();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-[var(--background)] hero-glowing-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--text-primary)]">
            Inference Abuse
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[var(--text-secondary)] max-w-3xl">
            Protecting AI systems from malicious inputs designed to manipulate or misuse model behavior.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={openDemoModal}
              className="bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] px-8 py-3 rounded-lg font-medium transition-colors transform hover:-translate-y-1 duration-300"
            >
              Request a Demo
            </button>
            <Link 
              href="/use-cases" 
              className="bg-transparent border-2 border-[var(--button-primary)] hover:bg-[var(--button-primary)]/10 text-[var(--button-primary)] px-8 py-3 rounded-lg font-medium transition-colors transform hover:-translate-y-1 duration-300"
            >
              Explore All Use Cases
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            AI inference abuse and overuse can lead to resource exhaustion, increased costs, and potential service degradation. Our solutions help monitor and control inference usage, ensuring optimal performance and cost efficiency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Resource Protection</h3>
              <p className="text-[var(--text-secondary)]">
                Prevention of resource exhaustion and service degradation
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Cost Control</h3>
              <p className="text-[var(--text-secondary)]">
                Management of inference costs and usage patterns
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow border border-border">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Usage Monitoring</h3>
              <p className="text-[var(--text-secondary)]">
                Real-time tracking of inference requests and patterns
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
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Resource Management</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Compute resource exhaustion
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Memory overflow risks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Network bandwidth saturation
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Cost Management</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Unexpected cost spikes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Inefficient resource allocation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Budget overruns
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Usage Monitoring</h3>
            <p className="text-[var(--text-secondary)]">
              Real-time tracking and analysis of inference patterns
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Cost Control</h3>
            <p className="text-[var(--text-secondary)]">
              Automated budget management and cost optimization
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow border border-border">
            <div className="w-12 h-12 bg-accent-cyan/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Resource Optimization</h3>
            <p className="text-[var(--text-secondary)]">
              Intelligent resource allocation and scaling
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
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Usage Analysis</h3>
                  <p className="text-[var(--text-secondary)]">
                    Assessment of current inference patterns and costs
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Policy Setup</h3>
                  <p className="text-[var(--text-secondary)]">
                    Configuration of usage limits and monitoring rules
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Monitoring Deployment</h3>
                  <p className="text-[var(--text-secondary)]">
                    Implementation of real-time monitoring systems
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Optimization</h3>
                  <p className="text-[var(--text-secondary)]">
                    Continuous improvement of resource utilization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Safeguard Your AI Models</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Implement robust defenses against inference abuse to maintain model integrity and reliability.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={openDemoModal}
            className="bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Request a Demo
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