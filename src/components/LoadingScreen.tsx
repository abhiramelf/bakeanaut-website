'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const systemChecks = [
  'INITIALIZING NAVIGATION SYSTEMS',
  'LOADING SECTOR DATA',
  'CALIBRATING PAYLOAD SENSORS',
  'SYNCING MISSION CONTROL',
  'ESTABLISHING COMMS LINK',
  'ALL SYSTEMS NOMINAL',
]

const TOTAL_DURATION = 3400
const CHECK_INTERVAL = 480

export default function LoadingScreen() {
  const shouldReduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [currentCheck, setCurrentCheck] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  const dismiss = useCallback(() => setDismissed(true), [])

  useEffect(() => {
    if (shouldReduceMotion) {
      setDismissed(true)
      return
    }

    document.body.style.overflow = 'hidden'

    // Delay progress + checks until the bar is visible (matches animation delay)
    const BAR_VISIBLE_DELAY = 750

    let progressInterval: ReturnType<typeof setInterval>
    let checkInterval: ReturnType<typeof setInterval>

    const startTimer = setTimeout(() => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100
          const remaining = 100 - prev
          const step = Math.max(remaining * 0.08, 0.5)
          return Math.min(prev + step, 100)
        })
      }, 30)

      checkInterval = setInterval(() => {
        setCurrentCheck((prev) => {
          if (prev >= systemChecks.length - 1) return prev
          return prev + 1
        })
      }, CHECK_INTERVAL)
    }, BAR_VISIBLE_DELAY)

    const dismissTimer = setTimeout(dismiss, TOTAL_DURATION)

    return () => {
      clearTimeout(startTimer)
      clearInterval(progressInterval)
      clearInterval(checkInterval)
      clearTimeout(dismissTimer)
      document.body.style.overflow = ''
    }
  }, [shouldReduceMotion, dismiss])

  useEffect(() => {
    if (dismissed) {
      document.body.style.overflow = ''
    }
  }, [dismissed])

  if (shouldReduceMotion) return null

  const isComplete = currentCheck === systemChecks.length - 1

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-dark-bg"
          aria-live="polite"
          aria-label="Loading"
        >
          {/* Central glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
            style={{
              width: '50vw',
              height: '50vw',
              background:
                'radial-gradient(circle, rgba(255, 138, 61, 0.08) 0%, rgba(61, 21, 96, 0.06) 40%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />

          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(var(--muted-purple) 1px, transparent 1px), linear-gradient(90deg, var(--muted-purple) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-cosmic-orange/30 to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            aria-hidden="true"
          />

          {/* Corner coordinates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute left-6 top-6 font-mono text-[10px] tracking-[0.2em] text-muted-purple/40 sm:left-8 sm:top-8"
            aria-hidden="true"
          >
            08.4882°N
            <br />
            76.9531°E
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute right-6 top-6 font-mono text-[10px] tracking-[0.2em] text-muted-purple/40 sm:right-8 sm:top-8"
            aria-hidden="true"
          >
            SYS v1.0
            <br />
            <span className="text-cosmic-orange/40">BOOT</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.2em] text-muted-purple/40 sm:bottom-8 sm:left-8"
            aria-hidden="true"
          >
            TVM // KL // IN
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.2em] text-muted-purple/40 sm:bottom-8 sm:right-8"
            aria-hidden="true"
          >
            SECTOR 0
          </motion.div>

          {/* Crosshair lines */}
          <div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-muted-purple/[0.07]"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-muted-purple/[0.07]"
            aria-hidden="true"
          />

          {/* Center content */}
          <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-8">
            {/* Orbital ring */}
            <div className="relative">
              <motion.div
                className="absolute -inset-8 border border-dashed border-muted-purple/15 sm:-inset-10"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{
                  opacity: { delay: 0.3, duration: 0.8 },
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                }}
                style={{ borderRadius: '50%' }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute -inset-14 border border-muted-purple/[0.07] sm:-inset-16"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: -360 }}
                transition={{
                  opacity: { delay: 0.5, duration: 0.8 },
                  rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                }}
                style={{ borderRadius: '50%' }}
                aria-hidden="true"
              />

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <Image
                  src="/images/logo.png"
                  alt="Bakeanaut"
                  width={220}
                  height={110}
                  priority
                  className="h-auto w-40 drop-shadow-[0_0_40px_rgba(255,138,61,0.25)] sm:w-52"
                />
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 font-mono text-[10px] tracking-[0.3em] text-cookie-tan/60 sm:text-[11px]"
            >
              EDIBLE MISSIONS. CLEARED FOR LAUNCH.
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10 w-full max-w-xs sm:max-w-sm"
            >
              {/* Bar */}
              <div className="relative h-[3px] w-full bg-muted-purple/15 overflow-hidden">
                <motion.div
                  className="h-full bg-cosmic-orange"
                  style={{
                    width: `${progress}%`,
                    boxShadow: '0 0 12px rgba(255, 138, 61, 0.5), 0 0 30px rgba(255, 138, 61, 0.2)',
                  }}
                />
              </div>

              {/* System check + percentage */}
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <span className="min-w-0 truncate font-mono text-[10px] tracking-[0.12em] text-muted-purple/60">
                  {systemChecks[currentCheck]}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="ml-0.5"
                  >
                    _
                  </motion.span>
                </span>
                <span
                  className={`shrink-0 font-mono text-xs font-bold tracking-[0.1em] ${
                    isComplete ? 'text-cosmic-orange' : 'text-cosmic-orange/70'
                  }`}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>

            {/* Status stamp — appears mid-load, upgrades to GRANTED */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: isComplete ? 0.3 : 0.15,
                scale: 1,
              }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className={`mt-10 border-2 border-dashed px-6 py-2 font-mono text-[11px] tracking-[0.2em] sm:text-xs ${
                isComplete
                  ? 'border-cosmic-orange text-cosmic-orange'
                  : 'border-muted-purple text-muted-purple'
              }`}
              style={{ transform: 'rotate(-3deg)' }}
              aria-hidden="true"
            >
              {isComplete ? 'CLEARANCE GRANTED' : 'CLEARANCE PENDING'}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
