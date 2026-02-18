import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import MenuPageContent from '@/components/MenuPageContent'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Active Missions — Bakeanaut',
  description:
    'Browse all sectors. Planetary Cookies, Nebula Blocks, Lunar Cheesecakes, and more. Order via WhatsApp from Thiruvananthapuram, Kerala.',
}

export default function MenuPage() {
  return (
    <main>
      <Navbar />
      <ErrorBoundary>
        <MenuPageContent />
      </ErrorBoundary>
      <Footer />
    </main>
  )
}
