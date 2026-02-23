'use client'

import { useEffect, useState, useCallback } from 'react'
import type { SiteContent } from '@/types/content'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import Toast from '@/components/admin/Toast'

interface Review {
  name: string
  text: string
  rating: number
  tag?: string
}

const emptyReview: Review = { name: '', text: '', rating: 5 }

export default function ReviewsEditor() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [overallRating, setOverallRating] = useState('')
  const [reportCount, setReportCount] = useState('')
  const [googleReviewUrl, setGoogleReviewUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data: SiteContent) => {
        setReviews(data.crewTransmissions?.reviews ?? [])
        setOverallRating(data.crewTransmissions?.overallRating ?? '5.0')
        setReportCount(data.crewTransmissions?.reportCount ?? '')
        setGoogleReviewUrl(data.crewTransmissions?.googleReviewUrl ?? '')
      })
      .finally(() => setLoading(false))
  }, [])

  const save = useCallback(async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/content')
      const content = await res.json() as SiteContent
      content.crewTransmissions = {
        ...content.crewTransmissions,
        reviews,
        overallRating,
        reportCount,
        googleReviewUrl,
      }
      const saveRes = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (!saveRes.ok) throw new Error('Failed to save')
      setToast({ message: 'Reviews saved', type: 'success' })
    } catch {
      setToast({ message: 'Failed to save reviews', type: 'error' })
    } finally {
      setSaving(false)
    }
  }, [reviews, overallRating, reportCount, googleReviewUrl])

  function addReview() {
    setReviews([...reviews, { ...emptyReview }])
  }

  function updateReview(index: number, field: keyof Review, value: string | number) {
    const updated = [...reviews]
    updated[index] = { ...updated[index], [field]: value }
    setReviews(updated)
  }

  function handleDelete() {
    if (deleteIdx === null) return
    setReviews(reviews.filter((_, i) => i !== deleteIdx))
    setDeleteIdx(null)
  }

  function moveReview(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= reviews.length) return
    const updated = [...reviews]
    ;[updated[index], updated[target]] = [updated[target], updated[index]]
    setReviews(updated)
  }

  if (loading) {
    return <div className="py-12 text-center text-gray-400">Loading reviews...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Reviews Editor</h1>
          <p className="mt-1 text-sm text-gray-500">{reviews.length} reviews</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addReview}
            className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Add Review
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Overall settings */}
      <div className="mt-6 border border-gray-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-gray-900">Section Settings</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-gray-500">Overall Rating</label>
            <input
              type="text"
              value={overallRating}
              onChange={(e) => setOverallRating(e.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Report Count Label</label>
            <input
              type="text"
              value={reportCount}
              onChange={(e) => setReportCount(e.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Google Review URL</label>
            <input
              type="text"
              value={googleReviewUrl}
              onChange={(e) => setGoogleReviewUrl(e.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="mt-4 space-y-3">
        {reviews.map((review, i) => (
          <div key={i} className="border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-gray-400">Review #{i + 1}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => moveReview(i, -1)}
                  disabled={i === 0}
                  className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  &uarr;
                </button>
                <button
                  onClick={() => moveReview(i, 1)}
                  disabled={i === reviews.length - 1}
                  className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  &darr;
                </button>
                <button
                  onClick={() => setDeleteIdx(i)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-500">Name</label>
                <input
                  type="text"
                  value={review.name}
                  onChange={(e) => updateReview(i, 'name', e.target.value)}
                  className="mt-1 w-full border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500">Rating</label>
                  <select
                    value={review.rating}
                    onChange={(e) => updateReview(i, 'rating', parseInt(e.target.value))}
                    className="mt-1 w-full border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} stars</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Tag (optional)</label>
                  <input
                    type="text"
                    value={review.tag ?? ''}
                    onChange={(e) => updateReview(i, 'tag', e.target.value)}
                    placeholder="e.g. LOCAL GUIDE"
                    className="mt-1 w-full border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-500">Review Text</label>
              <textarea
                value={review.text}
                onChange={(e) => updateReview(i, 'text', e.target.value)}
                rows={3}
                className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {deleteIdx !== null && (
        <ConfirmDialog
          title="Delete Review"
          message={`Delete review from "${reviews[deleteIdx]?.name}"?`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteIdx(null)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
