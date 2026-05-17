import React from 'react';
import { motion } from 'motion/react';

const achievements = [
  "International Top Breaking Adjudicator — 7th Bicol Intervarsity, Philippines (2023)",
  "Senior Executive Member — Rajshahi University Debating Forum (2019–2025)",
  "Project Newborn — mentored 107 first-year students",
  "Program Director — Voice of Victory 1.0",
  "Founded — Applied Mathematics Association of Debate"
];

export const Debate: React.FC = () => {
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
                
                @keyframes travelDot {
                  0% { offset-distance: 0%; opacity: 1; }
                  100% { offset-distance: 100%; opacity: 0.0; }
                }
                .travel-dot {
                  animation: travelDot 2s linear infinite;
                  offset-path: path('M 50,50 L 50,15');
                }
                .travel-dot-2 { offset-path: path('M 50,50 L 85,50'); animation: travelDot 2.2s linear infinite 0.5s; }
                .travel-dot-3 { offset-path: path('M 50,50 L 50,85'); animation: travelDot 2.4s linear infinite 1s; }
                .travel-dot-4 { offset-path: path('M 50,50 L 15,50'); animation: travelDot 2.6s linear infinite 1.5s; }
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
                        <line x1="50" y1="50" x2="50" y2="15" className="stroke-white/10" />
                        <line x1="50" y1="50" x2="85" y2="50" className="stroke-white/10" />
                        <line x1="50" y1="50" x2="50" y2="85" className="stroke-white/10" />
                        <line x1="50" y1="50" x2="15" y2="50" className="stroke-white/10" />

                        {/* Dots */}
                        <circle r="1" className="fill-accentGold travel-dot" />
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
