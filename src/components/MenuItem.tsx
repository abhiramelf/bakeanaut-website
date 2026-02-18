'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { MenuItem as MenuItemType } from '@/types'
import { useCart } from '@/hooks/useCart'

interface MenuItemProps {
  item: MenuItemType
  sectorName: string
  sectorCode: string
}

export default function MenuItem({ item, sectorName, sectorCode }: MenuItemProps) {
  const { addItem, items, updateQuantity } = useCart()
  const shouldReduceMotion = useReducedMotion()
  const [justAdded, setJustAdded] = useState(false)

  const cartItem = items.find((ci) => ci.menuItem.id === item.id)
  const quantity = cartItem?.quantity ?? 0

  const isBestSelling = item.badges.includes('best-selling')
  const isTopMission = item.badges.includes('top-mission')
  const isLimited = item.badges.includes('limited')
  const hasHighlight = isBestSelling || isTopMission

  const handleAdd = () => {
    addItem(item, sectorName, sectorCode)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 300)
  }

  return (
    <motion.div
      className={`sector-item-hover group relative border border-light-purple/20 bg-deep-space/30 px-5 py-4 transition-all duration-200 sm:px-6 ${
        hasHighlight
          ? 'border-l-[3px] border-l-cosmic-orange bg-light-purple/10'
          : ''
      }`}
      whileHover={shouldReduceMotion ? {} : { x: 3 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-display text-base font-700 uppercase tracking-tight text-mission-white sm:text-lg">
              {item.name}
            </h4>
            {isTopMission && (
              <span className="flex items-center gap-1 bg-cosmic-orange px-2.5 py-0.5 font-mono text-[10px] font-700 tracking-wider text-dark-bg">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M5 0l1.5 3.5L10 4l-2.5 2.5L8 10 5 8l-3 2 .5-3.5L0 4l3.5-.5z" />
                </svg>
                TOP MISSION
              </span>
            )}
            {isBestSelling && (
              <span className="border border-cosmic-orange/70 bg-cosmic-orange/10 px-2.5 py-0.5 font-mono text-[10px] font-700 tracking-wider text-cosmic-orange">
                BEST SELLING
              </span>
            )}
            {isLimited && (
              <span className="border border-warning-yellow/70 bg-warning-yellow/10 px-2.5 py-0.5 font-mono text-[10px] font-700 tracking-wider text-warning-yellow">
                LIMITED CLEARANCE
              </span>
            )}
          </div>
          <p className="mt-1.5 font-body text-sm text-muted-purple">
            {item.description}
          </p>
          <p className="mt-1 font-mono text-xs text-cookie-tan/70">
            {item.price !== null ? `₹${item.price}` : 'Ask crew for pricing'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {quantity > 0 ? (
            <div className="flex items-center">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="flex h-9 w-9 items-center justify-center border border-light-purple/50 font-mono text-sm text-mission-white transition-all hover:border-cosmic-orange hover:bg-cosmic-orange/10 hover:text-cosmic-orange active:scale-95"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                −
              </button>
              <span className="flex h-9 w-11 items-center justify-center border-y border-light-purple/50 bg-light-purple/10 font-mono text-sm font-700 text-mission-white">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="flex h-9 w-9 items-center justify-center border border-light-purple/50 font-mono text-sm text-mission-white transition-all hover:border-cosmic-orange hover:bg-cosmic-orange/10 hover:text-cosmic-orange active:scale-95"
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <motion.button
              onClick={handleAdd}
              animate={justAdded ? { scale: [1, 0.95, 1] } : {}}
              transition={{ duration: 0.2 }}
              className="bg-cosmic-orange/10 border border-cosmic-orange/50 px-5 py-2 font-mono text-xs font-700 uppercase tracking-wider text-cosmic-orange transition-all hover:bg-cosmic-orange hover:text-dark-bg hover:shadow-[0_0_15px_rgba(255,138,61,0.3)]"
            >
              + Add
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
