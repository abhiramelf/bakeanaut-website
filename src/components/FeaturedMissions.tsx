'use client'

import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import TypewriterReveal from './TypewriterReveal'
import MenuItem from './MenuItem'
import { getFeaturedItems } from '@/data/menu'

const featuredItems = getFeaturedItems()

export default function FeaturedMissions() {
  return (
    <section id="menu" className="relative overflow-hidden bg-dark-bg px-6 py-28 md:py-36">
      {/* Decorative accent top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cosmic-orange/30 to-transparent" />

      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <ScrollReveal>
          <div className="relative">
            <p className="font-mono text-xs tracking-[0.4em] text-cosmic-orange">
              TOP MISSIONS
            </p>
            <h2 className="mt-4 font-display text-5xl font-800 uppercase tracking-tight text-glow-white md:text-7xl lg:text-8xl">
              <TypewriterReveal text="CREW" as="span" />
              <br />
              <TypewriterReveal text="FAVORITES" as="span" className="text-cosmic-orange text-glow-orange" staggerRate={0.04} />
            </h2>
            <p className="mt-6 max-w-md font-body text-base text-muted-purple md:text-lg">
              Our most-requested missions &middot; Crew-approved &middot; Launch-ready
            </p>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-cosmic-orange/50 via-light-purple/30 to-transparent" />
          </div>
        </ScrollReveal>

        {/* Featured items grid */}
        <div className="mt-16 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((featured, i) => (
            <ScrollReveal key={featured.item.id} delay={i * 0.08}>
              <div className="relative">
                <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-muted-purple/60">
                  {featured.sectorCode} &middot; {featured.sectorName}
                </span>
                <MenuItem
                  item={featured.item}
                  sectorName={featured.sectorName}
                  sectorCode={featured.sectorCode}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA to full menu */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 flex justify-center">
            <Link
              href="/menu"
              className="group border-2 border-cosmic-orange px-10 py-4 font-display text-sm font-700 uppercase tracking-[0.15em] text-cosmic-orange transition-all duration-200 hover:bg-cosmic-orange hover:text-dark-bg hover:shadow-[0_0_30px_rgba(255,138,61,0.3)]"
            >
              View All Missions
              <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
