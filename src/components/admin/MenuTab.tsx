'use client'

import { useEffect, useState, useCallback } from 'react'
import type { MenuData } from '@/types/content'
import type { Sector, MenuItem, Bundle, BadgeType } from '@/types'
import ImageUploader from '@/components/admin/ImageUploader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import Toast from '@/components/admin/Toast'

const allBadges: BadgeType[] = ['best-selling', 'top-mission', 'limited']

function generateId(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const emptyItem: MenuItem = { id: '', name: '', description: '', price: null, badges: [], images: [] }
const emptySector: Sector = { id: '', code: '', name: '', subtitle: '', flavorText: '', items: [] }

export default function MenuTab() {
  const [menu, setMenu] = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedSector, setExpandedSector] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<{ sectorIdx: number; itemIdx: number } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'sector' | 'item' | 'bundle'; sectorIdx?: number; itemIdx?: number; bundleIdx?: number } | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetch('/api/admin/menu')
      .then((r) => r.json())
      .then(setMenu)
      .finally(() => setLoading(false))
  }, [])

  const save = useCallback(async (data: MenuData) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to save')
      setToast({ message: 'Menu saved', type: 'success' })
    } catch {
      setToast({ message: 'Failed to save menu', type: 'error' })
    } finally {
      setSaving(false)
    }
  }, [])

  function updateSector(idx: number, updates: Partial<Sector>) {
    if (!menu) return
    const sectors = [...menu.sectors]
    sectors[idx] = { ...sectors[idx], ...updates }
    setMenu({ ...menu, sectors })
  }

  function updateItem(sectorIdx: number, itemIdx: number, updates: Partial<MenuItem>) {
    if (!menu) return
    const sectors = [...menu.sectors]
    const items = [...sectors[sectorIdx].items]
    items[itemIdx] = { ...items[itemIdx], ...updates }
    sectors[sectorIdx] = { ...sectors[sectorIdx], items }
    setMenu({ ...menu, sectors })
  }

  function addSector() {
    if (!menu) return
    const newSector = { ...emptySector, id: `sector-${menu.sectors.length + 1}`, code: `SECTOR ${menu.sectors.length + 1}` }
    setMenu({ ...menu, sectors: [...menu.sectors, newSector] })
  }

  function addItem(sectorIdx: number) {
    if (!menu) return
    const sectors = [...menu.sectors]
    sectors[sectorIdx] = {
      ...sectors[sectorIdx],
      items: [...sectors[sectorIdx].items, { ...emptyItem, id: `new-item-${Date.now()}` }],
    }
    setMenu({ ...menu, sectors })
    setEditingItem({ sectorIdx, itemIdx: sectors[sectorIdx].items.length - 1 })
  }

  function moveSector(idx: number, direction: -1 | 1) {
    if (!menu) return
    const target = idx + direction
    if (target < 0 || target >= menu.sectors.length) return
    const sectors = [...menu.sectors]
    ;[sectors[idx], sectors[target]] = [sectors[target], sectors[idx]]
    setMenu({ ...menu, sectors })
  }

  function moveItem(sectorIdx: number, itemIdx: number, direction: -1 | 1) {
    if (!menu) return
    const target = itemIdx + direction
    const items = [...menu.sectors[sectorIdx].items]
    if (target < 0 || target >= items.length) return
    ;[items[itemIdx], items[target]] = [items[target], items[itemIdx]]
    const sectors = [...menu.sectors]
    sectors[sectorIdx] = { ...sectors[sectorIdx], items }
    setMenu({ ...menu, sectors })
  }

  function handleDelete() {
    if (!menu || !deleteTarget) return
    if (deleteTarget.type === 'sector' && deleteTarget.sectorIdx !== undefined) {
      setMenu({ ...menu, sectors: menu.sectors.filter((_, i) => i !== deleteTarget.sectorIdx) })
    } else if (deleteTarget.type === 'item' && deleteTarget.sectorIdx !== undefined && deleteTarget.itemIdx !== undefined) {
      const sectors = [...menu.sectors]
      sectors[deleteTarget.sectorIdx] = {
        ...sectors[deleteTarget.sectorIdx],
        items: sectors[deleteTarget.sectorIdx].items.filter((_, i) => i !== deleteTarget.itemIdx),
      }
      setMenu({ ...menu, sectors })
    } else if (deleteTarget.type === 'bundle' && deleteTarget.bundleIdx !== undefined) {
      setMenu({ ...menu, bundles: menu.bundles.filter((_, i) => i !== deleteTarget.bundleIdx) })
    }
    setDeleteTarget(null)
  }

  function addBundle() {
    if (!menu) return
    setMenu({ ...menu, bundles: [...menu.bundles, { id: `bundle-${Date.now()}`, name: '', description: '' }] })
  }

  function updateBundle(idx: number, updates: Partial<Bundle>) {
    if (!menu) return
    const bundles = [...menu.bundles]
    bundles[idx] = { ...bundles[idx], ...updates }
    setMenu({ ...menu, bundles })
  }

  function updateSpecialPayloads(updates: Partial<Sector>) {
    if (!menu) return
    setMenu({ ...menu, specialPayloads: { ...menu.specialPayloads, ...updates } })
  }

  function updateSpecialItem(itemIdx: number, updates: Partial<MenuItem>) {
    if (!menu) return
    const items = [...menu.specialPayloads.items]
    items[itemIdx] = { ...items[itemIdx], ...updates }
    setMenu({ ...menu, specialPayloads: { ...menu.specialPayloads, items } })
  }

  function addSpecialItem() {
    if (!menu) return
    setMenu({
      ...menu,
      specialPayloads: {
        ...menu.specialPayloads,
        items: [...menu.specialPayloads.items, { ...emptyItem, id: `special-${Date.now()}` }],
      },
    })
  }

  function deleteSpecialItem(itemIdx: number) {
    if (!menu) return
    setMenu({
      ...menu,
      specialPayloads: {
        ...menu.specialPayloads,
        items: menu.specialPayloads.items.filter((_, i) => i !== itemIdx),
      },
    })
  }

  if (loading || !menu) {
    return <div className="py-12 text-center text-gray-400">Loading menu...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Menu Editor</h1>
          <p className="mt-1 text-sm text-gray-500">
            {menu.sectors.length} sectors, {menu.sectors.reduce((s, sec) => s + sec.items.length, 0)} items
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={addSector} className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">+ Add Sector</button>
          <button onClick={() => save(menu)} disabled={saving} className="bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Menu'}
          </button>
        </div>
      </div>

      <div className="mt-6 border border-gray-200 bg-white p-4">
        <label className="block text-sm font-semibold text-gray-900">Featured Item IDs (comma-separated)</label>
        <input type="text" value={menu.featuredItemIds.join(', ')} onChange={(e) => setMenu({ ...menu, featuredItemIds: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} className="mt-1 w-full border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" placeholder="red-planet, apollo-rock, manhattan-moon" />
      </div>

      <div className="mt-4 space-y-3">
        {menu.sectors.map((sector, sIdx) => (
          <div key={sector.id} className="border border-gray-200 bg-white">
            <div className="flex cursor-pointer items-center justify-between px-4 py-3" onClick={() => setExpandedSector(expandedSector === sector.id ? null : sector.id)}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-gray-400">{sector.code}</span>
                <span className="text-sm font-semibold text-gray-900">{sector.name || 'Unnamed Sector'}</span>
                <span className="text-xs text-gray-400">{sector.items.length} items</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); moveSector(sIdx, -1) }} disabled={sIdx === 0} className="px-1 text-gray-400 hover:text-gray-600 disabled:opacity-30" aria-label="Move up">&uarr;</button>
                <button onClick={(e) => { e.stopPropagation(); moveSector(sIdx, 1) }} disabled={sIdx === menu.sectors.length - 1} className="px-1 text-gray-400 hover:text-gray-600 disabled:opacity-30" aria-label="Move down">&darr;</button>
                <button onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: 'sector', sectorIdx: sIdx }) }} className="px-1 text-red-400 hover:text-red-600" aria-label="Delete">&times;</button>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedSector === sector.id ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>

            {expandedSector === sector.id && (
              <div className="border-t border-gray-200 px-4 py-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Sector Code</label>
                    <input type="text" value={sector.code} onChange={(e) => updateSector(sIdx, { code: e.target.value })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Name</label>
                    <input type="text" value={sector.name} onChange={(e) => updateSector(sIdx, { name: e.target.value, id: generateId(e.target.value) || sector.id })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Subtitle</label>
                    <input type="text" value={sector.subtitle} onChange={(e) => updateSector(sIdx, { subtitle: e.target.value })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Flavor Text</label>
                    <input type="text" value={sector.flavorText} onChange={(e) => updateSector(sIdx, { flavorText: e.target.value })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-900">Items</label>
                    <button onClick={() => addItem(sIdx)} className="text-xs text-orange-600 hover:text-orange-700">+ Add Item</button>
                  </div>
                  <div className="mt-3 space-y-2">
                    {sector.items.map((item, iIdx) => (
                      <div key={item.id} className="border border-gray-200 p-3">
                        {editingItem?.sectorIdx === sIdx && editingItem?.itemIdx === iIdx ? (
                          <div className="space-y-3">
                            <div className="grid gap-3 sm:grid-cols-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-500">Name</label>
                                <input type="text" value={item.name} onChange={(e) => updateItem(sIdx, iIdx, { name: e.target.value, id: generateId(e.target.value) || item.id })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500">Price (empty = &ldquo;Ask crew&rdquo;)</label>
                                <input type="number" value={item.price ?? ''} onChange={(e) => updateItem(sIdx, iIdx, { price: e.target.value ? Number(e.target.value) : null })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" placeholder="e.g. 150" />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500">Badges</label>
                                <div className="mt-1 flex flex-wrap gap-2">
                                  {allBadges.map((badge) => (
                                    <label key={badge} className="flex items-center gap-1 text-xs text-gray-600">
                                      <input type="checkbox" checked={item.badges.includes(badge)} onChange={(e) => {
                                        const badges = e.target.checked ? [...item.badges, badge] : item.badges.filter((b) => b !== badge)
                                        updateItem(sIdx, iIdx, { badges })
                                      }} className="accent-orange-500" />
                                      {badge}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500">Description</label>
                              <input type="text" value={item.description} onChange={(e) => updateItem(sIdx, iIdx, { description: e.target.value })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Images</label>
                              <div className="flex flex-wrap gap-2">
                                {(item.images ?? []).map((img, imgIdx) => (
                                  <ImageUploader
                                    key={imgIdx}
                                    currentUrl={img}
                                    onUpload={(url) => {
                                      const images = [...(item.images ?? [])]
                                      images[imgIdx] = url
                                      updateItem(sIdx, iIdx, { images })
                                    }}
                                    onRemove={() => {
                                      const images = (item.images ?? []).filter((_, i) => i !== imgIdx)
                                      updateItem(sIdx, iIdx, { images })
                                    }}
                                  />
                                ))}
                                <ImageUploader
                                  onUpload={(url) => updateItem(sIdx, iIdx, { images: [...(item.images ?? []), url] })}
                                />
                              </div>
                            </div>
                            <button onClick={() => setEditingItem(null)} className="text-xs text-gray-500 hover:text-gray-700">Collapse</button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setEditingItem({ sectorIdx: sIdx, itemIdx: iIdx })}>
                              <span className="text-sm font-medium text-gray-900">{item.name || 'Unnamed Item'}</span>
                              <span className="text-xs text-gray-400">{item.price !== null ? `₹${item.price}` : 'Ask crew'}</span>
                              {item.badges.map((b) => (
                                <span key={b} className="bg-orange-100 px-1.5 py-0.5 text-[10px] font-medium text-orange-700">{b}</span>
                              ))}
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => moveItem(sIdx, iIdx, -1)} disabled={iIdx === 0} className="px-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">&uarr;</button>
                              <button onClick={() => moveItem(sIdx, iIdx, 1)} disabled={iIdx === sector.items.length - 1} className="px-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">&darr;</button>
                              <button onClick={() => setDeleteTarget({ type: 'item', sectorIdx: sIdx, itemIdx: iIdx })} className="px-1 text-red-400 hover:text-red-600">&times;</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-900">Special Payloads</h2>
        <div className="mt-3 border border-gray-200 bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-500">Name</label>
              <input type="text" value={menu.specialPayloads.name} onChange={(e) => updateSpecialPayloads({ name: e.target.value })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Flavor Text</label>
              <input type="text" value={menu.specialPayloads.flavorText} onChange={(e) => updateSpecialPayloads({ flavorText: e.target.value })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-900">Items</label>
              <button onClick={addSpecialItem} className="text-xs text-orange-600 hover:text-orange-700">+ Add Item</button>
            </div>
            <div className="mt-2 space-y-2">
              {menu.specialPayloads.items.map((item, iIdx) => (
                <div key={item.id} className="border border-gray-200 p-3 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="grid flex-1 gap-3 sm:grid-cols-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500">Name</label>
                        <input type="text" value={item.name} onChange={(e) => updateSpecialItem(iIdx, { name: e.target.value, id: generateId(e.target.value) || item.id })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">Price</label>
                        <input type="number" value={item.price ?? ''} onChange={(e) => updateSpecialItem(iIdx, { price: e.target.value ? Number(e.target.value) : null })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">Description</label>
                        <input type="text" value={item.description} onChange={(e) => updateSpecialItem(iIdx, { description: e.target.value })} className="mt-1 w-full border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
                      </div>
                    </div>
                    <button onClick={() => deleteSpecialItem(iIdx)} className="ml-3 mt-5 px-1 text-red-400 hover:text-red-600" aria-label="Delete item">&times;</button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Badges</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {allBadges.map((badge) => (
                        <label key={badge} className="flex items-center gap-1 text-xs text-gray-600">
                          <input type="checkbox" checked={item.badges.includes(badge)} onChange={(e) => {
                            const badges = e.target.checked ? [...item.badges, badge] : item.badges.filter((b) => b !== badge)
                            updateSpecialItem(iIdx, { badges })
                          }} className="accent-orange-500" />
                          {badge}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Images</label>
                    <div className="flex flex-wrap gap-2">
                      {(item.images ?? []).map((img, imgIdx) => (
                        <ImageUploader
                          key={imgIdx}
                          currentUrl={img}
                          onUpload={(url) => {
                            const images = [...(item.images ?? [])]
                            images[imgIdx] = url
                            updateSpecialItem(iIdx, { images })
                          }}
                          onRemove={() => {
                            const images = (item.images ?? []).filter((_, i) => i !== imgIdx)
                            updateSpecialItem(iIdx, { images })
                          }}
                        />
                      ))}
                      <ImageUploader
                        onUpload={(url) => updateSpecialItem(iIdx, { images: [...(item.images ?? []), url] })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Bundles</h2>
          <button onClick={addBundle} className="text-sm text-orange-600 hover:text-orange-700">+ Add Bundle</button>
        </div>
        <div className="mt-3 space-y-2">
          {menu.bundles.map((bundle, i) => (
            <div key={bundle.id} className="flex items-center gap-3 border border-gray-200 bg-white p-3">
              <input type="text" value={bundle.name} onChange={(e) => updateBundle(i, { name: e.target.value, id: generateId(e.target.value) || bundle.id })} placeholder="Bundle name" className="w-40 border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
              <input type="text" value={bundle.description} onChange={(e) => updateBundle(i, { description: e.target.value })} placeholder="Description" className="flex-1 border border-gray-300 px-2 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none" />
              <button onClick={() => setDeleteTarget({ type: 'bundle', bundleIdx: i })} className="text-red-400 hover:text-red-600">&times;</button>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 mt-6 border-t border-gray-200 bg-gray-50 px-4 py-3 -mx-4 lg:-mx-6 lg:px-6">
        <button onClick={() => save(menu)} disabled={saving} className="bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Menu'}
        </button>
      </div>

      {deleteTarget && (
        <ConfirmDialog title={`Delete ${deleteTarget.type}`} message={`Are you sure you want to delete this ${deleteTarget.type}?`} confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
