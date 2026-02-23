'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminHeader({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void
}) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
      <button
        onClick={onToggleSidebar}
        className="flex h-9 w-9 items-center justify-center text-gray-500 hover:text-gray-700 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="hidden lg:block" />

      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="text-sm text-gray-500 transition-colors hover:text-gray-700 disabled:opacity-50"
      >
        {loggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </header>
  )
}
