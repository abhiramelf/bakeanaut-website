'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

const shortcuts = [
  { key: 'C', description: 'Open cart' },
  { key: '/', description: 'Focus menu search' },
  { key: '?', description: 'Show this help' },
  { key: 'Esc', description: 'Close open panel' },
]

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const shouldReduceMotion = useReducedMotion()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    modalRef.current?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            className="fixed inset-0 z-50 bg-dark-bg/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 z-50 w-[340px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 border border-light-purple/30 bg-deep-space p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-cosmic-orange" />
                <h2 className="font-display text-sm font-bold uppercase tracking-tight text-mission-white">
                  Keyboard Shortcuts
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center text-muted-purple transition-colors hover:text-mission-white"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {shortcuts.map((s) => (
                <div key={s.key} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-purple">{s.description}</span>
                  <kbd className="border border-light-purple/30 bg-light-purple/10 px-2.5 py-1 font-mono text-[11px] font-bold text-cosmic-orange">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>

            <p className="mt-5 font-mono text-[10px] text-muted-purple/40 tracking-wider">
              PRESS ESC TO CLOSE
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
