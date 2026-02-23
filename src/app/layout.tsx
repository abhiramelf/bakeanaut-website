import type { Metadata, Viewport } from 'next'
import { Syne, Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/hooks/useCart'
import CartToast from '@/components/CartToast'
import { getSiteContent } from '@/lib/content'
import { SpeedInsights } from "@vercel/speed-insights/next"

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

export const viewport: Viewport = {
  viewportFit: 'cover',
}

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
            dangerouslySetInnerHTML={{
              __html: `(function(a,b,c){var d=a.history,e=document,f=navigator||{},g=localStorage,
h=encodeURIComponent,i=d.pushState,k=function(){return Math.random().toString(36)},
l=function(){return g.cid||(g.cid=k()),g.cid},m=function(r){var s=[];for(var t in r)
r.hasOwnProperty(t)&&void 0!==r[t]&&s.push(h(t)+"="+h(r[t]));return s.join("&")},
n=function(r,s,t,u,v){var w="https://www.google-analytics.com/g/collect",x={v:"2",
tid:b,_p:k(),sr:(a.screen?a.screen.width+"x"+a.screen.height:void 0),ul:(f.language||
void 0),cid:l(),_s:"1",dl:e.location.href,dt:e.title,dr:e.referrer,sid:g.sid||(g.sid=
k()),sct:g.sct?parseInt(g.sct,10)+1:1,seg:"1"};g.sct=x.sct;if(r)x.en=r,x.ep=void 0;
else x.en="page_view";if(s)x["ep.event_category"]=s;if(t)x["ep.event_label"]=t;
if(u)x["ep.value"]=u;if(v)for(var y in v)v.hasOwnProperty(y)&&(x["ep."+y]=v[y]);
var z=w+"?"+m(x);if(f.sendBeacon)f.sendBeacon(z);else{var A=new XMLHttpRequest;
A.open("GET",z),A.send()}};d.pushState=function(){i.apply(d,arguments),n()};
a.addEventListener("popstate",function(){n()});
if("loading"==e.readyState)e.addEventListener("DOMContentLoaded",function(){n()});
else n();a.ma={trackEvent:function(r,s,t,u,v){n(s,r,t,u,v)}}
})(window,"${process.env.NEXT_PUBLIC_GA_ID}");`,
            }}
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
          <CartToast />
          {children}
          <SpeedInsights />
        </CartProvider>
      </body>
    </html>
  )
}
