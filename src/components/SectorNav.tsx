'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { sectors } from '@/data/menu'

interface SectorNavTab {
  id: string
  label: string
}

const tabs: SectorNavTab[] = [
  ...sectors.map((s) => ({ id: s.id, label: s.code })),
  { id: 'special-payloads', label: 'CLASSIFIED' },
  { id: 'bundles', label: 'FLIGHT PLANS' },
]

export default function SectorNav() {
  const [activeId, setActiveId] = useState<string>(tabs[0].id)
  const navRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  // Track which sector is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    tabs.forEach((tab) => {
      const el = document.getElementById(tab.id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(tab.id)
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

  // Auto-scroll the nav to keep active tab visible
  useEffect(() => {
    const btn = tabRefs.current.get(activeId)
    if (btn && navRef.current) {
      const nav = navRef.current
      const btnLeft = btn.offsetLeft
      const btnWidth = btn.offsetWidth
      const navWidth = nav.offsetWidth
      const scrollLeft = btnLeft - navWidth / 2 + btnWidth / 2
      nav.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeId])

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      // navbar height + sector nav height (~44px) + breathing room
      const navbarHeight = window.innerWidth >= 1024 ? 104 : window.innerWidth >= 640 ? 96 : 88
      const offset = navbarHeight + 52
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <div
      className="sticky top-[88px] z-20 border-b border-light-purple/30 bg-dark-bg/95 backdrop-blur-xl sm:top-[96px] lg:top-[104px]"
      role="tablist"
      aria-label="Menu sectors"
    >
      <div
        ref={navRef}
        className="mx-auto flex max-w-[1280px] gap-0 overflow-x-auto px-6 scrollbar-hide lg:px-8"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el)
            }}
            role="tab"
            aria-selected={activeId === tab.id}
            onClick={() => handleClick(tab.id)}
            className={`shrink-0 border-b-2 px-4 py-3 font-mono text-[11px] tracking-[0.15em] transition-colors duration-150 ${
              activeId === tab.id
                ? 'border-cosmic-orange text-cosmic-orange'
                : 'border-transparent text-muted-purple hover:text-mission-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
