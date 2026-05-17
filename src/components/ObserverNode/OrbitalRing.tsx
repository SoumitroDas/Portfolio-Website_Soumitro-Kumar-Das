import React from 'react';
import { motion } from 'motion/react';

interface Props {
  position: { x: number; y: number };
  visible: boolean;
}

export const OrbitalRing: React.FC<Props> = ({ position, visible }) => {
  return (
    <motion.div 
      className="absolute pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: visible ? 1 : 0,
        left: position.x,
        top: position.y,
      }}
      transition={{ duration: 0.8 }}
      style={{
        transform: 'translate(-50%, -50%)',
      }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
        {/* Gyro Ring 1 */}
        <motion.ellipse
          cx="100" cy="100" rx="90" ry="45"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        {/* Gyro Ring 2 - Opposite tilt and rotation */}
        <motion.ellipse
          cx="100" cy="100" rx="50" ry="90"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
};
