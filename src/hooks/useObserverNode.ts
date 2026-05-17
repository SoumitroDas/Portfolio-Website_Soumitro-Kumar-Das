import { useState, useEffect, useCallback, useRef } from 'react';
import { useScroll, useVelocity } from 'motion/react';
import { SectionMode, SECTIONS } from '../lib/constants';
import gsap from 'gsap';

export type NodeMode = 'resting' | 'comet';

export function useObserverNode() {
  const { scrollY } = useScroll();
  const [energyLevel, setEnergyLevel] = useState(0);
  const [sectionMode, setSectionMode] = useState<SectionMode>(SECTIONS.HERO);
  const [isPulsing, setIsPulsing] = useState(false);
  const [nodeMode, setNodeMode] = useState<NodeMode>('resting');

  // Track scroll for mode transitions
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 80 && nodeMode === 'resting') {
        setNodeMode('comet');
      } else if (latest < 30 && nodeMode === 'comet') {
        setNodeMode('resting');
      }
    });
    return () => unsubscribe();
  }, [scrollY, nodeMode]);

  const triggerPulse = useCallback(() => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 800);
  }, []);

  return {
    energyLevel,
    nodeMode,
    sectionMode,
    setSectionMode,
    isPulsing,
    triggerPulse,
  };
}

