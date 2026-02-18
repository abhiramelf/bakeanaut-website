export type BadgeType = 'best-selling' | 'top-mission' | 'limited'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number | null
  badges: BadgeType[]
  images?: string[]
}

export interface FeaturedItem {
  item: MenuItem
  sectorName: string
  sectorCode: string
}

export interface Sector {
  id: string
  code: string
  name: string
  subtitle: string
  flavorText: string
  items: MenuItem[]
}

export interface Bundle {
  id: string
  name: string
  description: string
}

export interface CartItem {
  menuItem: MenuItem
  sectorName: string
  sectorCode: string
  quantity: number
}
