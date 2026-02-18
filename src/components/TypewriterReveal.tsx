'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface TypewriterRevealProps {
  text: string
  className?: string
  as?: 'p' | 'span' | 'h2' | 'h3'
  staggerRate?: number
}

export default function TypewriterReveal({
  text,
  className = '',
  as: Tag = 'span',
  staggerRate = 0.03,
}: TypewriterRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  const chars = text.split('')

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            delay: i * staggerRate,
            duration: 0.1,
            ease: 'easeOut',
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  )
}
