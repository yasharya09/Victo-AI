import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-[var(--background)] hero-glowing-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--text-primary)]">About VICTO AI</h1>
          <p className="text-xl md:text-2xl mb-8 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Advancing the frontier of AI Security for enterprises worldwide. Learn about our vision, mission, team, and commitment to innovation.
          </p>
          <Link
            href="/contact"
            className="bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] text-[var(--foreground)] px-8 py-3 rounded-lg font-medium transition-colors inline-block transform hover:-translate-y-1 duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-6 md:px-12 bg-[var(--card-background)]">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-accent-cyan">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold mb-4 text-[var(--text-primary)]">Our Vision & Mission</h2>
          <p className="text-[var(--text-secondary)] mb-2">
            <span className="font-bold">Vision:</span> To be the leading global provider of enterprise-grade AI security solutions, safeguarding the future of AI innovation.
          </p>
          <p className="text-[var(--text-secondary)]">
            <span className="font-bold">Mission:</span> To empower organizations to securely build, deploy, and manage AI/LLM applications by providing comprehensive, proactive, and intelligent security solutions that mitigate emerging threats and ensure data integrity.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-accent-cyan">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 15.232a4 4 0 1 0-6.464 0M12 3v1m0 16v1m8.485-8.485h-1M4.515 12.515h-1m15.364 4.95l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border border-[var(--border-color)] bg-white/5 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Yuvraj Singh, Founder, Victo AI</h3>
              <p className="text-[var(--text-secondary)]">Yuvraj leads the vision to secure the future of AI-powered technologies. With expertise in incident response, LLM vulnerability research, and AI-native threat intelligence, he focuses on building secure-by-design architectures for modern AI systems. At Victo AI, he is committed to helping organizations build trust in artificial intelligence through resilience, innovation, and robust security practices.</p>
            </div>
            {/* Removed placeholder for additional team members */}
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="mb-16 text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-accent-cyan">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4m8-4h-4m-8 0H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">The Market Opportunity</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            The rapid adoption of AI/LLM technologies across industries presents unprecedented security challenges. The global AI security market is projected to grow significantly, driven by increasing regulatory scrutiny, sophisticated AI-specific attacks, and the need for robust data protection.
          </p>
          <p className="text-[var(--text-secondary)]">
            VICTO AI is uniquely positioned to capture a substantial share of this growing market by offering specialized, enterprise-grade solutions that address the critical security gaps in AI deployments. [Include specific market data, growth projections, and your competitive advantages here].
          </p>
        </div>

        {/* Our Commitment */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-accent-cyan">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Our Commitment</h2>
          <p className="text-[var(--text-secondary)]">
            We are committed to continuous innovation, staying ahead of emerging AI threats, and providing our clients with the most advanced and reliable security solutions. Our dedication to research, ethical AI practices, and client success drives everything we do.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 md:px-12 bg-[var(--background)] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]">
            Join Us in Securing the Future of AI
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8">
            Connect with our team to learn more about our mission, solutions, and how we can help your organization.
          </p>
          <Link
            href="/contact"
            className="bg-accent-cyan hover:bg-accent-teal text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block transform hover:-translate-y-1 duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
} 