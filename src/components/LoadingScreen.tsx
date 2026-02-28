'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

export default function LoadingScreen() {
  const shouldReduceMotion = useReducedMotion()
  const [dismissed, setDismissed] = useState(false)

  const dismiss = useCallback(() => setDismissed(true), [])

  useEffect(() => {
    if (shouldReduceMotion || dismissed) return

    document.body.style.overflow = 'hidden'

    const timer = setTimeout(dismiss, 500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [shouldReduceMotion, dismiss, dismissed])

  useEffect(() => {
    if (dismissed) {
      document.body.style.overflow = ''
    }
  }, [dismissed])

  if (shouldReduceMotion || dismissed) return null

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-dark-bg"
          aria-live="polite"
          aria-label="Loading"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/logo.png"
              alt="Bakeanaut"
              width={220}
              height={110}
              sizes="220px"
              priority
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="h-auto w-40 drop-shadow-[0_0_40px_rgba(255,138,61,0.25)] sm:w-52"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="mt-6 font-mono text-[10px] tracking-[0.3em] text-cookie-tan/60 sm:text-[11px]"
          >
            EDIBLE MISSIONS. CLEARED FOR LAUNCH.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
