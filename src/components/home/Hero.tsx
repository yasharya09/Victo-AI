'use client';

import { motion } from 'framer-motion';
import { useCTA } from "@/components/CTAManager"; // Assuming this exists from previous file
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
    const { openDemoModal } = useCTA();

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[128px] animate-pulse-glow delay-1000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-sm font-medium text-secondary-foreground">The Future of AI Security</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
                >
                    Secure Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient">
                        AI Infrastructure
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
                >
                    Enterprise-grade protection for LLMs and GenAI applications.
                    Prevent prompt injections, data leakage, and adversarial attacks in real-time.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={openDemoModal}
                        className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-[0_0_20px_rgba(112,0,255,0.3)]"
                    >
                        Get a Demo
                    </button>
                    <Link
                        href="/solutions"
                        className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all backdrop-blur-sm"
                    >
                        View Solutions
                    </Link>
                </motion.div>

                {/* Floating Trusted Logos - Simplified 3D effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-20 pt-10 border-t border-white/5"
                >
                    <p className="text-sm text-muted-foreground mb-6">TRUSTED BY INNOVATORS</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <Image src="/images/logos/lakera-ai-logo.svg" alt="Lakera" width={100} height={40} className="h-8 w-auto" />
                        <Image src="/images/logos/protect_ai_logo.svg" alt="Protect AI" width={100} height={40} className="h-8 w-auto invert" />
                        {/* Placeholders for visual balance if needed, or stick to real ones */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
