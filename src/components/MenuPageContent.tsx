'use client'

import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import SectorBlock from './SectorBlock'
import BundleCard from './BundleCard'
import SectorNav from './SectorNav'
import { sectors, specialPayloads, bundles } from '@/data/menu'

export default function MenuPageContent() {
  return (
    <div id="main-content">
      {/* Compact header */}
      <div className="bg-deep-space px-6 pb-0 pt-28 md:pt-32 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-muted-purple transition-colors hover:text-cosmic-orange"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 2L4 7l5 5" />
            </svg>
            BACK TO BASE
          </Link>
          <p className="mt-6 font-mono text-xs tracking-[0.4em] text-cosmic-orange">
            ACTIVE MISSIONS
          </p>
          <h1 className="mt-3 font-display text-5xl font-800 uppercase tracking-tight text-glow-white md:text-7xl lg:text-8xl">
            FULL
            <br />
            <span className="text-cosmic-orange text-glow-orange">CATALOG</span>
          </h1>
          <p className="mt-6 max-w-md font-body text-base text-muted-purple md:text-lg">
            Limited payload per day &middot; Ask crew about classified drops
          </p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-cosmic-orange/50 via-light-purple/30 to-transparent" />
        </div>
      </div>

      {/* Sticky sector nav */}
      <SectorNav />

      {/* All sectors */}
      <div className="bg-dark-bg px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px] space-y-20">
          {sectors.map((sector, i) => (
            <div key={sector.id} id={sector.id}>
              <SectorBlock sector={sector} index={i} />
            </div>
          ))}

          {/* Special Payloads */}
          <div id="special-payloads" className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-warning-yellow/60 via-warning-yellow/20 to-transparent" />
            <ScrollReveal direction="left">
              <div className="flex items-center gap-3">
                <span className="bg-warning-yellow px-3 py-1 font-mono text-[10px] font-700 tracking-[0.3em] text-dark-bg">
                  CLASSIFIED
                </span>
                <div className="h-px flex-1 bg-warning-yellow/30" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h3 className="mt-5 font-display text-3xl font-800 uppercase tracking-tight text-mission-white md:text-4xl">
                {specialPayloads.name}
              </h3>
              <p className="mt-2 font-body text-sm italic text-cookie-tan md:text-base">
                {specialPayloads.flavorText}
              </p>
            </ScrollReveal>
            <div className="mt-6">
              {specialPayloads.items.map((item) => (
                <ScrollReveal key={item.id}>
                  <div className="mt-4">
                    <SectorBlock
                      sector={{ ...specialPayloads, items: [item] }}
                      index={7}
                      hideHeader
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Bundles */}
          <div id="bundles" className="relative">
            <ScrollReveal>
              <div className="flex items-center gap-3">
                <span className="border border-cosmic-orange px-3 py-1 font-mono text-[10px] font-700 tracking-[0.3em] text-cosmic-orange">
                  FLIGHT PLANS
                </span>
                <div className="h-px flex-1 bg-cosmic-orange/30" />
              </div>
              <h3 className="mt-5 font-display text-3xl font-800 uppercase tracking-tight text-mission-white md:text-4xl">
                RECOMMENDED <span className="text-cosmic-orange">BUNDLES</span>
              </h3>
              <p className="mt-2 font-body text-sm text-muted-purple md:text-base">
                Curated flight plans for optimal payload configuration.
              </p>
            </ScrollReveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {bundles.map((bundle, i) => (
                <ScrollReveal key={bundle.id} delay={i * 0.1}>
                  <BundleCard bundle={bundle} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
