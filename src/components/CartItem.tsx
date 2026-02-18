'use client'

import type { CartItem as CartItemType } from '@/types'
import { useCart } from '@/hooks/useCart'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-start justify-between gap-3 border-b border-light-purple py-3">
      <div className="flex-1">
        <p className="font-display text-sm font-700 uppercase tracking-tight text-mission-white">
          {item.menuItem.name}
        </p>
        <p className="font-mono text-[10px] tracking-wider text-muted-purple">
          {item.sectorCode}: {item.sectorName}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0">
          <button
            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
            className="flex h-7 w-7 items-center justify-center border border-light-purple font-mono text-xs text-mission-white transition-colors hover:border-cosmic-orange hover:text-cosmic-orange active:scale-95"
            aria-label={`Decrease quantity of ${item.menuItem.name}`}
          >
            −
          </button>
          <span className="flex h-7 w-8 items-center justify-center border-y border-light-purple font-mono text-xs text-mission-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
            className="flex h-7 w-7 items-center justify-center border border-light-purple font-mono text-xs text-mission-white transition-colors hover:border-cosmic-orange hover:text-cosmic-orange active:scale-95"
            aria-label={`Increase quantity of ${item.menuItem.name}`}
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeItem(item.menuItem.id)}
          className="flex h-7 w-7 items-center justify-center text-muted-purple transition-colors hover:text-cosmic-orange"
          aria-label={`Remove ${item.menuItem.name} from cart`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 2l10 10M12 2L2 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
