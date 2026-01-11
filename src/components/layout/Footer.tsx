'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-background border-t border-border pt-20 pb-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/victoai-logo-compact.svg"
                                alt="VICTO AI"
                                width={140}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-muted-foreground leading-relaxed">
                            Securing the future of Artificial Intelligence. Enterprise-grade protection for LLMs and AI infrastructure.
                        </p>
                        <div className="flex space-x-4">
                            <SocialLink href="#" icon={FaTwitter} label="Twitter" />
                            <SocialLink href="#" icon={FaLinkedin} label="LinkedIn" />
                            <SocialLink href="#" icon={FaGithub} label="GitHub" />
                            <SocialLink href="#" icon={FaDiscord} label="Discord" />
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Solutions</h4>
                        <ul className="space-y-4">
                            <FooterLink href="/solutions/ai-soc">AI SOC</FooterLink>
                            <FooterLink href="/solutions/vapt">VAPT for AI/LLMs</FooterLink>
                            <FooterLink href="/solutions/ai-incident-response">Incident Response</FooterLink>
                            <FooterLink href="/solutions/ai-security-posture">Security Posture</FooterLink>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <FooterLink href="/resources/blog">Blog</FooterLink>
                            <FooterLink href="/resources/whitepapers">Whitepapers</FooterLink>
                            <FooterLink href="/resources/documentation">Documentation</FooterLink>
                            <FooterLink href="/resources/api">API Reference</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Stay Updated</h4>
                        <p className="text-muted-foreground mb-4 text-sm">
                            Get the latest AI security insights and updates.
                        </p>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} VICTO AI. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <FooterLink href="/privacy" className="text-sm">Privacy Policy</FooterLink>
                        <FooterLink href="/terms" className="text-sm">Terms of Service</FooterLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <a
            href={href}
            className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-full"
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}

function FooterLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
    return (
        <li>
            <Link
                href={href}
                className={`text-muted-foreground hover:text-primary transition-colors ${className}`}
            >
                {children}
            </Link>
        </li>
    );
}
