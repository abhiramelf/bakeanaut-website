import { readJson } from '@/lib/storage'
import type { SiteContent, MenuData } from '@/types/content'
import defaultContent from '@/data/default-content.json'
import defaultMenu from '@/data/menu.json'

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const content = await readJson<SiteContent>('content.json')
    return content ?? (defaultContent as SiteContent)
  } catch {
    return defaultContent as SiteContent
  }
}

export async function getMenuData(): Promise<MenuData> {
  try {
    const menu = await readJson<MenuData>('menu.json')
    return menu ?? (defaultMenu as unknown as MenuData)
  } catch {
    return defaultMenu as unknown as MenuData
  }
}
