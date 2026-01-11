'use client';

import { motion } from 'framer-motion';
import {
    HiShieldCheck,
    HiCpuChip,
    HiEye,
    HiLockClosed
} from 'react-icons/hi2';

// Fallback SVGs if icons package isn't perfect
const Icons = {
    Shield: HiShieldCheck,
    Eye: HiEye,
    Brain: HiCpuChip,
    Lock: HiLockClosed
};

const features = [
    {
        title: "AI SOC",
        description: "24/7 Real-time monitoring of prompt injection attacks and model anomalies.",
        icon: Icons.Eye,
        color: "from-blue-500 to-cyan-400",
        href: "/solutions/ai-soc"
    },
    {
        title: "LLM Firewalls",
        description: "Input/Output filtering to prevent data leakage and toxic responses.",
        icon: Icons.Shield,
        color: "from-violet-500 to-purple-400",
        href: "/solutions/output-sanitization"
    },
    {
        title: "VAPT for AI",
        description: "Adversarial testing specifically designed for Large Language Models.",
        icon: Icons.Brain,
        color: "from-pink-500 to-rose-400",
        href: "/solutions/vapt"
    },
    {
        title: "Compliance",
        description: "Ensure your AI stack meets NIST, EU AI Act, and GDPR standards.",
        icon: Icons.Lock,
        color: "from-emerald-500 to-green-400",
        href: "/solutions/ai-security-posture"
    }
];

export function Features() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6"
                    >
                        Comprehensive AI Defense
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground"
                    >
                        A unified platform to secure every layer of your generative AI stack.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(112,0,255,0.15)]"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 mb-6 text-white shadow-lg`}>
                                    <feature.icon />
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {feature.description}
                                </p>

                                <a href={feature.href} className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors">
                                    Learn more
                                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
