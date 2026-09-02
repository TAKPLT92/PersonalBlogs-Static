'use client';

import { useEffect, useRef } from 'react';

const COLORS = [
  'rgba(255, 183, 197, 0.55)',
  'rgba(255, 205, 214, 0.5)',
  'rgba(244, 164, 181, 0.5)',
  'rgba(255, 220, 225, 0.55)',
];

export default function SakuraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let petals: Array<Record<string, number | string>> = [];
    let raf = 0;

    const make = (init = false) => ({
      x: Math.random() * width,
      y: init ? Math.random() * height : -20 - Math.random() * height * 0.2,
      size: 3 + Math.random() * 5,
      speedY: 0.4 + Math.random() * 0.8,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.005 + Math.random() * 0.015,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.4 + Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const count = Math.max(12, Math.min(40, Math.floor(width / 55)));
      petals = Array.from({ length: count }, () => make(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.y = (p.y as number) + (p.speedY as number);
        p.sway = (p.sway as number) + (p.swaySpeed as number);
        p.x = (p.x as number) + Math.sin(p.sway as number) * 0.35;
        p.rotation = (p.rotation as number) + (p.rotationSpeed as number);

        if ((p.y as number) > height + 20) Object.assign(p, make());
        ctx.save();
        ctx.globalAlpha = p.opacity as number;
        ctx.translate(p.x as number, p.y as number);
        ctx.rotate(p.rotation as number);
        ctx.scale(1, 0.6);
        ctx.beginPath();
        ctx.arc(0, 0, p.size as number, 0, Math.PI * 2);
        ctx.fillStyle = p.color as string;
        ctx.fill();
        ctx.restore();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    if (reduced) draw();
    else raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
