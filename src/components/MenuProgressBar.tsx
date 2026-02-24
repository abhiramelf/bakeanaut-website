'use client'

import { useState, useEffect } from 'react'
import { sectors } from '@/data/menu'
import { useReducedMotion } from 'framer-motion'

const allSections = [
  ...sectors.map((s) => ({ id: s.id, label: s.code })),
  { id: 'special-payloads', label: 'CLASSIFIED' },
  { id: 'bundles', label: 'FLIGHT PLANS' },
]

export default function MenuProgressBar() {
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const totalSections = allSections.length

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    allSections.forEach((section, index) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index)
            }
          })
        },
        { rootMargin: '-160px 0px -60% 0px', threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const progress = ((activeIndex + 1) / totalSections) * 100

  return (
    <div className="sticky top-[132px] z-[19] sm:top-[140px] lg:top-[148px]">
      <div className="relative h-[2px] w-full bg-light-purple/20">
        <div
          className="absolute inset-y-0 left-0 bg-cosmic-orange"
          style={{
            width: `${progress}%`,
            transition: shouldReduceMotion ? 'none' : 'width 0.3s ease-out',
          }}
        />
        {/* Sector label — hidden on mobile */}
        <div className="absolute right-2 -top-5 hidden items-center gap-1.5 sm:flex">
          <span className="font-mono text-[10px] text-muted-purple/60">
            {allSections[activeIndex]?.label} / {totalSections}
          </span>
        </div>
      </div>
    </div>
  )
}
