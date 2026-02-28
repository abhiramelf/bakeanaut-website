import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import MenuPageContent from '@/components/MenuPageContent'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getSiteContent, getMenuData } from '@/lib/content'
import MenuJsonLd from '@/components/MenuJsonLd'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Active Missions — Bakeanaut',
  description:
    'Browse all sectors. Planetary Cookies, Nebula Blocks, Lunar Cheesecakes, and more. Order via WhatsApp from Thiruvananthapuram, Kerala.',
  alternates: {
    canonical: '/menu',
  },
  openGraph: {
    title: 'Active Missions — Bakeanaut Menu',
    description:
      'Browse all sectors. Planetary Cookies, Nebula Blocks, Lunar Cheesecakes, and more. Order via WhatsApp from Thiruvananthapuram, Kerala.',
    url: 'https://bakeanaut.in/menu',
    siteName: 'Bakeanaut',
    type: 'website',
    images: [
      {
        url: '/images/Bakeanaut_OG.png',
        width: 1200,
        height: 630,
        alt: 'Bakeanaut Menu — Active Missions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Active Missions — Bakeanaut Menu',
    description:
      'Browse all sectors. Planetary Cookies, Nebula Blocks, Lunar Cheesecakes, and more. Order via WhatsApp.',
    images: ['/images/Bakeanaut_OG.png'],
  },
}

export default async function MenuPage() {
  const [content, menuData] = await Promise.all([getSiteContent(), getMenuData()])

  return (
    <main>
      <MenuJsonLd menuData={menuData} />
      <Navbar whatsappPhone={content.contact.whatsappPhone} />
      <ErrorBoundary>
        <MenuPageContent menu={content.menu} menuData={menuData} />
      </ErrorBoundary>
      <Footer contact={content.contact} footer={content.footer} />
    </main>
  )
}
