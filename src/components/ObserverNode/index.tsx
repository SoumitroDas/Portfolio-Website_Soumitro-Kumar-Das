import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionMode, SECTIONS } from '../../lib/constants';
import { OrbitalRing } from './OrbitalRing';
import { StarCore } from './StarCore';
import gsap from 'gsap';

interface Props {
  energyLevel: number;
  sectionMode: SectionMode;
  nodeMode: 'resting' | 'comet';
  isPulsing: boolean;
}

export const ObserverNode: React.FC<Props> = ({ energyLevel, sectionMode, nodeMode, isPulsing }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: window.innerWidth * 0.68, y: window.innerHeight * 0.45 });
  const mouse = useRef({ x: ringPos.current.x, y: ringPos.current.y });
  const starPos = useRef({ x: ringPos.current.x, y: ringPos.current.y });
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const [trail, setTrail] = useState<{ x: number; y: number; opacity: number }[]>([]);

  // Update ring position on resize
  useEffect(() => {
    const handleResize = () => {
      ringPos.current = { x: window.innerWidth * 0.68, y: window.innerHeight * 0.45 };
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation Loop
  useEffect(() => {
    let rafId: number;
    const tick = () => {
      if (nodeMode === 'resting') {
        // Smoothly return to ring center
        starPos.current.x += (ringPos.current.x - starPos.current.x) * 0.08;
        starPos.current.y += (ringPos.current.y - starPos.current.y) * 0.08;
      } else {
        // Lerp towards cursor
        starPos.current.x += (mouse.current.x - starPos.current.x) * 0.06;
        starPos.current.y += (mouse.current.y - starPos.current.y) * 0.06;
      }

      // Direct DOM update for star
      if (starRef.current) {
        starRef.current.style.transform = `translate3d(${starPos.current.x}px, ${starPos.current.y}px, 0)`;
      }

      // Update trail array
      if (nodeMode === 'comet') {
        trailRef.current.push({ x: starPos.current.x, y: starPos.current.y });
        if (trailRef.current.length > 10) trailRef.current.shift();
        
        // We still need a React update for the trail dots if we render them as components
        // but let's try to keep it optimized
        setTrail(trailRef.current.map((p, i) => ({
          ...p,
          opacity: (i / trailRef.current.length) * 0.4
        })));
      } else {
        if (trailRef.current.length > 0) {
            trailRef.current = [];
            setTrail([]);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [nodeMode]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-visible"
      style={{ 
        width: '100vw', 
        height: '100vh', 
        transform: 'translateZ(0)', 
        willChange: 'transform', 
        contain: 'layout style' 
      }}
    >
      {/* Resting Rings - always at ringPos */}
      <OrbitalRing 
        position={ringPos.current} 
        visible={nodeMode === 'resting' || starPos.current.y < window.innerHeight } 
      />

      {/* Comet Trail */}
      <AnimatePresence>
        {trail.map((point, i) => (
          <motion.div
            key={`trail-${i}`}
            className="absolute rounded-full bg-accentCyan blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: point.opacity,
                left: point.x,
                top: point.y,
                width: 2 + i,
                height: 2 + i,
            }}
            exit={{ opacity: 0 }}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </AnimatePresence>

      {/* Star Core - Positioned via Ref for performance */}
      <div 
        ref={starRef}
        className="absolute top-0 left-0"
        style={{ transform: `translate3d(${starPos.current.x}px, ${starPos.current.y}px, 0)` }}
      >
        <StarCore 
          position={{ x: 0, y: 0 }} // Base position handled by parent div
          energyLevel={energyLevel}
          sectionMode={sectionMode}
          isPulsing={isPulsing}
        />
      </div>
    </div>
  );
};
