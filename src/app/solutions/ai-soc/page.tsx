'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function AISOC() {
  const { openConsultationModal } = useCTA();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">AI Security Operations Center</h1>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Overview</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Our AI Security Operations Center provides 24/7 monitoring, threat detection, and incident response for your AI systems, ensuring comprehensive protection against emerging threats.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Continuous Monitoring</h3>
              <p className="text-[var(--text-secondary)]">
                24/7 surveillance of AI system activities
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Threat Detection</h3>
              <p className="text-[var(--text-secondary)]">
                Advanced analytics for threat identification
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Incident Response</h3>
              <p className="text-[var(--text-secondary)]">
                Rapid response to security incidents
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
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Monitoring & Detection</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Real-time system monitoring
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Anomaly detection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Threat intelligence integration
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Response & Recovery</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Incident response planning
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Rapid containment procedures
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                System recovery support
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
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Assessment</h3>
                  <p className="text-[var(--text-secondary)]">
                    Evaluate your current security posture and requirements.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Setup</h3>
                  <p className="text-[var(--text-secondary)]">
                    Deploy monitoring tools and establish response procedures.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center font-semibold">
                  <span className="text-accent-cyan">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Operations</h3>
                  <p className="text-[var(--text-secondary)]">
                    Begin 24/7 monitoring and response operations.
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
          Get comprehensive protection for your AI systems with our SOC services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={openConsultationModal}
            className="bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Contact Our Team
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