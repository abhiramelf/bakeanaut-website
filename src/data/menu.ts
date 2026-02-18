import type { Sector, Bundle, FeaturedItem } from '@/types'
import menuData from './menu.json'

// ─── Data (edit menu.json, not this file) ───────────────────────────
export const sectors: Sector[] = menuData.sectors as Sector[]
export const specialPayloads: Sector = menuData.specialPayloads as Sector
export const bundles: Bundle[] = menuData.bundles as Bundle[]
export const featuredItemIds: string[] = menuData.featuredItemIds

// ─── Derived helpers ────────────────────────────────────────────────
export function getFeaturedItems(): FeaturedItem[] {
  const featured: FeaturedItem[] = []
  for (const id of featuredItemIds) {
    for (const sector of sectors) {
      const item = sector.items.find((i) => i.id === id)
      if (item) {
        featured.push({
          item,
          sectorName: sector.name,
          sectorCode: sector.code,
        })
        break
      }
    }
  }
  return featured
}
