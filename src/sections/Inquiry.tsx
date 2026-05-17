import React from 'react';
import { motion } from 'motion/react';

const meditations = [
  {
    title: "ON REDUCTIONISM",
    body: "The act of modeling is always an act of reduction. We strip away the noise to find the signal, yet in doing so, we must continuously question what we have discarded."
  },
  {
    title: "ON MEMORY",
    body: "Memory in a fractional system is not stored in a location; it is distributed across the very topology of interactions. It is the shape of time."
  },
  {
    title: "ON OBSERVATION",
    body: "To observe a complex system without altering its state requires an architecture of stillness. True measurement is passive reception."
  },
  {
    title: "ON EQUILIBRIUM",
    body: "Equilibrium is merely a prolonged pause between chaotic attractors. Stability is an illusion born of limited temporal resolution."
  }
];

export const Inquiry: React.FC = () => {
    return (
        <section id="inquiry" className="py-48 px-6 md:px-20 max-w-2xl mx-auto text-center">
            <div className="space-y-48">
                {meditations.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        viewport={{ margin: "-100px" }}
                        className="space-y-8"
                    >
                        <h3 className="font-mono text-[13px] uppercase tracking-[0.3em] text-accentGold">
                            {m.title}
                        </h3>
                        <p className="font-display text-2xl md:text-3xl lg:text-4xl text-textPrimary leading-relaxed font-light italic">
                            {m.body}
                        </p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-48 pb-24"
            >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-textSecondary mb-8">
                  Ready to explore complex foundations together?
                </p>
                <button 
                    onClick={() => (window as any).dispatchContactModal?.()}
                    className="group relative px-12 py-5 bg-accentCyan text-bgPrimary font-bold uppercase tracking-[0.2em] text-sm overflow-hidden"
                >
                    <span className="relative z-10">Initialize Collaboration</span>
                    <motion.div 
                        className="absolute inset-0 bg-white"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                    />
                </button>
            </motion.div>
        </section>
    );
};
