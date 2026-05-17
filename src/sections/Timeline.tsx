import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { TIMELINE_DATA } from '../lib/constants';

export const Timeline: React.FC = () => {
    return (
        <section id="timeline" className="py-24 px-6 md:px-20 relative">
            <div className="max-w-4xl mx-auto">
                <div className="mb-24 text-center">
                    <h2 className="font-display text-4xl md:text-6xl mb-4">Trajectory</h2>
                    <p className="font-mono text-xs text-textSecondary uppercase tracking-widest">A linear narrative of intellectual expansion.</p>
                </div>
                
                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
                    
                    <div className="space-y-24">
                        {TIMELINE_DATA.map((item, i) => (
                            <div key={i} className={`flex items-center justify-between w-full ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                <motion.div 
                                    initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`w-[45%] ${i % 2 === 0 ? 'text-left' : 'text-right'}`}
                                >
                                    <span className="font-mono text-xs text-accentCyan mb-2 block">{item.year}</span>
                                    <p className="text-textPrimary text-lg font-light leading-relaxed">
                                        {item.entry}
                                    </p>
                                </motion.div>
                                
                                <div className="z-10 bg-bgPrimary border border-white/20 w-3 h-3 rounded-full" />
                                
                                <div className="w-[45%]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
