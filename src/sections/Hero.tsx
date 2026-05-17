import React from 'react';
import { motion } from 'motion/react';
import { COLORS } from '../lib/constants';

export const Hero: React.FC = () => {
  const descriptors = [
    'Mathematical Epidemiology',
    'Fractional Dynamics',
    'Dynamical Systems',
    'Machine Learning',
    'AI-Assisted Modeling',
    'Public Reasoning & Debate',
    'Systems & Consciousness Inquiry',
  ];

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % descriptors.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, callback: () => void) => {
    const btn = e.currentTarget;
    btn.classList.add('animate-button-flash');
    setTimeout(() => btn.classList.remove('animate-button-flash'), 400);
    // Trigger the star pulse/flash
    (window as any).dispatchStarPulse?.();
    callback();
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative px-6 md:px-20 overflow-hidden py-20 md:py-0">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="space-y-8 z-10">
          <div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight text-textPrimary leading-[1.1]">
              Soumitro Kumar Das Shuvro
            </h1>
          </div>

          <p className="text-textSecondary text-lg md:text-xl font-light tracking-wide italic max-w-xl">
            Computational Applied Mathematician | Researcher in Complex Systems & Intelligence
          </p>

          <div className="h-10 flex items-center font-mono text-sm uppercase tracking-widest text-accentCyan">
            <span className="mr-4">&gt; Exploring:</span>
            <motion.span
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-textPrimary"
            >
              {descriptors[index]}
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button 
              onClick={(e) => handleButtonClick(e, () => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' }))}
              className="px-6 py-2.5 bg-accentCyan text-bgPrimary text-xs font-bold uppercase tracking-widest rounded-sm hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              Explore Research
            </button>
            <button 
              onClick={(e) => handleButtonClick(e, () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }))}
              className="px-6 py-2.5 border border-white/20 text-textPrimary text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white/5 transition-all"
            >
              View Projects
            </button>
            <button 
              onClick={(e) => handleButtonClick(e, () => (window as any).dispatchContactModal?.())}
              className="px-6 py-2.5 bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white/10 transition-all font-mono"
            >
              Request Collaboration
            </button>
          </motion.div>
        </div>

        <div className="hidden md:flex justify-center items-center relative h-[500px]">
             {/* Dynamic background field */}
             <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100">
                <defs>
                   <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1"/>
                   </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                <motion.circle 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.05" strokeDasharray="1 2"
                />
             </svg>

             {/* Recent Highlight Card */}
             <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute -bottom-24 p-6 border border-white/10 bg-bgSurface/40 backdrop-blur-xl rounded-lg max-w-xs space-y-4 shadow-2xl cursor-pointer hover:border-accentCyan/50 transition-colors group z-20"
             >
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <p className="font-mono text-accentCyan text-[10px] uppercase tracking-widest">Recent Highlight</p>
                      <h3 className="font-display text-xl text-textPrimary group-hover:text-accentCyan transition-colors">Q1 Publication</h3>
                   </div>
                   <div className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center group-hover:border-accentCyan/30 transition-colors">
                      <div className="w-1.5 h-1.5 bg-accentCyan rounded-full animate-pulse" />
                   </div>
                </div>
                
                <div className="space-y-3 pt-2">
                   <p className="text-textSecondary text-xs font-light leading-relaxed">
                     Published in <span className="text-textPrimary font-medium">Arab Journal of Basic and Applied Sciences</span>. 
                     Modeling complexity in mathematical epidemiology.
                   </p>
                   <div className="flex items-center gap-2 text-accentCyan text-[10px] font-mono uppercase tracking-widest pt-2">
                      <span>View Details</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >→</motion.span>
                   </div>
                </div>
             </motion.div>
        </div>
      </div>
    </section>
  );
};
