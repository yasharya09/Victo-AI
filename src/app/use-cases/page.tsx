'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function UseCases() {
  const { openConsultationModal } = useCTA();

  const useCaseItems = [
    {
      title: "AI Model Exfiltration & Leakage Prevention",
      description: "Protecting proprietary AI models and training data from unauthorized access and theft.",
      link: "/use-cases/ai-model-exfiltration",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3v.225c0 .141-.01.282-.025.421M16.49 8.25c-2.4-.2-4.8-.49-7.2-.68m-1.47 5.75a60.07 60.07 0 0 0 6.643 3.7c.365.114.666.258.906.402M13.5 12a6 6 0 0 0-3-5.25H9v4.5m0 0H7.5m4.5 0H12" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.375 16.5H12c-2.75 0-5.385.422-7.5 1.294m16.5 1.206V21h-2.75m-14.25-3.5L5.75 21H3V8.25a6 6 0 0 1 7.5-6.526M21 21L12.375 16.5" />
        </svg>
      ),
    },
    {
      title: "AI Hallucination Detection & Prevention",
      description: "Identifying and preventing AI models from generating false or misleading information.",
      link: "/use-cases/hallucination-detection",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.732 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      ),
    },
    {
      title: "AI Inference Abuse & Overuse Prevention",
      description: "Monitoring and controlling inference usage to prevent resource exhaustion and cost overruns.",
      link: "/use-cases/inference-abuse",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m0 0H6" />
        </svg>
      ),
    },
    {
      title: "LLM Jailbreaking Prevention",
      description: "Bypassing safety measures and ethical guidelines in AI models.",
      link: "/use-cases/llm-jailbreaking",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75l-6-6h12l-6 6z" />
        </svg>
      ),
    },
    {
      title: "AI Poisoning & Supply-chain Attack Prevention",
      description: "Detecting and preventing attacks that compromise training data or model components.",
      link: "/use-cases/poisoning-supply-chain",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21v-4.5m2.25-4.5h-4.5m7.5 10.137a9.004 9.004 0 0 1-18 0m18 0a9.004 9.004 0 0 0-18 0m18 0V2.25m18 12.001V2.25M12 2.25V4.5m2.25 4.5h-4.5m3.75 6.75h-3.75" />
        </svg>
      ),
    },
    {
      title: "Prompt Injection Prevention",
      description: "Manipulating AI models by inserting malicious instructions into user inputs.",
      link: "/use-cases/prompt-injection",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75l-6-6h12l-6 6z" />
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
            AI Security Use Cases
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[var(--text-secondary)] max-w-3xl mx-auto">
            Discover how our AI security solutions address real-world challenges and protect your AI systems.
          </p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-16 px-6 md:px-12 bg-[var(--card-background)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--text-primary)]">
            Common AI Security Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCaseItems.map((useCase, index) => (
              <Link href={useCase.link} key={index} className="transform hover:-translate-y-1 duration-300">
                <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--card-background)] hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full">
                  <div className="mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">{useCase.title}</h3>
                  <p className="text-[var(--text-secondary)] text-base flex-grow">{useCase.description}</p>
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
            Ready to Fortify Your AI Defenses?
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8">
            Reach out to us to discover tailored strategies for your AI security challenges.
          </p>
          <button
            onClick={openConsultationModal}
            className="bg-accent-cyan hover:bg-accent-teal text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block transform hover:-translate-y-1 duration-300"
          >
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  );
} 