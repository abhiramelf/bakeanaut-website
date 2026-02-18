'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'

interface StickyCartBarProps {
  onOpenCart: () => void
}

export default function StickyCartBar({ onOpenCart }: StickyCartBarProps) {
  const { totalItems } = useCart()
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.2,
            ease: [0.25, 0, 0.25, 1],
          }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-light-purple bg-dark-bg p-4 md:hidden"
        >
          <button
            onClick={onOpenCart}
            className="flex w-full items-center justify-center gap-3 bg-cosmic-orange py-3 font-display text-sm font-700 uppercase tracking-widest text-dark-bg"
            aria-label={`View payload - ${totalItems} items in cart`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            View Payload ({totalItems})
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
