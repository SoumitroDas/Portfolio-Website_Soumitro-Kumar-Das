import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const achievements = [
  "International Top Breaking Adjudicator — 7th Bicol Intervarsity, Philippines (2023)",
  "Senior Executive Member — Rajshahi University Debating Forum (2019–2025)",
  "Project Newborn — mentored 107 first-year students",
  "Program Director — Voice of Victory 1.0",
  "Founded — Applied Mathematics Association of Debate"
];

export const Debate: React.FC = () => {
    useEffect(() => {
        gsap.to('.travel-dot-1', {
            motionPath: {
                path: '#connection-line-1',
                align: '#connection-line-1',
                alignOrigin: [0.5, 0.5]
            },
            duration: 2,
            repeat: -1,
            ease: 'none'
        });
        gsap.to('.travel-dot-2', {
            motionPath: {
                path: '#connection-line-2',
                align: '#connection-line-2',
                alignOrigin: [0.5, 0.5]
            },
            duration: 2.2,
            delay: 0.5,
            repeat: -1,
            ease: 'none'
        });
        gsap.to('.travel-dot-3', {
            motionPath: {
                path: '#connection-line-3',
                align: '#connection-line-3',
                alignOrigin: [0.5, 0.5]
            },
            duration: 2.4,
            delay: 1,
            repeat: -1,
            ease: 'none'
        });
        gsap.to('.travel-dot-4', {
            motionPath: {
                path: '#connection-line-4',
                align: '#connection-line-4',
                alignOrigin: [0.5, 0.5]
            },
            duration: 2.6,
            delay: 1.5,
            repeat: -1,
            ease: 'none'
        });
    }, []);

    return (
        <section id="debate" className="py-24 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/5">
            <style>{`
                @keyframes signalPulse {
                  0% { transform: scale(1); opacity: 0.6; }
                  100% { transform: scale(2.5); opacity: 0; }
                }
                .ring-1 { animation: signalPulse 2.4s ease-out infinite; }
                .ring-2 { animation: signalPulse 2.4s ease-out infinite 0.8s; }
                .ring-3 { animation: signalPulse 2.4s ease-out infinite 1.6s; }
            `}</style>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-12 mb-12 text-center">
                     <span className="font-mono text-xs text-accentGold mb-4 block uppercase tracking-widest">Reasoning as Infrastructure</span>
                     <h2 className="font-display text-4xl md:text-6xl text-textPrimary">Structured Argumentation</h2>
                </div>

                {/* Visualization */}
                <div className="lg:col-span-4 h-[400px]">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Rings */}
                        <circle cx="50" cy="50" r="10" className="ring-1 fill-accentGold/20" />
                        <circle cx="50" cy="50" r="10" className="ring-2 fill-accentGold/20" />
                        <circle cx="50" cy="50" r="10" className="ring-3 fill-accentGold/20" />
                        
                        {/* Central Node */}
                        <circle cx="50" cy="50" r="4" className="fill-accentGold" />
                        
                        {/* Satellites */}
                        <path id="connection-line-1" className="stroke-white/10" d="M 50,50 L 50,15" />
                        <path id="connection-line-2" className="stroke-white/10" d="M 50,50 L 85,50" />
                        <path id="connection-line-3" className="stroke-white/10" d="M 50,50 L 50,85" />
                        <path id="connection-line-4" className="stroke-white/10" d="M 50,50 L 15,50" />

                        {/* Dots */}
                        <circle r="1" className="fill-accentGold travel-dot-1" />
                        <circle r="1" className="fill-accentGold travel-dot-2" />
                        <circle r="1" className="fill-accentGold travel-dot-3" />
                        <circle r="1" className="fill-accentGold travel-dot-4" />

                        {/* Satellites Nodes */}
                        <circle cx="50" cy="15" r="3" className="fill-white/80 hover:fill-accentGold transition-colors cursor-help" />
                        <circle cx="85" cy="50" r="3" className="fill-white/80 hover:fill-accentGold transition-colors cursor-help" />
                        <circle cx="50" cy="85" r="3" className="fill-white/80 hover:fill-accentGold transition-colors cursor-help" />
                        <circle cx="15" cy="50" r="3" className="fill-white/80 hover:fill-accentGold transition-colors cursor-help" />
                    </svg>
                </div>

                {/* Timeline */}
                <div className="lg:col-span-8 space-y-6">
                    {achievements.map((a, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 p-4 border-l border-white/10 hover:border-accentGold transition-colors"
                        >
                            <span className="font-mono text-xs text-accentGold mt-1">0{i+1}</span>
                            <p className="text-textSecondary font-light text-sm">{a}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
