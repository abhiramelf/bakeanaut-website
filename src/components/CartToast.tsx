'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'

const TOAST_DURATION = 2500

export default function CartToast() {
  const { addCount, lastAddedName } = useCart()
  const shouldReduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const mountedAddCount = useRef(addCount)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip on mount — only trigger on subsequent addCount changes
    if (isFirstRender.current) {
      isFirstRender.current = false
      mountedAddCount.current = addCount
      return
    }

    if (addCount > mountedAddCount.current && lastAddedName) {
      mountedAddCount.current = addCount

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setDisplayName(lastAddedName) // eslint-disable-line react-hooks/set-state-in-effect -- responding to addCount prop change
      setVisible(true)
      timeoutRef.current = setTimeout(() => setVisible(false), TOAST_DURATION)
    }
  }, [addCount, lastAddedName])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="fixed left-1/2 top-20 z-[60] -translate-x-1/2 md:left-auto md:right-6 md:top-24 md:translate-x-0" aria-live="polite">
      <AnimatePresence>
        {visible && displayName && (
          <motion.div
            key={addCount}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0, 0.25, 1] }}
            className="flex items-center gap-3 border border-cosmic-orange/30 bg-dark-bg px-5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          >
            <div className="h-2 w-2 bg-cosmic-orange" />
            <p className="font-mono text-xs tracking-[0.1em] text-mission-white">
              <span className="font-bold text-cosmic-orange">{displayName}</span>
              {' '}added to payload
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
