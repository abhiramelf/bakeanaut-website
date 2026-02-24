'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import TypewriterReveal from './TypewriterReveal'
import SectorBlock from './SectorBlock'
import BundleCard from './BundleCard'
import SectorNav from './SectorNav'
import MenuProgressBar from './MenuProgressBar'
import type { SiteContent, MenuData } from '@/types/content'

interface MenuPageContentProps {
  menu: SiteContent['menu']
  menuData: MenuData
}

export default function MenuPageContent({ menu, menuData }: MenuPageContentProps) {
  const { sectors, specialPayloads, bundles } = menuData
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSectors = useMemo(() => {
    if (!searchQuery.trim()) return sectors
    const q = searchQuery.toLowerCase()
    return sectors
      .map((sector) => ({
        ...sector,
        items: sector.items.filter(
          (item) =>
            !item.classified &&
            (item.name.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q))
        ),
      }))
      .filter((sector) => sector.items.length > 0)
  }, [sectors, searchQuery])

  const isSearching = searchQuery.trim().length > 0

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
          <TypewriterReveal
            text={menu.sectionLabel}
            as="p"
            className="mt-6 font-mono text-xs tracking-[0.4em] text-cosmic-orange"
          />
          <h1 className="mt-3 font-display text-5xl font-extrabold uppercase tracking-tight text-glow-white md:text-7xl lg:text-8xl">
            {menu.pageHeading.split(' ').map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? (
                  <>
                    <br />
                    <span className="text-cosmic-orange text-glow-orange">{word}</span>
                  </>
                ) : (
                  word + ' '
                )}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md font-body text-base text-muted-purple md:text-lg">
            {menu.pageSubtext}
          </p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-cosmic-orange/50 via-light-purple/30 to-transparent" />
        </div>
      </div>

      {/* Ambient data stream ticker */}
      <div
        className="overflow-hidden border-y border-light-purple/20 bg-deep-space/80"
        aria-hidden="true"
      >
        <div className="ticker-track-half font-mono py-2.5 text-[10px] tracking-[0.15em] text-muted-purple/50">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex shrink-0 items-center">
              {menu.tickerItems.map((text, i) => (
                <span key={i} className="flex shrink-0 items-center gap-6 px-6">
                  <span>{text}</span>
                  <span className="text-light-purple/40">{'//'}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Sticky sector nav */}
      <SectorNav />
      <MenuProgressBar />

      {/* Search input */}
      <div className="bg-dark-bg px-6 pt-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="relative">
            <input
              id="menu-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search missions..."
              className="w-full border border-light-purple/30 bg-deep-space/30 px-4 py-3 pr-16 font-mono text-sm text-mission-white placeholder:text-muted-purple/40 transition-colors focus:border-cosmic-orange/50 focus:outline-none"
              aria-label="Search menu items"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 border border-light-purple/30 bg-light-purple/10 px-2 py-0.5 font-mono text-[10px] text-muted-purple/50">
              /
            </kbd>
          </div>
        </div>
      </div>

      {/* All sectors */}
      <div className="bg-dark-bg px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px] space-y-20">
          {filteredSectors.map((sector, i) => (
            <div key={sector.id} id={sector.id}>
              <SectorBlock sector={sector} index={i} />
            </div>
          ))}

          {isSearching && filteredSectors.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-mono text-sm text-muted-purple">
                No missions found for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="mt-1 font-mono text-xs text-muted-purple/60">
                Try a different search term.
              </p>
            </div>
          )}

          {/* Special Payloads */}
          {!isSearching && (
            <div id="special-payloads" className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-warning-yellow/60 via-warning-yellow/20 to-transparent" />
              <ScrollReveal direction="left">
                <div className="flex items-center gap-3">
                  <span className="bg-warning-yellow px-3 py-1 font-mono text-[10px] font-bold tracking-[0.3em] text-dark-bg">
                    CLASSIFIED
                  </span>
                  <div className="h-px flex-1 bg-warning-yellow/30" />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h3 className="mt-5 font-display text-3xl font-extrabold uppercase tracking-tight text-mission-white md:text-4xl">
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
          )}

          {/* Bundles */}
          {!isSearching && (
            <div id="bundles" className="relative">
              <ScrollReveal>
                <div className="flex items-center gap-3">
                  <span className="border border-cosmic-orange px-3 py-1 font-mono text-[10px] font-bold tracking-[0.3em] text-cosmic-orange">
                    FLIGHT PLANS
                  </span>
                  <div className="h-px flex-1 bg-cosmic-orange/30" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-extrabold uppercase tracking-tight text-mission-white md:text-4xl">
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
          )}
        </div>
      </div>
    </div>
  )
}
