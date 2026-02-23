'use client'

import { useState, lazy, Suspense } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

const DashboardTab = lazy(() => import('@/components/admin/DashboardTab'))
const ContentTab = lazy(() => import('@/components/admin/ContentTab'))
const MenuTab = lazy(() => import('@/components/admin/MenuTab'))
const GalleryTab = lazy(() => import('@/components/admin/GalleryTab'))
const ReviewsTab = lazy(() => import('@/components/admin/ReviewsTab'))

const Loading = () => <div className="py-12 text-center text-gray-400">Loading...</div>

export default function AdminShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  function handleTabChange(tab: string) {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AdminSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Suspense fallback={<Loading />}>
            {activeTab === 'dashboard' && <DashboardTab onNavigate={handleTabChange} />}
            {activeTab === 'content' && <ContentTab />}
            {activeTab === 'menu' && <MenuTab />}
            {activeTab === 'gallery' && <GalleryTab />}
            {activeTab === 'reviews' && <ReviewsTab />}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
