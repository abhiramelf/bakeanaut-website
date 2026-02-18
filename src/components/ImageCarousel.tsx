'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'

interface ImageCarouselProps {
  images: string[]
  alt: string
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const dragging = useRef(false)

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length) return
      setCurrent(index)
    },
    [images.length]
  )

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
    dragging.current = false
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStart.current) return
    const dx = Math.abs(e.clientX - pointerStart.current.x)
    const dy = Math.abs(e.clientY - pointerStart.current.y)
    if (dx > 10 && dx > dy) {
      dragging.current = true
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStart.current) return
    const deltaX = e.clientX - pointerStart.current.x
    pointerStart.current = null
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) next()
      else prev()
    }
    dragging.current = false
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    }
  }

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-light-purple/20 bg-dark-bg">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-purple">
            <rect x="3" y="3" width="18" height="18" rx="0" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-purple">{alt}</span>
        </div>
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-light-purple/20 bg-dark-bg">
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${alt} images`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="group relative aspect-[4/3] w-full overflow-hidden border border-light-purple/20 bg-dark-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmic-orange"
    >
      {/* Slides */}
      <div
        className={`flex h-full ${shouldReduceMotion ? '' : 'transition-transform duration-200 ease-out'}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          pointerStart.current = null
          dragging.current = false
        }}
      >
        {images.map((src, i) => (
          <div key={i} className="relative h-full w-full shrink-0">
            <Image
              src={src}
              alt={`${alt} - image ${i + 1}`}
              fill
              className="pointer-events-none object-cover"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Previous button */}
      {current > 0 && (
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center border border-light-purple/40 bg-dark-bg/80 text-mission-white opacity-0 transition-opacity duration-150 hover:border-cosmic-orange hover:text-cosmic-orange group-hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 2L4 7l5 5" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {current < images.length - 1 && (
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center border border-light-purple/40 bg-dark-bg/80 text-mission-white opacity-0 transition-opacity duration-150 hover:border-cosmic-orange hover:text-cosmic-orange group-hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 2l5 5-5 5" />
          </svg>
        </button>
      )}

      {/* Dot indicators (square, brutalist) */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Image indicators">
        {images.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 w-2 transition-colors duration-150 ${
              i === current ? 'bg-cosmic-orange' : 'bg-light-purple/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
