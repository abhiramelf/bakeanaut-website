'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEasterEggs } from '@/hooks/useEasterEggs'

function KonamiEffect() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={{ scale: 3, opacity: 0, rotate: -20 }}
      animate={{ scale: 1, opacity: 0.9, rotate: -12 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' }}
      className="fixed left-1/2 top-1/2 z-[9998] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <div className="border-4 border-dashed border-warning-yellow px-8 py-4 text-center">
        <p className="font-mono text-lg font-bold tracking-[0.2em] text-warning-yellow sm:text-2xl">
          SECRET SECTOR
        </p>
        <p className="font-mono text-sm font-bold tracking-[0.2em] text-warning-yellow sm:text-lg">
          UNLOCKED
        </p>
      </div>
    </motion.div>
  )
}

function LaunchEffect() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <>
      {/* Rocket */}
      <motion.div
        initial={{ y: '100vh', x: '-50%' }}
        animate={{ y: '-120vh' }}
        exit={{ opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 2, ease: 'easeIn' }}
        className="fixed bottom-0 left-1/2 z-[9998] pointer-events-none"
      >
        <svg width="32" height="48" viewBox="0 0 32 48" fill="none" className="drop-shadow-[0_0_8px_rgba(255,138,61,0.6)]">
          <path d="M16 0C16 0 8 12 8 28v8l4 4h8l4-4v-8C24 12 16 0 16 0z" fill="var(--cosmic-orange)" />
          <path d="M12 40l-4 8h4v-8zM20 40l4 8h-4v-8z" fill="var(--warning-yellow)" />
          <circle cx="16" cy="22" r="3" fill="var(--dark-bg)" />
        </svg>
      </motion.div>
      {/* Exhaust dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: '100vh', x: '-50%', opacity: 0.8 }}
          animate={{ y: '-100vh', opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 2.5,
            ease: 'easeIn',
            delay: i * 0.15,
          }}
          className="fixed bottom-0 left-1/2 z-[9997] pointer-events-none"
          style={{ marginLeft: `${(i - 1) * 8}px` }}
        >
          <div
            className="bg-cosmic-orange"
            style={{
              width: 6 - i,
              height: 6 - i,
              borderRadius: '50%',
              opacity: 0.6 - i * 0.15,
            }}
          />
        </motion.div>
      ))}
    </>
  )
}

export default function EasterEggOverlay() {
  const activeEgg = useEasterEggs()

  return (
    <AnimatePresence>
      {activeEgg === 'konami' && <KonamiEffect key="konami" />}
      {activeEgg === 'launch' && <LaunchEffect key="launch" />}
    </AnimatePresence>
  )
}
