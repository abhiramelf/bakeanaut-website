import type { Metadata, Viewport } from 'next'
import { Syne, Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/hooks/useCart'
import { MissionLogProvider } from '@/hooks/useMissionLog'
import { SoundProvider } from '@/hooks/useSound'
import CartToast from '@/components/CartToast'
import QuickReorderBar from '@/components/QuickReorderBar'
import EasterEggOverlay from '@/components/EasterEggOverlay'
import { getSiteContent } from '@/lib/content'
import { SpeedInsights } from "@vercel/speed-insights/next"

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  preload: true,
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#2B0F45',
}

export const metadata: Metadata = {
  title: 'Bakeanaut — Edible Missions. Cleared for Launch.',
  description:
    'Bakeanaut — premium artisan cookies, NYC-style cheesecakes, brownies, bomboloni & cakes in Thiruvananthapuram, Kerala. Order via WhatsApp. Best desserts in Trivandrum.',
  keywords: [
    'Bakeanaut',
    'cookies Thiruvananthapuram',
    'cheesecake Trivandrum',
    'brownies Kerala',
    'bomboloni Trivandrum',
    'best bakery Thiruvananthapuram',
    'artisan desserts Kerala',
    'order desserts WhatsApp Trivandrum',
    'NYC cheesecake Kerala',
    'premium cakes Thiruvananthapuram',
  ],
  metadataBase: new URL('https://bakeanaut.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bakeanaut — Edible Missions. Cleared for Launch.',
    description:
      'Bakeanaut — premium artisan cookies, NYC-style cheesecakes, brownies, bomboloni & cakes in Thiruvananthapuram, Kerala. Order via WhatsApp.',
    url: 'https://bakeanaut.in',
    siteName: 'Bakeanaut',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/images/Bakeanaut_OG.png',
        width: 1200,
        height: 630,
        alt: 'Bakeanaut — Edible Missions. Cleared for Launch.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakeanaut — Edible Missions. Cleared for Launch.',
    description:
      'Bakeanaut — premium artisan cookies, NYC-style cheesecakes, brownies, bomboloni & cakes in Thiruvananthapuram, Kerala. Order via WhatsApp.',
    images: ['/images/Bakeanaut_OG.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://bakeanaut.in/#website',
      url: 'https://bakeanaut.in',
      name: 'Bakeanaut',
      description:
        'Premium artisan cookies, NYC-style cheesecakes, brownies, bomboloni & cakes in Thiruvananthapuram, Kerala.',
    },
    {
      '@type': 'Bakery',
      '@id': 'https://bakeanaut.in/#bakery',
      name: 'Bakeanaut',
      description:
        'Premium artisan cookies, NYC-style cheesecakes, brownies, bomboloni & cakes in Thiruvananthapuram, Kerala. Order via WhatsApp.',
      url: 'https://bakeanaut.in',
      telephone: '+919916699631',
      image: 'https://bakeanaut.in/images/Bakeanaut_OG.png',
      logo: 'https://bakeanaut.in/images/logo.png',
      priceRange: '₹₹',
      servesCuisine: ['Cookies', 'Cheesecakes', 'Brownies', 'Bomboloni', 'Cakes'],
      sameAs: ['https://www.instagram.com/bakeanaut_/'],
      hasMenu: 'https://bakeanaut.in/menu',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Near Manacaud P.O.',
        addressLocality: 'Thiruvananthapuram',
        addressRegion: 'Kerala',
        postalCode: '695009',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 8.4882,
        longitude: 76.9531,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '11:00',
          closes: '21:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Friday', 'Saturday'],
          opens: '11:00',
          closes: '22:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: '12:00',
          closes: '20:00',
        },
      ],
    },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const content = await getSiteContent()
  const whatsappPhone = content.contact.whatsappPhone

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            src="/scripts/ma.js"
            data-id={process.env.NEXT_PUBLIC_GA_ID}
            defer
          />
        )}
      </head>
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} ${spaceMono.variable} grain-overlay antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <CartProvider whatsappPhone={whatsappPhone}>
          <MissionLogProvider>
            <SoundProvider>
              <CartToast />
              <QuickReorderBar />
              <EasterEggOverlay />
              {children}
              {process.env.NEXT_PUBLIC_SPEED_INSIGHTS && <SpeedInsights />}
            </SoundProvider>
          </MissionLogProvider>
        </CartProvider>
      </body>
    </html>
  )
}
