'use client'

import ScrollReveal from './ScrollReveal'

const galleryItems = [
  { id: 1, name: 'RED PLANET', code: 'RP-001', tall: true },
  { id: 2, name: 'MANHATTAN MOON', code: 'MM-003', tall: false },
  { id: 3, name: 'APOLLO ROCK', code: 'AR-002', tall: false },
  { id: 4, name: 'SOLAR FLARE MINI', code: 'SF-004', tall: true },
  { id: 5, name: 'MILKY WAY SWIRL', code: 'MW-002', tall: false },
  { id: 6, name: 'CRIMSON CLASSIFIED', code: 'CC-SPL', tall: false },
]

export default function Gallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-deep-space px-6 py-28 md:py-36">
      {/* Decorative accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-light-purple/40 to-transparent" />

      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.4em] text-cosmic-orange">
                MISSION ARCHIVE
              </p>
              <h2 className="mt-4 font-display text-4xl font-800 uppercase tracking-tight text-glow-white md:text-6xl lg:text-7xl">
                FIELD
                <br />
                <span className="text-cosmic-orange">DOCUMENTATION</span>
              </h2>
            </div>
            <div className="hidden font-mono text-xs text-muted-purple/50 md:block">
              <p>STATUS: DECLASSIFIED</p>
              <p>ENTRIES: {galleryItems.length}</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {galleryItems.map((item, i) => (
            <ScrollReveal
              key={item.id}
              delay={i * 0.08}
              className={item.tall ? 'row-span-2' : ''}
            >
              <div
                className={`group relative overflow-hidden border border-light-purple/30 bg-light-purple/30 transition-all duration-300 hover:border-cosmic-orange/40 ${
                  item.tall ? 'aspect-[3/5]' : 'aspect-square'
                }`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,138,61,0.2), transparent 60%)',
                }} />

                {/* TODO: Replace with real product photo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="mb-2 h-px w-8 bg-muted-purple/30" />
                  <div className="font-mono text-[10px] tracking-[0.2em] text-muted-purple/40">
                    [{item.code}]
                  </div>
                  <div className="mt-1 font-display text-xs font-700 uppercase tracking-wider text-muted-purple/30">
                    {item.name}
                  </div>
                  <div className="mt-2 h-px w-8 bg-muted-purple/30" />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-cosmic-orange">
                    {item.code}
                  </span>
                  <span className="mt-1 font-display text-sm font-700 uppercase tracking-wide text-mission-white">
                    {item.name}
                  </span>
                </div>

                {/* Corner accents */}
                <div className="absolute left-0 top-0 h-4 w-px bg-cosmic-orange/40" />
                <div className="absolute left-0 top-0 h-px w-4 bg-cosmic-orange/40" />
                <div className="absolute bottom-0 right-0 h-4 w-px bg-cosmic-orange/40" />
                <div className="absolute bottom-0 right-0 h-px w-4 bg-cosmic-orange/40" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
