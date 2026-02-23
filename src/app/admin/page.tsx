'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { SiteContent, MenuData } from '@/types/content'

export default function AdminDashboard() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [menu, setMenu] = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/content').then((r) => r.json()),
      fetch('/api/admin/menu').then((r) => r.json()),
    ])
      .then(([contentData, menuData]) => {
        setContent(contentData)
        setMenu(menuData)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="py-12 text-center text-gray-400">Loading dashboard...</div>
  }

  const sectorCount = menu?.sectors?.length ?? 0
  const itemCount =
    (menu?.sectors?.reduce((sum, s) => sum + s.items.length, 0) ?? 0) +
    (menu?.specialPayloads?.items?.length ?? 0)
  const bundleCount = menu?.bundles?.length ?? 0
  const reviewCount = content?.crewTransmissions?.reviews?.length ?? 0
  const galleryCount = content?.gallery?.images?.length ?? 0
  const lastUpdated = content?._updatedAt
    ? new Date(content._updatedAt).toLocaleString()
    : 'Never'

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Mission control overview</p>

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: 'Sectors', value: sectorCount },
          { label: 'Menu Items', value: itemCount },
          { label: 'Bundles', value: bundleCount },
          { label: 'Reviews', value: reviewCount },
          { label: 'Gallery Images', value: galleryCount },
          { label: 'Last Updated', value: lastUpdated, small: true },
        ].map((stat) => (
          <div key={stat.label} className="border border-gray-200 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {stat.label}
            </p>
            <p className={`mt-1 font-semibold text-gray-900 ${stat.small ? 'text-sm' : 'text-2xl'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Quick Actions</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: '/admin/content', label: 'Edit Site Content', desc: 'Hero text, about section, footer' },
            { href: '/admin/menu', label: 'Manage Menu', desc: 'Sectors, items, pricing, bundles' },
            { href: '/admin/gallery', label: 'Manage Gallery', desc: 'Upload and reorder images' },
            { href: '/admin/reviews', label: 'Edit Reviews', desc: 'Customer testimonials' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-gray-200 bg-white p-4 transition-colors hover:border-orange-300 hover:bg-orange-50"
            >
              <p className="font-medium text-gray-900">{link.label}</p>
              <p className="mt-1 text-xs text-gray-500">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
