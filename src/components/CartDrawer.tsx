'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import CartItemRow from './CartItem'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, clearCart, generateWhatsAppUrl } = useCart()
  const shouldReduceMotion = useReducedMotion()
  const drawerRef = useRef<HTMLDivElement>(null)
  const [confirmClear, setConfirmClear] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    drawerRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleClear = () => {
    if (confirmClear) {
      clearCart()
      setConfirmClear(false)
    } else {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 3000)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-dark-bg/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mission Payload - Cart"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.25,
              ease: [0.25, 0, 0.25, 1],
            }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-light-purple/30 bg-deep-space shadow-[-10px_0_40px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-light-purple/30 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-cosmic-orange" />
                  <h2 className="font-display text-lg font-700 uppercase tracking-tight text-mission-white">
                    Mission Payload
                  </h2>
                </div>
                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-muted-purple">
                  {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'} LOADED
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center border border-light-purple/30 text-muted-purple transition-all hover:border-cosmic-orange/50 hover:text-mission-white"
                aria-label="Close cart"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 h-px w-12 bg-light-purple/30" />
                  <p className="font-mono text-sm text-muted-purple">
                    Payload bay is empty.
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-purple/60">
                    Add missions to begin.
                  </p>
                  <div className="mt-4 h-px w-12 bg-light-purple/30" />
                </div>
              ) : (
                <div>{items.map((item) => (
                  <CartItemRow key={item.menuItem.id} item={item} />
                ))}</div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-light-purple/30 px-6 py-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-muted-purple">
                    SUBTOTAL
                  </span>
                  <span className="font-mono text-sm text-cookie-tan">
                    Prices TBD
                  </span>
                </div>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-cosmic-orange py-4 text-center font-display text-sm font-700 uppercase tracking-[0.2em] text-dark-bg transition-all hover:shadow-[0_0_30px_rgba(255,138,61,0.4)] hover:brightness-110"
                >
                  Launch Order on WhatsApp
                </a>

                <button
                  onClick={handleClear}
                  className="mt-3 w-full py-2 font-mono text-[11px] tracking-wider text-muted-purple/60 transition-colors hover:text-cosmic-orange"
                >
                  {confirmClear ? '[ CONFIRM CLEAR PAYLOAD? ]' : '[ CLEAR PAYLOAD ]'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
