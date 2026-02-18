import type { Metadata } from 'next'
import { Syne, Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/hooks/useCart'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bakeanaut — Edible Missions. Cleared for Launch.',
  description:
    'An experiential brand built around indulgent, dessert-forward missions. Order via WhatsApp from Thiruvananthapuram, Kerala.',
  metadataBase: new URL('https://bakeanaut.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bakeanaut — Edible Missions. Cleared for Launch.',
    description:
      'An experiential brand built around indulgent, dessert-forward missions. Order via WhatsApp from Thiruvananthapuram, Kerala.',
    url: 'https://bakeanaut.in',
    siteName: 'Bakeanaut',
    type: 'website',
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
      'An experiential brand built around indulgent, dessert-forward missions. Order via WhatsApp.',
    images: ['/images/Bakeanaut_OG.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Bakeanaut',
  description:
    'An experiential brand built around indulgent, dessert-forward missions.',
  url: 'https://bakeanaut.in',
  telephone: '+919916699631',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Manacaud P.O.',
    addressLocality: 'Thiruvananthapuram',
    addressRegion: 'Kerala',
    postalCode: '695009',
    addressCountry: 'IN',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} ${spaceMono.variable} grain-overlay antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
