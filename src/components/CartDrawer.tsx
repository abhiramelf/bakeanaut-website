'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { useMissionLog } from '@/hooks/useMissionLog'
import { useSound } from '@/hooks/useSound'
import { trackEvent } from '@/lib/analytics'
import CartItemRow from './CartItem'
import MissionLog from './MissionLog'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function useIsMobile() {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia('(max-width: 767px)')
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    },
    () => window.matchMedia('(max-width: 767px)').matches,
    () => false,
  )
}

type DrawerTab = 'payload' | 'log'

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, clearCart, generateWhatsAppUrl } = useCart()
  const { logOrder } = useMissionLog()
  const { play } = useSound()
  const shouldReduceMotion = useReducedMotion()
  const drawerRef = useRef<HTMLDivElement>(null)
  const [confirmClear, setConfirmClear] = useState(false)
  const [activeTab, setActiveTab] = useState<DrawerTab>('payload')
  const isMobile = useIsMobile()

  // Wrap onClose to also reset tab (event handler, not effect)
  const handleClose = useCallback(() => {
    setActiveTab('payload')
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    play('slide')

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    drawerRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleClose, play])

  const handleClear = () => {
    if (confirmClear) {
      clearCart()
      setConfirmClear(false)
    } else {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 3000)
    }
  }

  const duration = shouldReduceMotion ? 0 : 0.25
  const ease: [number, number, number, number] = [0.25, 0, 0.25, 1]

  // Mobile: slide from bottom. Desktop: slide from right.
  const mobileVariants = {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  }

  const desktopVariants = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  }

  const variants = isMobile ? mobileVariants : desktopVariants

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            className="fixed inset-0 z-40 bg-dark-bg/85 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mission Payload - Cart"
            tabIndex={-1}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration, ease }}
            className={
              isMobile
                ? 'fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col border-t border-light-purple/30 bg-deep-space shadow-[0_-10px_40px_rgba(0,0,0,0.5)]'
                : 'fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-light-purple/30 bg-deep-space shadow-[-10px_0_40px_rgba(0,0,0,0.5)]'
            }
          >
            {/* Drag handle for mobile */}
            {isMobile && (
              <div className="flex justify-center pb-1 pt-3">
                <div className="h-1 w-10 bg-muted-purple/40" />
              </div>
            )}

            {/* Header */}
            <div className="border-b border-light-purple/30 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-cosmic-orange" />
                  <h2 className="font-display text-lg font-bold uppercase tracking-tight text-mission-white">
                    {activeTab === 'payload' ? 'Mission Payload' : 'Mission Log'}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="flex h-9 w-9 items-center justify-center border border-light-purple/30 text-muted-purple transition-all hover:border-cosmic-orange/50 hover:text-mission-white"
                  aria-label="Close cart"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 2l12 12M14 2L2 14" />
                  </svg>
                </button>
              </div>
              {/* Tab toggle */}
              <div className="mt-3 flex gap-0">
                <button
                  onClick={() => setActiveTab('payload')}
                  className={`flex-1 border-b-2 py-2 font-mono text-[10px] tracking-[0.2em] transition-colors ${
                    activeTab === 'payload'
                      ? 'border-cosmic-orange text-cosmic-orange'
                      : 'border-transparent text-muted-purple hover:text-mission-white'
                  }`}
                >
                  PAYLOAD{totalItems > 0 ? ` (${totalItems})` : ''}
                </button>
                <button
                  onClick={() => setActiveTab('log')}
                  className={`flex-1 border-b-2 py-2 font-mono text-[10px] tracking-[0.2em] transition-colors ${
                    activeTab === 'log'
                      ? 'border-cosmic-orange text-cosmic-orange'
                      : 'border-transparent text-muted-purple hover:text-mission-white'
                  }`}
                >
                  MISSION LOG
                </button>
              </div>
            </div>

            {/* Items / Mission Log */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {activeTab === 'log' ? (
                <MissionLog />
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 h-px w-12 bg-light-purple/30" />
                  <p className="font-mono text-sm text-muted-purple">
                    Payload bay is empty.
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-purple/80">
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

            {/* Footer — only on payload tab */}
            {activeTab === 'payload' && items.length > 0 && (
              <div className="border-t border-light-purple/30 px-6 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0.5rem))]">
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
                  onClick={() => {
                    logOrder(items)
                    play('launch')
                    trackEvent('launch_order', 'conversion', `${totalItems} items`)
                  }}
                  className="block w-full bg-cosmic-orange py-4 text-center font-display text-sm font-bold uppercase tracking-[0.2em] text-dark-bg transition-all hover:shadow-[0_0_30px_rgba(255,138,61,0.4)] hover:brightness-110"
                >
                  Launch Order on WhatsApp
                </a>

                <button
                  onClick={handleClear}
                  className="mt-3 w-full py-2 font-mono text-[11px] tracking-wider text-muted-purple/80 transition-colors hover:text-cosmic-orange"
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
