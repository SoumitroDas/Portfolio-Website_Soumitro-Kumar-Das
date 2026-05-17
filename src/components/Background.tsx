import React, { useEffect, useRef } from 'react';
import { COLORS, MATH_NOTATIONS } from '../lib/constants';

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  const mathStrings = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles.current = Array.from({ length: window.innerWidth < 768 ? 20 : 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));

      mathStrings.current = Array.from({ length: 15 }, () => ({
        text: MATH_NOTATIONS[Math.floor(Math.random() * MATH_NOTATIONS.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vy: 0.15 + Math.random() * 0.25,
        opacity: 0.05 + Math.random() * 0.03,
      }));
    };

    window.addEventListener('resize', resize);
    resize();

    let rafId: number;
    const render = () => {
      if (document.visibilityState !== 'visible') {
        rafId = requestAnimationFrame(render);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Neural Lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.current.length; i++) {
        const p1 = particles.current[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        
        if (p1.x < 0) p1.x = canvas.width;
        if (p1.x > canvas.width) p1.x = 0;
        if (p1.y < 0) p1.y = canvas.height;
        if (p1.y > canvas.height) p1.y = 0;

        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 120) * 0.08})`;
            ctx.stroke();
          }
        }
      }

      // Draw Particles
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      particles.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Math Strings
      ctx.font = '14px "JetBrains Mono"';
      mathStrings.current.forEach(m => {
        m.y -= m.vy;
        if (m.y < -20) m.y = canvas.height + 20;
        ctx.fillStyle = `rgba(229, 231, 235, ${m.opacity})`;
        ctx.fillText(m.text, m.x, m.y);
      });

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
