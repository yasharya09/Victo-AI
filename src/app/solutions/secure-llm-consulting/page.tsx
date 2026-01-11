'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function SecureLLMConsulting() {
  const { openConsultationModal } = useCTA();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-[var(--background)] hero-glowing-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--text-primary)]">
            Secure LLM Consulting
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[var(--text-secondary)] max-w-3xl">
            Expert guidance and strategic consulting to help organizations securely implement and manage Large Language Models.
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
              className="bg-transparent border-2 border-[var(--button-primary)] hover:bg-[var(--button-primary)]/10 text-[var(--button-primary)] px-8 py-3 rounded-lg font-medium transition-colors transform hover:-translate-y-1 duration-300"
            >
              Explore All Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Our expert consulting services help organizations implement secure and responsible AI practices, ensuring your LLM deployments are protected against emerging threats and aligned with industry best practices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Security Assessment</h3>
              <p className="text-[var(--text-secondary)]">
                Comprehensive evaluation of AI security posture
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Strategy Development</h3>
              <p className="text-[var(--text-secondary)]">
                Custom security strategies for AI deployment
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Implementation Support</h3>
              <p className="text-[var(--text-secondary)]">
                Hands-on guidance for security implementation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Security Planning</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Risk assessment and mitigation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Security architecture design
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Compliance strategy
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Implementation Guidance</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Security tool selection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Best practices implementation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Team training and support
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Consulting Process</h2>
        <div className="bg-card rounded-lg border border-border hover:shadow-lg transition-shadow overflow-hidden">
          <div className="p-6">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Discovery</h3>
                  <p className="text-[var(--text-secondary)]">
                    Understand your AI infrastructure and security needs.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Strategy</h3>
                  <p className="text-[var(--text-secondary)]">
                    Develop a comprehensive security strategy.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Implementation</h3>
                  <p className="text-[var(--text-secondary)]">
                    Guide you through security implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Secure Your AI Future</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Get expert guidance on implementing secure and responsible AI practices.
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