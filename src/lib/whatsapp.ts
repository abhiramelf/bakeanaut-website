import type { CartItem } from '@/types'

const PHONE = '919916699631'

export function formatCartMessage(items: CartItem[]): string {
  const itemLines = items
    .map(
      (item) =>
        `${item.quantity}x ${item.menuItem.name} (${item.sectorCode}: ${item.sectorName})`
    )
    .join('\n')

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return `🚀 BAKEANAUT — NEW MISSION ORDER

Mission Payload:
${itemLines}

Total Items: ${totalItems}

Awaiting launch clearance. 🛰️`
}

export function buildWhatsAppUrl(items: CartItem[]): string {
  const message = formatCartMessage(items)
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}

export function buildDirectOrderUrl(): string {
  const message = '🚀 Hey Bakeanaut! I\'d like to place an order.'
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}

export function buildSmartOrderUrl(items: CartItem[]): string {
  if (items.length > 0) {
    return buildWhatsAppUrl(items)
  }
  return buildDirectOrderUrl()
}
