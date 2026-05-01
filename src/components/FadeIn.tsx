import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  duration?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  className,
  y = 18,
  duration = 0.6,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px' }}
      transition={{
        duration,
        ease: [0.22, 0.61, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
