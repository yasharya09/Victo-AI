'use client';

import React, { useState } from 'react';
import { useCTA } from '@/components/CTAManager';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Careers() {
  const { openConsultationModal } = useCTA();
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'research', name: 'Research & Development' },
    { id: 'security', name: 'Security' },
    { id: 'sales', name: 'Sales & Business Development' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'operations', name: 'Operations' },
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Senior AI Security Engineer',
      department: 'engineering',
      location: 'Remote / San Francisco, CA',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead the development of cutting-edge AI security solutions, focusing on LLM security, prompt injection prevention, and model hardening.',
      requirements: [
        'Strong background in machine learning and cybersecurity',
        'Experience with Python, TensorFlow/PyTorch, and security frameworks',
        'Knowledge of LLM architectures and security vulnerabilities',
        'Experience with adversarial machine learning techniques',
      ],
    },
    {
      id: 2,
      title: 'AI Security Researcher',
      department: 'research',
      location: 'Remote / New York, NY',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Conduct cutting-edge research on AI security threats, develop novel attack and defense methodologies, and publish findings.',
      requirements: [
        'PhD in Computer Science, AI, or related field preferred',
        'Strong publication record in AI/ML security',
        'Experience with red teaming and penetration testing',
        'Knowledge of emerging AI security threats',
      ],
    },
    {
      id: 3,
      title: 'Security Solutions Architect',
      department: 'sales',
      location: 'Remote / Austin, TX',
      type: 'Full-time',
      experience: '7+ years',
      description: 'Work with enterprise clients to design and implement comprehensive AI security solutions tailored to their specific needs.',
      requirements: [
        'Strong technical background in cybersecurity',
        'Experience with enterprise sales and solution architecture',
        'Knowledge of AI/ML technologies and security implications',
        'Excellent communication and presentation skills',
      ],
    },
    {
      id: 4,
      title: 'AI Security Operations Specialist',
      department: 'operations',
      location: 'Remote / Seattle, WA',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Monitor and respond to AI security incidents, implement security controls, and maintain security infrastructure.',
      requirements: [
        'Experience with SIEM tools and security monitoring',
        'Knowledge of incident response procedures',
        'Familiarity with AI/ML security threats',
        'Strong analytical and problem-solving skills',
      ],
    },
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobListings 
    : jobListings.filter(job => job.department === selectedDepartment);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-6 md:px-12 bg-[var(--background)] hero-glowing-background">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--text-primary)]">
              Join Our Mission
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[var(--text-secondary)] max-w-3xl mx-auto">
              Help us secure the future of AI by joining a team of passionate security researchers, engineers, and innovators.
            </p>
            <button
              onClick={openConsultationModal}
              className="bg-accent-cyan hover:bg-accent-teal text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block transform hover:-translate-y-1 duration-300"
            >
              Get in Touch
            </button>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-16 px-6 md:px-12 bg-[var(--card-background)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--text-primary)]">
              Why Join VICTO AI?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Cutting-Edge Technology</h3>
                <p className="text-[var(--text-secondary)]">Work with the latest AI technologies and security frameworks in a rapidly evolving field.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Collaborative Culture</h3>
                <p className="text-[var(--text-secondary)]">Join a team that values collaboration, innovation, and continuous learning.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">Meaningful Impact</h3>
                <p className="text-[var(--text-secondary)]">Help secure AI systems that will shape the future of technology and society.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-16 px-6 md:px-12 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[var(--text-primary)]">
              Open Positions
            </h2>
            
            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDepartment === dept.id
                      ? 'bg-accent-cyan text-white'
                      : 'bg-[var(--card-background)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-6 bg-[var(--card-background)] rounded-lg border border-[var(--border-color)] hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                          </svg>
                          {job.type}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 bg-accent-cyan hover:bg-accent-teal text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Apply Now
                    </button>
                  </div>
                  
                  <p className="text-[var(--text-secondary)] mb-4">
                    {job.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-sm text-[var(--text-secondary)]">
                          <span className="text-accent-cyan mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[var(--text-secondary)] text-lg">
                  No open positions in this department at the moment.
                </p>
                <p className="text-[var(--text-secondary)] mt-2">
                  Check back later or send us your resume for future opportunities.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 bg-[var(--card-background)] text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]">
              Don't See the Right Fit?
            </h2>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8">
              We're always looking for talented individuals to join our team. Send us your resume and let's discuss how you can contribute to our mission.
            </p>
            <button
              onClick={openConsultationModal}
              className="bg-accent-cyan hover:bg-accent-teal text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block transform hover:-translate-y-1 duration-300"
            >
              Send Your Resume
            </button>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
} 