'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import type { SiteContent } from '@/types/content'
import ImageUploader from '@/components/admin/ImageUploader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import Toast from '@/components/admin/Toast'

interface GalleryImage {
  url: string
  alt: string
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data: SiteContent) => setImages(data.gallery?.images ?? []))
      .finally(() => setLoading(false))
  }, [])

  const save = useCallback(async (updated: GalleryImage[]) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/content')
      const content = await res.json() as SiteContent
      content.gallery.images = updated
      const saveRes = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (!saveRes.ok) throw new Error('Failed to save')
      setToast({ message: 'Gallery saved', type: 'success' })
    } catch {
      setToast({ message: 'Failed to save gallery', type: 'error' })
    } finally {
      setSaving(false)
    }
  }, [])

  function handleUpload(url: string) {
    const updated = [...images, { url, alt: 'Mission archive documentation' }]
    setImages(updated)
    save(updated)
  }

  function handleDelete() {
    if (deleteIdx === null) return
    const updated = images.filter((_, i) => i !== deleteIdx)
    setImages(updated)
    setDeleteIdx(null)
    save(updated)
  }

  function moveImage(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= images.length) return
    const updated = [...images]
    ;[updated[index], updated[target]] = [updated[target], updated[index]]
    setImages(updated)
    save(updated)
  }

  function updateAlt(index: number, alt: string) {
    const updated = [...images]
    updated[index] = { ...updated[index], alt }
    setImages(updated)
  }

  if (loading) {
    return <div className="py-12 text-center text-gray-400">Loading gallery...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Gallery Manager</h1>
          <p className="mt-1 text-sm text-gray-500">{images.length} images</p>
        </div>
        <button
          onClick={() => save(images)}
          disabled={saving}
          className="bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Image grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <div key={i} className="group relative border border-gray-200 bg-white">
            <div className="relative aspect-square">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                value={img.alt}
                onChange={(e) => updateAlt(i, e.target.value)}
                placeholder="Alt text"
                className="w-full border border-gray-200 px-2 py-1 text-xs text-gray-700 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="absolute right-1 top-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => moveImage(i, -1)}
                disabled={i === 0}
                className="bg-white/90 px-1.5 py-0.5 text-xs shadow hover:bg-white disabled:opacity-30"
                aria-label="Move left"
              >
                &larr;
              </button>
              <button
                onClick={() => moveImage(i, 1)}
                disabled={i === images.length - 1}
                className="bg-white/90 px-1.5 py-0.5 text-xs shadow hover:bg-white disabled:opacity-30"
                aria-label="Move right"
              >
                &rarr;
              </button>
              <button
                onClick={() => setDeleteIdx(i)}
                className="bg-red-500 px-1.5 py-0.5 text-xs text-white shadow hover:bg-red-600"
                aria-label="Delete"
              >
                &times;
              </button>
            </div>
          </div>
        ))}

        {/* Upload slot */}
        <div className="border border-gray-200 bg-white p-2">
          <ImageUploader
            onUpload={handleUpload}
          />
        </div>
      </div>

      {deleteIdx !== null && (
        <ConfirmDialog
          title="Delete Image"
          message="This will remove the image from the gallery. Continue?"
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteIdx(null)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
