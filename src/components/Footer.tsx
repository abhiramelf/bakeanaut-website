import Image from 'next/image'
import type { SiteContent } from '@/types/content'

interface FooterProps {
  contact: SiteContent['contact']
  footer: SiteContent['footer']
}

export default function Footer({ contact, footer }: FooterProps) {
  return (
    <footer className="relative border-t border-light-purple/30 bg-dark-bg px-6 py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cosmic-orange/30 to-transparent" />

      <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Image
            src="/images/logo.png"
            alt="Bakeanaut"
            width={180}
            height={72}
            sizes="180px"
            draggable={false}
            className="mb-6 h-14 w-auto"
          />
          <p className="font-mono text-xs tracking-[0.2em] text-muted-purple/80">
            {footer.tagline}
          </p>
          <div className="mt-4 h-px w-16 bg-cosmic-orange/30" />
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm text-muted-purple">
          <p className="font-mono text-xs font-bold tracking-[0.2em] text-cosmic-orange">
            HQ COORDINATES
          </p>
          <p className="text-muted-purple/80">
            {contact.address.street}, {contact.address.city}, {contact.address.postalCode}
          </p>
          <div className="space-y-1 pt-3">
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-mission-white/60">OPERATIONAL HOURS</p>
            {contact.hours.map((line, i) => (
              <p key={i} className="text-muted-purple/80">{line}</p>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="text-muted-purple/80 transition-colors hover:text-cosmic-orange"
            >
              {contact.phone}
            </a>
            <a
              href={contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-purple/80 transition-colors hover:text-cosmic-orange"
            >
              {contact.instagram.handle}
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="space-y-3 text-sm">
          <p className="font-mono text-xs font-bold tracking-[0.2em] text-cosmic-orange">
            LEGAL
          </p>
          <div className="flex flex-col gap-2.5">
            <a href="/terms" className="text-muted-purple/80 transition-colors hover:text-cosmic-orange">
              Terms
            </a>
            <a href="/privacy" className="text-muted-purple/80 transition-colors hover:text-cosmic-orange">
              Privacy
            </a>
            <a href="/return-refund" className="text-muted-purple/80 transition-colors hover:text-cosmic-orange">
              Return &amp; Refund
            </a>
            <a href="/shipping" className="text-muted-purple/80 transition-colors hover:text-cosmic-orange">
              Shipping
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1280px] border-t border-light-purple/20 pt-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-cosmic-orange/30" />
          <p className="font-mono text-center text-[11px] tracking-[0.3em] text-muted-purple/60">
            {footer.closingLine}
          </p>
        </div>
      </div>
    </footer>
  )
}
