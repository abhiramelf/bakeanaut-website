'use client'

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useMissionLog } from '@/hooks/useMissionLog'
import { useCart } from '@/hooks/useCart'
import { sectors } from '@/data/menu'

const DISMISS_KEY = 'bakeanaut-reorder-dismissed'

function getIsDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === 'true'
  } catch {
    return false
  }
}

const dismissListeners = new Set<() => void>()
function subscribeDismiss(callback: () => void) {
  dismissListeners.add(callback)
  return () => { dismissListeners.delete(callback) }
}

export default function QuickReorderBar() {
  const { lastOrder } = useMissionLog()
  const { totalItems, addItem } = useCart()
  const shouldReduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  const dismissed = useSyncExternalStore(
    subscribeDismiss,
    getIsDismissed,
    () => true // server snapshot — dismissed by default
  )

  const handleDismiss = useCallback(() => {
    setVisible(false)
    try {
      sessionStorage.setItem(DISMISS_KEY, 'true')
    } catch {
      // Ignore
    }
    dismissListeners.forEach((cb) => cb())
  }, [])

  // Show after 2s delay
  useEffect(() => {
    if (dismissed || !lastOrder || totalItems > 0) return

    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [dismissed, lastOrder, totalItems])

  // Auto-dismiss after 15s
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => handleDismiss(), 15000)
    return () => clearTimeout(timer)
  }, [visible, handleDismiss])

  // Derive: hide when cart gets items
  const show = visible && !dismissed && !!lastOrder && totalItems === 0

  const handleRelaunch = () => {
    if (!lastOrder) return

    const menuItemMap = new Map<string, { item: typeof sectors[0]['items'][0]; sectorName: string; sectorCode: string }>()
    for (const sector of sectors) {
      for (const item of sector.items) {
        menuItemMap.set(item.id, { item, sectorName: sector.name, sectorCode: sector.code })
      }
    }

    for (const orderItem of lastOrder.items) {
      const found = menuItemMap.get(orderItem.menuItemId)
      if (found) {
        for (let i = 0; i < orderItem.quantity; i++) {
          addItem(found.item, found.sectorName, found.sectorCode)
        }
      }
    }

    handleDismiss()
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.25,
            ease: [0.25, 0, 0.25, 1],
          }}
          className="fixed inset-x-0 top-[88px] z-25 border-b border-light-purple/30 bg-dark-bg/95 backdrop-blur-xl sm:top-[96px] lg:top-[104px]"
        >
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-3 lg:px-8">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-1.5 w-1.5 shrink-0 bg-cosmic-orange" />
              <p className="truncate font-mono text-xs text-muted-purple">
                Welcome back. Re-launch last payload?
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleRelaunch}
                className="border border-cosmic-orange/50 bg-cosmic-orange/10 px-4 py-1.5 font-mono text-[10px] font-bold tracking-wider text-cosmic-orange transition-all hover:bg-cosmic-orange hover:text-dark-bg"
              >
                RE-LAUNCH
              </button>
              <button
                onClick={handleDismiss}
                className="flex h-6 w-6 items-center justify-center text-muted-purple/60 transition-colors hover:text-mission-white"
                aria-label="Dismiss"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
