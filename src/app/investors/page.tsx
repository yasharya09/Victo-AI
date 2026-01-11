'use client';

import React from "react";
import Link from "next/link";

export default function Investors() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">Investors</h1>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="bg-card rounded-lg p-8 border border-accent-cyan hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Our Vision & Mission</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            At VICTO AI, we are committed to building a secure and trusted future for artificial intelligence. We believe that robust AI security is not just a necessity but a cornerstone for innovation and widespread adoption.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-accent-cyan hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Securing AI Ecosystems</h3>
              <p className="text-[var(--text-secondary)]">
                Developing cutting-edge solutions to protect AI models and applications from adversarial attacks and vulnerabilities.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-accent-cyan hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Fostering Trust in AI</h3>
              <p className="text-[var(--text-secondary)]">
                Enabling businesses to confidently deploy AI by ensuring the integrity and reliability of their systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Why Invest in VICTO AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border border-accent-cyan hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Pioneering Technology</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Proprietary AI security frameworks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Innovating solutions for emerging threats
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border border-accent-cyan hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Market Leadership</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Strong position in a rapidly growing market
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Trusted by leading enterprises
              </li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border border-accent-cyan hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Experienced Team</h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                World-class AI security experts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Proven track record of success
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Financials & Growth Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Financials & Growth</h2>
        <div className="bg-card rounded-lg border border-accent-cyan hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 overflow-hidden">
          <div className="p-6">
            <p className="text-[var(--text-secondary)] mb-4">
              VICTO AI is experiencing significant growth, driven by increasing demand for robust AI security solutions across industries. Our financial performance reflects our strong market position and the critical need for our innovative technologies.
            </p>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Consistent revenue growth
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Expanding customer base
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan">•</span>
                Strategic partnerships and collaborations
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary p-8 rounded-lg border border-accent-cyan hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Partner with Us</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Join us in securing the future of AI. For more detailed investor information, please contact our team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="bg-accent-cyan hover:bg-accent-teal text-[var(--primary-900)] px-6 py-3 rounded-lg font-medium transition-colors text-center transform hover:-translate-y-1 duration-300"
          >
            Contact Investor Relations
          </Link>
          <Link
            href="/about"
            className="bg-transparent border-2 border-[var(--foreground)] hover:bg-[var(--foreground)]/10 text-[var(--foreground)] px-6 py-3 rounded-lg font-medium transition-colors text-center transform hover:-translate-y-1 duration-300"
          >
            Learn More About Us
          </Link>
        </div>
      </section>
    </div>
  );
}