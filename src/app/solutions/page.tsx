'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function Solutions() {
  const { openDemoModal, openConsultationModal } = useCTA();
  const solutionItems = [
    {
      title: "AI Incident Response",
      description: "Rapid detection and recovery protocols for AI/LLM threats and breaches.",
      link: "/solutions/ai-incident-response",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.732 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      ),
    },
    {
      title: "AI Security Posture Assessment",
      description: "Includes AI integration audits, shadow AI detection, and model risk classification.",
      link: "/solutions/ai-security-posture",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </svg>
      ),
    },
    {
      title: "AI SOC",
      description: "Real-time monitoring of prompt activities, API usage, model output, and logs.",
      link: "/solutions/ai-soc",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25V12a2.25 2.25 0 0 1 2.25-2.25h1.5M4.5 17.25h.008v.008H4.5ZM6 19.5h.008v.008H6ZM7.5 21h.008v.008H7.5ZM10.5 7.5h.008v.008H10.5ZM12 6h.008v.008H12ZM13.5 4.5h.008v.008H13.5ZM16.5 6h.008v.008H16.5ZM18 7.5h.008v.008H18ZM19.5 9h.008v.008H19.5ZM19.5 12V6.75a2.25 2.25 0 0 0-2.25-2.25H16.5m-1.5 15.75H5.25a2.25 2.25 0 0 1-2.25-2.25V12m7.5-6h7.5m-7.5 3h7.5m-7.5 3h7.5m-9-6h3.75m-3.75 3h3.75m-3.75 3h3.75M9 21h.008v.008H9Zm.75-4.5h.008v.008H9.75ZM12 19.5h.008v.008H12Zm.75-4.5h.008v.008H12.75ZM15 21h.008v.008H15Zm.75-4.5h.008v.008H15.75ZM18 19.5h.008v.008H18Zm.75-4.5h.008v.008H18.75Z" />
        </svg>
      ),
    },
    {
      title: "Leakage & Privacy Testing",
      description: "Ensuring your AI models do not unintentionally leak sensitive information.",
      link: "/solutions/leakage-privacy-testing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21v-4.5m2.25-4.5h-4.5m7.5 10.137a9.004 9.004 0 0 1-18 0m18 0a9.004 9.004 0 0 0-18 0m18 0V2.25m18 12.001V2.25M12 2.25V4.5m2.25 4.5h-4.5m3.75 6.75h-3.75" />
        </svg>
      ),
    },
    {
      title: "LLM Blue Team Tools",
      description: "Prompt Sanitizer API, jailbreak pattern blocklists, and output watermark verification.",
      link: "/solutions/llm-blue-team-tools",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.244Zm5.327-4.431A3 3 0 0 0 14.122 3c-1.791 0-3.59.083-5.327.247a2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 3.88-1.128c.321-.296.657-.597 1.002-.898ZM12 18.75a6.75 6.75 0 0 0 6.75-6.75V7.25a6.75 6.75 0 0 0-13.5 0v4.75c0 3.729 3.021 6.75 6.75 6.75Z" />
        </svg>
      ),
    },
    {
      title: "Output Sanitization & Explainability",
      description: "APIs and model output analysis tools ensure secure, interpretable, and vulnerability-free AI outputs.",
      link: "/solutions/output-sanitization",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21v-4.5m2.25-4.5h-4.5m7.5 10.137a9.004 9.004 0 0 1-18 0m18 0a9.004 9.004 0 0 0-18 0m18 0V2.25m18 12.001V2.25M12 2.25V4.5m2.25 4.5h-4.5m3.75 6.75h-3.75" />
        </svg>
      ),
    },
    {
      title: "Secure LLM Consulting",
      description: "Expert guidance on RAG architecture, I/O firewalls, and bias reduction via finetuning.",
      link: "/solutions/secure-llm-consulting",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.079 0-2.157.068-3.227.195C2.818 4.059 2.25 4.908 2.25 6v10.394m5.25-10.394V6a2.25 2.25 0 0 1 2.25-2.25h10.5a2.25 2.25 0 0 1 2.25 2.25v10.394m-5.25-10.394R8.25 20.25H6.75a2.25 2.25 0 0 1-2.25-2.25V18m-8.25-6.75h1.596M12 18V9.75M17.25 10.5H18M18 6H9a2.25 2.25 0 0 0-2.25 2.25v1.5a2.25 2.25 0 0 0 2.25 2.25h1.5a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25H9M12 18V9.75" />
        </svg>
      ),
    },
    {
      title: "VAPT for AI/LLMs",
      description: "Vulnerability Assessment and Penetration Testing services specifically designed for LLM applications.",
      link: "/solutions/vapt",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.01-.303 1.97-.843 2.809-.533.86-.937 1.34-1.328 1.737C17.075 18.068 15.6 19.5 12 19.5c-3.6 0-5.075-1.432-6.829-3.214-.391-.397-.795-.877-1.328-1.737A5.992 5.992 0 0 1 3 12c0-1.01.303-1.97.843-2.809.533-.86.937-1.34 1.328-1.737C6.925 5.932 8.4 4.5 12 4.5c3.6 0 5.075 1.432 6.829 3.214.391.397.795.877 1.328 1.737A5.992 5.992 0 0 1 21 12Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-[var(--background)] hero-glowing-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--text-primary)]">
            Our Comprehensive AI Security Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[var(--text-secondary)] max-w-3xl mx-auto">
            Safeguard your AI and LLM applications with our advanced, enterprise-grade security offerings.
          </p>
          <button
            onClick={openDemoModal}
            className="bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] text-[var(--foreground)] px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Get a Demo
          </button>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 px-6 md:px-12 bg-[var(--card-background)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--text-primary)]">
            Explore Our Core Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionItems.map((solution, index) => (
              <Link href={solution.link} key={index}>
                <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--card-background)] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="mb-4">{solution.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">{solution.title}</h3>
                  <p className="text-[var(--text-secondary)] text-base flex-grow">{solution.description}</p>
                  <span className="mt-4 text-accent-cyan hover:text-accent-teal transition-colors inline-flex items-center">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-[var(--background)] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]">
            Ready to Secure Your AI Future?
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8">
            Contact us today to discuss your specific AI security needs and discover how VICTO AI can help.
          </p>
          <button
            onClick={openConsultationModal}
            className="bg-accent-cyan hover:bg-accent-teal text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Get a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
} 