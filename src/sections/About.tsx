import React from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
    return (
        <section id="about" className="py-16 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <span className="font-mono text-xs text-accentCyan mb-2 block uppercase tracking-widest">01 / Perspective</span>
                    <h2 className="font-display text-4xl md:text-5xl leading-tight">Systems Thinking Across Domains</h2>
                </div>
                
                <div className="md:col-span-8 space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="p-8 bg-white/5 border border-white/5 rounded-sm"
                    >
                        <h3 className="font-mono text-xs text-accentCyan mb-4 uppercase tracking-wider">Research Vision</h3>
                        <p className="text-textPrimary text-lg leading-relaxed font-light">
                            My work resides at the intersection of abstract mathematics and applied intelligence. I develop hybrid frameworks that bridge deterministic models with probabilistic learning, aiming to decode the underlying structures of complex systems. I believe that rigorous mathematical formulation is not merely a tool for prediction, but a language for profound structural understanding.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        <h3 className="font-mono text-xs text-accentCyan uppercase tracking-widest">Leadership & Extracurricular</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-2">
                                <h4 className="font-display text-xl text-textPrimary">Rajshahi University Debating Forum</h4>
                                <p className="text-sm text-textSecondary">Former Senior Executive Member, Program Director (Voice of Victory 1.0), and Convenor (Freshers Debate Championship 2022). Mentored 107 students in Project Newborn.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-display text-xl text-textPrimary">Creative Arts</h4>
                                <p className="text-sm text-textSecondary">Exploring structural economy and temporal resonance through <span className="text-textPrimary">Flute</span> and <span className="text-textPrimary">Shayeri</span>.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-white/5">
                        <h3 className="font-mono text-xs text-accentGold uppercase tracking-widest">Certifications & Training</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-textSecondary">
                            <li className="flex gap-2">
                                <span className="text-accentGold">▹</span> 2 Day AI for Engineers (Outskill)
                            </li>
                            <li className="flex gap-2">
                                <span className="text-accentGold">▹</span> 2 Day AI Generalist Program (Outskill)
                            </li>
                            <li className="flex gap-2">
                                <span className="text-accentGold">▹</span> English Proficiency C1-Advanced (British Council)
                            </li>
                            <li className="flex gap-2">
                                <span className="text-accentGold">▹</span> Data Analytics: Excel, Power BI, Python & SQL (Tutorials Point Bangladesh)
                            </li>
                            <li className="flex gap-2">
                                <span className="text-accentGold">▹</span> Research Methodology (Research Help Bangladesh)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
