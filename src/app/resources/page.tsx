'use client';

import React from "react";
import Link from "next/link";
import { useCTA } from "@/components/CTAManager";

export default function Resources() {
  const { openDemoModal, openConsultationModal } = useCTA();
  const resourceLinks = [
    {
      href: "/resources/blog",
      title: "Blog",
      description: "Explore our latest articles on AI security, trends, and insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      href: "/resources/whitepapers",
      title: "Whitepapers",
      description: "Deep dive into our research and technical documents on AI security solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      href: "/resources/case-studies",
      title: "Case Studies",
      description: "See how our AI security solutions have helped organizations secure their AI deployments.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-cyan">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
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
            Explore Our Resources
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[var(--text-secondary)] max-w-3xl mx-auto">
            Access our blogs, whitepapers, research articles, videos, and more to stay ahead in AI Security.
          </p>
          <button
            onClick={openDemoModal}
            className="bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] text-[var(--foreground)] px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Get a Demo
          </button>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-6 md:px-12 bg-[var(--card-background)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--text-primary)]">
            Available Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceLinks.map((resource, index) => (
              <Link key={index} href={resource.href} className="block">
                <div className="bg-[var(--card-background)] rounded-lg p-6 border border-[var(--border-color)] hover:shadow-lg transition-shadow h-full flex flex-col items-center text-center">
                  <div className="mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">{resource.title}</h3>
                  <p className="text-[var(--text-secondary)] text-base flex-grow">{resource.description}</p>
                  <span className="mt-4 text-accent-cyan hover:text-accent-teal transition-colors inline-flex items-center">
                    Learn More →
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
            Ready to Dive Deeper?
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8">
            Reach out to us to discover tailored strategies for your AI security challenges.
          </p>
          <button
            onClick={openConsultationModal}
            className="bg-accent-cyan hover:bg-accent-teal text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  );
} 