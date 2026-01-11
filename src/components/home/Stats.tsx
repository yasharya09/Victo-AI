'use client';

import { motion } from 'framer-motion';

const stats = [
    { value: "99.9%", label: "Threat Detection Rate" },
    { value: "<50ms", label: "Average Latency" },
    { value: "10M+", label: "Safe Prompts Processed" },
    { value: "24/7", label: "Automated Protection" },
];

export function Stats() {
    return (
        <section className="py-20 border-y border-white/5 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
