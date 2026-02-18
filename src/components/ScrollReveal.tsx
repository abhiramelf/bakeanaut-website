'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left'
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = 'up',
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const initial =
    direction === 'left'
      ? { opacity: 0, x: -30 }
      : { opacity: 0, y: 30 }

  const animate =
    direction === 'left'
      ? { opacity: 1, x: 0 }
      : { opacity: 1, y: 0 }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
