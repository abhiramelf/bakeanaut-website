import type { CartItem } from '@/types'

const DEFAULT_PHONE = '919916699631'

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

export function buildWhatsAppUrl(items: CartItem[], phone?: string): string {
  const message = formatCartMessage(items)
  return `https://wa.me/${phone || DEFAULT_PHONE}?text=${encodeURIComponent(message)}`
}

export function buildDirectOrderUrl(phone?: string): string {
  const message = '🚀 Hey Bakeanaut! I\'d like to place an order.'
  return `https://wa.me/${phone || DEFAULT_PHONE}?text=${encodeURIComponent(message)}`
}

export function buildSmartOrderUrl(items: CartItem[], phone?: string): string {
  if (items.length > 0) {
    return buildWhatsAppUrl(items, phone)
  }
  return buildDirectOrderUrl(phone)
}

export function buildRankEnquiryUrl(phone?: string): string {
  const message = `🛰️ Hey Bakeanaut! I'd like to check my crew rank and mission history.

My details:
Name:
Phone:
Order number (if available):

Requesting rank status update. 🚀`
  return `https://wa.me/${phone || DEFAULT_PHONE}?text=${encodeURIComponent(message)}`
}
