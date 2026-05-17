import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionMode, SECTIONS } from '../../lib/constants';

interface Props {
  position: { x: number; y: number };
  energyLevel: number;
  sectionMode: SectionMode;
  isPulsing: boolean;
}

export const StarCore: React.FC<Props> = ({ position, energyLevel, sectionMode, isPulsing }) => {
  const getSectionColor = (mode: SectionMode) => {
    switch (mode) {
      case SECTIONS.RESEARCH: return '#A78BFA'; // soft violet
      case SECTIONS.PROJECTS: return '#FCD34D'; // soft yellow/gold
      case SECTIONS.DEBATE: return '#4ADE80'; // soft green
      case SECTIONS.INQUIRY: return '#E5E7EB'; // soft white
      case SECTIONS.TIMELINE: return '#D4A373'; // soft gold
      default: return '#38BDF8'; // soft cyan
    }
  };

  const currentColor = getSectionColor(sectionMode);

  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Ambient Radial Glow */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-[25px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: isPulsing ? [0.4, 0.9, 0.4] : [0.2, 0.4, 0.2],
          backgroundColor: currentColor,
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: 60, height: 60, transform: 'translate(-50%, -50%)' }}
      />

      {/* The Star Sparkle */}
      <svg width="60" height="60" viewBox="0 0 40 40" className="overflow-visible">
        <defs>
            <filter id="starGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        <motion.path
          d="M 20 0 L 22 18 L 40 20 L 22 22 L 20 40 L 18 22 L 0 20 L 18 18 Z"
          fill="#B8E8FF"
          filter="url(#starGlow)"
          animate={{
            rotate: 360,
            scale: 1 + energyLevel * 0.4,
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.2 },
          }}
          style={{ transformOrigin: 'center' }}
        />
        
        {/* Shimmer particles loosely orbiting */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            r="0.8"
            fill="white"
            animate={{
              x: 20 + Math.cos(i * 1.5) * (18 + energyLevel * 5),
              y: 20 + Math.sin(i * 1.5) * (18 + energyLevel * 5),
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Radical Glow on Pulse (Button Click) */}
      <AnimatePresence>
        {isPulsing && (
          <motion.div 
            className="absolute rounded-full border border-white/10"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 250, height: 250, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 50px ${currentColor}`
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
