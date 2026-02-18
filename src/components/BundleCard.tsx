'use client'

import type { Bundle } from '@/types'
import { useCart } from '@/hooks/useCart'

interface BundleCardProps {
  bundle: Bundle
}

export default function BundleCard({ bundle }: BundleCardProps) {
  const { addItem } = useCart()

  const handleAdd = () => {
    addItem(
      {
        id: bundle.id,
        name: bundle.name,
        description: bundle.description,
        price: null,
        badges: [],
      },
      'BUNDLES',
      'BUNDLE'
    )
  }

  return (
    <div className="group relative border border-dashed border-light-purple/50 bg-deep-space/60 p-7 transition-all duration-300 hover:border-cosmic-orange/40 hover:bg-light-purple/10">
      {/* Corner accents */}
      <div className="absolute left-0 top-0 h-3 w-px bg-cosmic-orange/60" />
      <div className="absolute left-0 top-0 h-px w-3 bg-cosmic-orange/60" />
      <div className="absolute bottom-0 right-0 h-3 w-px bg-cosmic-orange/60" />
      <div className="absolute bottom-0 right-0 h-px w-3 bg-cosmic-orange/60" />

      <span className="font-mono text-[10px] tracking-[0.3em] text-warning-yellow">
        RECOMMENDED FLIGHT PLAN
      </span>
      <h4 className="mt-3 font-display text-xl font-700 uppercase tracking-tight text-mission-white">
        {bundle.name}
      </h4>
      <p className="mt-2 font-body text-sm text-muted-purple">
        {bundle.description}
      </p>
      <p className="mt-2 font-mono text-xs text-cookie-tan/70">Ask crew for pricing</p>
      <button
        onClick={handleAdd}
        className="mt-5 w-full border border-cosmic-orange/50 bg-cosmic-orange/10 py-2.5 font-mono text-xs font-700 uppercase tracking-wider text-cosmic-orange transition-all hover:bg-cosmic-orange hover:text-dark-bg hover:shadow-[0_0_15px_rgba(255,138,61,0.3)]"
      >
        Add Bundle
      </button>
    </div>
  )
}
