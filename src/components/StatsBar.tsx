import React from 'react';
import { motion } from 'motion/react';

export const StatsBar: React.FC = () => {
  const stats = [
    { label: 'Publications', value: '3' },
    { label: 'Journal Rank', value: 'Q1' },
    { label: 'Students Mentored', value: '107+' },
    { label: 'Adj. Experience', value: 'International' },
  ];

  return (
    <div className="w-full border-y border-white/5 bg-bgSurface/5 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="flex flex-wrap justify-between items-center gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <React.Fragment key={i}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1 justify-center md:justify-start"
              >
                <span className="font-display text-2xl md:text-3xl text-accentCyan">{stat.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-textSecondary text-center md:text-left leading-tight">
                  {stat.label}
                </span>
              </motion.div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
