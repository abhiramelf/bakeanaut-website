'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { MenuItem as MenuItemType } from '@/types'

interface ClassifiedMenuItemProps {
  item: MenuItemType
}

export default function ClassifiedMenuItem({ item }: ClassifiedMenuItemProps) {
  const [revealed, setRevealed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const formattedDate = item.classifiedRevealDate
    ? new Date(item.classifiedRevealDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <motion.div
      className="group relative flex h-full flex-col border border-light-purple/20 bg-deep-space/30 transition-all duration-200 hover:border-warning-yellow/30 cursor-pointer overflow-hidden"
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onClick={() => setRevealed(!revealed)}
      role="button"
      aria-expanded={revealed}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setRevealed(!revealed)
        }
      }}
    >
      {/* Scan-line overlay */}
      <div className="classified-scanlines pointer-events-none absolute inset-0 z-10" />

      {/* CLASSIFIED stamp watermark */}
      <div className="stamp pointer-events-none absolute right-3 top-3 z-20 !border-warning-yellow !text-warning-yellow rotate-[-8deg] !opacity-30 !text-[10px]">
        CLASSIFIED
      </div>

      {/* Image placeholder area */}
      <div className="relative aspect-[4/3] bg-light-purple/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-purple/20">
            <rect x="3" y="3" width="18" height="18" rx="0" />
            <path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4">
        {/* Redacted name */}
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-tight text-mission-white sm:text-base">
            [REDACTED]
          </h4>
          <span className="border border-warning-yellow/70 bg-warning-yellow/10 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-warning-yellow">
            CLASSIFIED
          </span>
        </div>

        {/* Blurred placeholder lines */}
        <div className="mt-2 select-none space-y-1.5" style={{ filter: 'blur(4px)' }} aria-hidden="true">
          <div className="h-3 w-full bg-muted-purple/20" />
          <div className="h-3 w-3/4 bg-muted-purple/15" />
        </div>

        {/* Reveal panel */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="mt-3 border-t border-warning-yellow/20 pt-3">
                <p className="font-mono text-[11px] font-bold tracking-wider text-warning-yellow">
                  CLEARANCE PENDING
                </p>
                {item.classifiedTeaser && (
                  <p className="mt-2 font-body text-xs text-muted-purple italic">
                    {item.classifiedTeaser}
                  </p>
                )}
                <p className="mt-2 font-mono text-[10px] text-muted-purple/60">
                  {formattedDate ? `CHECK BACK ${formattedDate.toUpperCase()}` : 'REVEAL DATE TBD'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No add-to-cart controls — spacer to match MenuItem height */}
        <div className="mt-auto pt-3">
          <p className="font-mono text-[10px] text-muted-purple/30 tracking-wider">
            TAP TO REVEAL INTEL
          </p>
        </div>
      </div>
    </motion.div>
  )
}
