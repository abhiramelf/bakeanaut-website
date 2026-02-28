'use client'

import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { buildRankEnquiryUrl } from '@/lib/whatsapp'
import type { SiteContent } from '@/types/content'

interface CrewProgramProps {
  crewProgram: SiteContent['crewProgram']
  whatsappPhone: string
}

const rankIcons = [
  <svg key="0" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="14" cy="14" r="10" />
    <path d="M14 8v6l4 2" />
  </svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 4l3 6.5L24 12l-5.5 4.5L20 24l-6-4-6 4 1.5-7.5L4 12l7-1.5z" />
  </svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2l2.5 5.5L23 9l-4.5 4L20 20l-6-3.5L8 20l1.5-7L5 9l6.5-1.5z" />
    <circle cx="14" cy="14" r="3" />
  </svg>,
]

export default function CrewProgram({ crewProgram, whatsappPhone }: CrewProgramProps) {
  return (
    <section className="relative overflow-hidden bg-deep-space px-6 py-28 md:py-36">
      <div className="absolute left-0 top-0 h-24 w-24 border-l-[3px] border-t-[3px] border-cosmic-orange/15" />
      <div className="absolute bottom-0 right-0 h-24 w-24 border-b-[3px] border-r-[3px] border-cosmic-orange/15" />

      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(100px,20vw,280px)] font-extrabold leading-none text-mission-white/[0.03]">
        CREW
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <ScrollReveal>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="bg-cosmic-orange px-3 py-1 font-mono text-[10px] font-bold tracking-[0.3em] text-dark-bg">
                {crewProgram.sectionLabel}
              </span>
              <div className="h-px flex-1 bg-mission-white/10" />
            </div>

            <h2 className="mt-8 font-display text-3xl font-extrabold uppercase leading-[0.9] tracking-tight text-mission-white md:text-6xl lg:text-7xl">
              {crewProgram.headingLines.map((line, i) => (
                <span key={i}>
                  {line === crewProgram.headingHighlight ? (
                    <span className="text-cosmic-orange">{line}</span>
                  ) : (
                    line
                  )}
                  {i < crewProgram.headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <p className="mt-8 font-body text-base leading-relaxed text-muted-purple md:text-lg">
              {crewProgram.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {crewProgram.ranks.map((tier, i) => (
            <ScrollReveal key={tier.rank} delay={i * 0.12}>
              <div className="group relative h-full border border-light-purple/40 bg-light-purple/15 p-7 transition-all duration-300 hover:border-cosmic-orange/40 hover:bg-light-purple/25 md:p-8">
                <div className="absolute -top-4 left-6 flex items-center gap-2 bg-cosmic-orange px-4 py-1.5">
                  <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-dark-bg">
                    RANK {tier.ordinal}
                  </span>
                </div>

                <div className="mt-4 text-muted-purple/50 transition-colors duration-300 group-hover:text-cosmic-orange">
                  {rankIcons[i] ?? rankIcons[0]}
                </div>

                <h3 className="mt-5 font-display text-2xl font-extrabold uppercase tracking-tight text-mission-white md:text-3xl">
                  {tier.rank}
                </h3>
                <p className="mt-1 font-mono text-[11px] tracking-[0.15em] text-muted-purple/80">
                  {tier.requirement}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-cosmic-orange" />
                      <span className="font-body text-sm text-cookie-tan/80">{perk}</span>
                    </li>
                  ))}
                </ul>

                {i < crewProgram.ranks.length - 1 && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                    <div className="flex h-8 w-8 items-center justify-center bg-dark-bg text-muted-purple/40">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 3l5 5-5 5" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 border-t border-light-purple/30 pt-12">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-lg">
                <p className="font-body text-lg italic leading-relaxed text-muted-purple md:text-xl">
                  &ldquo;{crewProgram.quote}&rdquo;
                </p>
                <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-muted-purple/50">
                  &mdash; {crewProgram.quoteAttribution}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/menu"
                  className="bg-cosmic-orange px-8 py-3.5 text-center font-display text-xs font-bold uppercase tracking-[0.15em] text-dark-bg transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,138,61,0.3)] hover:brightness-110"
                >
                  {crewProgram.ctaPrimaryLabel}
                </Link>
                <a
                  href={buildRankEnquiryUrl(whatsappPhone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-muted-purple/30 px-8 py-3.5 text-center font-display text-xs font-bold uppercase tracking-[0.15em] text-muted-purple transition-all duration-200 hover:border-cosmic-orange hover:text-cosmic-orange"
                >
                  {crewProgram.ctaSecondaryLabel}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
