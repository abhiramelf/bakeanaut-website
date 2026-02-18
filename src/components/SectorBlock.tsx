import ScrollReveal from './ScrollReveal'
import MenuItem from './MenuItem'
import type { Sector } from '@/types'

interface SectorBlockProps {
  sector: Sector
  index: number
  hideHeader?: boolean
}

export default function SectorBlock({ sector, index, hideHeader }: SectorBlockProps) {
  // Extract numeral from sector code (e.g. "SECTOR IV" → "IV")
  const watermark = sector.code.replace(/^SECTOR\s*/i, '') || String(index + 1)

  return (
    <div className="relative">
      {!hideHeader && (
        <>
          {/* Large watermark number */}
          <div className="section-watermark">
            {watermark}
          </div>

          <ScrollReveal direction="left">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.3em] text-cosmic-orange">
                {sector.code}
              </span>
              <div className="h-px flex-1 bg-light-purple/40" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h3 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-mission-white md:text-4xl">
              {sector.name}
            </h3>
            <div className="mt-1 flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-wider text-muted-purple/60">
                {sector.subtitle}
              </span>
              <span className="text-muted-purple/30">|</span>
              <span className="font-body text-sm italic text-cookie-tan/80">
                {sector.flavorText}
              </span>
            </div>
          </ScrollReveal>
        </>
      )}

      <div className={`${hideHeader ? '' : 'mt-6'} grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
        {sector.items.map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 0.05}>
            <MenuItem
              item={item}
              sectorName={sector.name}
              sectorCode={sector.code}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
