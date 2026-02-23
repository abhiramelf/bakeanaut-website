import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import MenuPageContent from '@/components/MenuPageContent'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getSiteContent, getMenuData } from '@/lib/content'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Active Missions — Bakeanaut',
  description:
    'Browse all sectors. Planetary Cookies, Nebula Blocks, Lunar Cheesecakes, and more. Order via WhatsApp from Thiruvananthapuram, Kerala.',
}

export default async function MenuPage() {
  const [content, menuData] = await Promise.all([getSiteContent(), getMenuData()])

  return (
    <main>
      <Navbar whatsappPhone={content.contact.whatsappPhone} />
      <ErrorBoundary>
        <MenuPageContent menu={content.menu} menuData={menuData} />
      </ErrorBoundary>
      <Footer contact={content.contact} footer={content.footer} />
    </main>
  )
}
