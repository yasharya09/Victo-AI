import React from "react";
import Link from "next/link";

export default function Whitepapers() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-primary">Whitepapers & Research</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "The Evolution of AI Security Threats",
            description: "A comprehensive analysis of emerging threats in AI systems and effective countermeasures.",
            category: "Research",
            date: "March 2024",
            link: "/resources/whitepapers/ai-security-threats"
          },
          {
            title: "LLM Security Best Practices",
            description: "Guidelines for securing Large Language Models in enterprise environments.",
            category: "Whitepaper",
            date: "February 2024",
            link: "/resources/whitepapers/llm-security"
          },
          {
            title: "AI Security Posture Assessment Framework",
            description: "A detailed framework for evaluating and improving AI security posture.",
            category: "Framework",
            date: "January 2024",
            link: "/resources/whitepapers/security-posture"
          },
          {
            title: "Prompt Injection Defense Strategies",
            description: "Advanced techniques for preventing and detecting prompt injection attacks.",
            category: "Research",
            date: "December 2023",
            link: "/resources/whitepapers/prompt-injection"
          },
          {
            title: "AI Model Privacy Protection",
            description: "Methods for protecting sensitive data in AI training and inference.",
            category: "Whitepaper",
            date: "November 2023",
            link: "/resources/whitepapers/ai-privacy"
          },
          {
            title: "Secure RAG Implementation Guide",
            description: "Best practices for implementing secure Retrieval-Augmented Generation systems.",
            category: "Guide",
            date: "October 2023",
            link: "/resources/whitepapers/secure-rag"
          }
        ].map((paper, index) => (
          <div 
            key={index}
            className="p-6 rounded-lg bg-card border border-border hover:border-accent-cyan/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-sm rounded-full bg-accent-cyan/20 text-accent-cyan">
                {paper.category}
              </span>
              <span className="text-sm text-secondary">
                {paper.date}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-primary">{paper.title}</h3>
            <p className="text-secondary mb-4">
              {paper.description}
            </p>
            <Link 
              href={paper.link}
              className="text-accent-cyan hover:text-accent-teal inline-flex items-center transition-colors"
            >
              Read more
              <span className="ml-2">→</span>
            </Link>
          </div>
        ))}
      </div>

      <section className="mt-16 bg-primary p-8 rounded-lg border border-border">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-50">Stay Updated</h2>
        <p className="text-neutral-200 mb-6">
          Subscribe to our newsletter to receive the latest research, whitepapers, and insights on AI security.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/contact"
            className="bg-accent-cyan hover:bg-accent-teal text-primary-900 px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Subscribe Now
          </Link>
          <Link 
            href="/resources"
            className="bg-transparent border-2 border-neutral-50 text-neutral-50 hover:bg-neutral-50/10 px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            View All Resources
          </Link>
        </div>
      </section>
    </div>
  );
} 