'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import TypewriterReveal from './TypewriterReveal'
import type { SiteContent } from '@/types/content'

const FRAME_COUNT = 6
const CYCLE_INTERVAL = 4000

const frameTall = [true, false, false, true, false, false]

function getInitialAssignment(): number[] {
  return [0, 1, 2, 3, 4, 5]
}

function getAvailableImages(currentAssignment: number[], totalImages: number): number[] {
  const inUse = new Set(currentAssignment)
  return Array.from({ length: totalImages }, (_, i) => i).filter((i) => !inUse.has(i))
}

interface GalleryProps {
  gallery: SiteContent['gallery']
}

export default function Gallery({ gallery }: GalleryProps) {
  const shouldReduceMotion = useReducedMotion()
  const allImages = gallery.images
  const [assignment, setAssignment] = useState<number[]>(getInitialAssignment)
  const lastSwappedFrame = useRef(-1)

  const cycleOneFrame = useCallback(() => {
    setAssignment((prev) => {
      const available = getAvailableImages(prev, allImages.length)
      if (available.length === 0) return prev

      let frameIdx: number
      do {
        frameIdx = Math.floor(Math.random() * FRAME_COUNT)
      } while (frameIdx === lastSwappedFrame.current && FRAME_COUNT > 1)
      lastSwappedFrame.current = frameIdx

      const newImageIdx = available[Math.floor(Math.random() * available.length)]

      const next = [...prev]
      next[frameIdx] = newImageIdx
      return next
    })
  }, [allImages.length])

  useEffect(() => {
    if (shouldReduceMotion) return
    const timer = setInterval(cycleOneFrame, CYCLE_INTERVAL)
    return () => clearInterval(timer)
  }, [cycleOneFrame, shouldReduceMotion])

  return (
    <section id="gallery" className="relative overflow-hidden bg-deep-space px-6 py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-light-purple/40 to-transparent" />

      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <div className="flex items-start justify-between">
            <div>
              <TypewriterReveal
                text={gallery.sectionLabel}
                as="p"
                className="font-mono text-xs tracking-[0.4em] text-cosmic-orange"
              />
              <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-glow-white md:text-6xl lg:text-7xl">
                {gallery.heading}
                <br />
                <span className="text-cosmic-orange">{gallery.headingHighlight}</span>
              </h2>
            </div>
            <div className="hidden font-mono text-xs text-muted-purple/50 md:block">
              <p>STATUS: DECLASSIFIED</p>
              <p>ENTRIES: {allImages.length}</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {Array.from({ length: FRAME_COUNT }).map((_, frameIdx) => {
            const tall = frameTall[frameIdx]
            const imageIdx = assignment[frameIdx]
            const img = allImages[imageIdx]
            if (!img) return null

            return (
              <ScrollReveal
                key={frameIdx}
                delay={frameIdx * 0.08}
                className={tall ? 'row-span-2' : ''}
              >
                <div
                  className={`group relative overflow-hidden border border-light-purple/30 transition-all duration-300 hover:border-cosmic-orange/40 ${tall ? 'aspect-[3/5]' : 'aspect-square'
                    }`}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={imageIdx}
                      initial={shouldReduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: [0.25, 0, 0.25, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute left-0 top-0 z-10 h-4 w-px bg-cosmic-orange/40" />
                  <div className="absolute left-0 top-0 z-10 h-px w-4 bg-cosmic-orange/40" />
                  <div className="absolute bottom-0 right-0 z-10 h-4 w-px bg-cosmic-orange/40" />
                  <div className="absolute bottom-0 right-0 z-10 h-px w-4 bg-cosmic-orange/40" />
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
