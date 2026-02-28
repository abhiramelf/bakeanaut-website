'use client'

import { useMissionLog, type MissionOrder } from '@/hooks/useMissionLog'
import { useCart } from '@/hooks/useCart'
import { sectors } from '@/data/menu'

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

function OrderCard({ order, index, onRelaunch }: { order: MissionOrder; index: number; onRelaunch: (order: MissionOrder) => void }) {
  const orderNumber = String(index + 1).padStart(3, '0')

  return (
    <div className="border border-light-purple/20 bg-deep-space/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 bg-cosmic-orange" />
          <span className="font-mono text-xs font-bold tracking-wider text-mission-white">
            MISSION #{orderNumber}
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-purple/80">
          {formatRelativeTime(order.timestamp)}
        </span>
      </div>

      <div className="mt-3 space-y-1">
        {order.items.map((item) => (
          <div key={item.menuItemId} className="flex items-center gap-2 font-mono text-xs text-muted-purple">
            <span className="text-cookie-tan/70">{item.quantity}x</span>
            <span className="text-mission-white/80">{item.menuItemName}</span>
            <span className="text-muted-purple/40">({item.sectorCode})</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-light-purple/15 pt-3">
        <span className="font-mono text-[10px] text-muted-purple/40">
          {order.totalItems} {order.totalItems === 1 ? 'ITEM' : 'ITEMS'}
        </span>
        <button
          onClick={() => onRelaunch(order)}
          className="border border-cosmic-orange/50 bg-cosmic-orange/10 px-4 py-1.5 font-mono text-[10px] font-bold tracking-wider text-cosmic-orange transition-all hover:bg-cosmic-orange hover:text-dark-bg"
        >
          RE-LAUNCH
        </button>
      </div>
    </div>
  )
}

export default function MissionLog() {
  const { orders } = useMissionLog()
  const { addItem } = useCart()

  const handleRelaunch = (order: MissionOrder) => {
    // Build a lookup of all current menu items
    const menuItemMap = new Map<string, { item: typeof sectors[0]['items'][0]; sectorName: string; sectorCode: string }>()
    for (const sector of sectors) {
      for (const item of sector.items) {
        menuItemMap.set(item.id, { item, sectorName: sector.name, sectorCode: sector.code })
      }
    }

    for (const orderItem of order.items) {
      const found = menuItemMap.get(orderItem.menuItemId)
      if (found) {
        for (let i = 0; i < orderItem.quantity; i++) {
          addItem(found.item, found.sectorName, found.sectorCode)
        }
      }
    }
  }

  if (orders.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-4 h-px w-12 bg-light-purple/30" />
        <p className="font-mono text-sm text-muted-purple">
          No missions logged yet.
        </p>
        <p className="mt-1 font-mono text-xs text-muted-purple/80">
          Complete an order to begin your log.
        </p>
        <div className="mt-4 h-px w-12 bg-light-purple/30" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {orders.map((order, i) => (
        <OrderCard
          key={order.id}
          order={order}
          index={orders.length - 1 - i}
          onRelaunch={handleRelaunch}
        />
      ))}
    </div>
  )
}
