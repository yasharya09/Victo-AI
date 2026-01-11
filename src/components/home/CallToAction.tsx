'use client';

import { motion } from 'framer-motion';
import { useCTA } from "@/components/CTAManager";

export function CallToAction() {
    const { openConsultationModal } = useCTA();

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                    Ready to Secure Your AI Future?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
                >
                    Join leading enterprises in safeguarding your AI initiatives.
                    Get a comprehensive security assessment today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={openConsultationModal}
                        className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-white/90 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                    >
                        Schedule Consultation
                    </button>
                    <button
                        onClick={() => window.location.href = '/contact'}
                        className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-lg font-bold text-lg transition-all"
                    >
                        Contact Sales
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
