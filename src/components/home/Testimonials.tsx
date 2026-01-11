'use client';

import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "Victo AI Security has transformed how we protect our LLM infrastructure. Their anomaly detection is seconds ahead of anything else we've tested.",
        author: "Sarah Chen",
        role: "CTO",
        company: "TechCorp AI",
        image: "/images/avatars/avatar-1.png" // Placeholder, handle gracefully if missing
    },
    {
        quote: "The peace of mind we get knowing our sensitive data isn't leaking through prompt injections is invaluable. A must-have for enterprise AI.",
        author: "Michael Rodriguez",
        role: "CISO",
        company: "Global BioTech",
        image: "/images/avatars/avatar-2.png"
    },
    {
        quote: "Integration was seamless. We were protected within hours, not weeks. The blue team tools are a game changer for our QA process.",
        author: "Dr. Emily Watson",
        role: "Head of AI Research",
        company: "FutureFlow",
        image: "/images/avatars/avatar-3.png"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-background border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
                        Trusted by Industry Leaders
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.author}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors relative"
                        >
                            {/* Quote icon */}
                            <div className="absolute top-8 right-8 text-primary/20 text-6xl font-serif">"</div>

                            <p className="text-muted-foreground text-lg mb-8 relative z-10 leading-relaxed">
                                {item.quote}
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xl">
                                    {/* Fallback avatar using initials */}
                                    {item.author[0]}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">{item.author}</h4>
                                    <p className="text-sm text-muted-foreground">{item.role}, {item.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
