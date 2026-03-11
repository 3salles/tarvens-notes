'use client';

import { motion } from 'motion/react';

const sparks = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  left: Math.random() * 260 - 130,
  top: Math.random() * 120 - 40,
  delay: Math.random() * 2,
}));

export function TomeSparks() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute h-0.5 w-0.5 rounded-full bg-ember"
          initial={{
            opacity: 0,
            x: s.left,
            y: s.top,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: s.top - 60,
          }}
          transition={{
            duration: 2.4,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
