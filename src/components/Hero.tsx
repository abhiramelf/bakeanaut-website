'use client'

import { motion, useReducedMotion } from 'framer-motion'
import StarField from './StarField'
import { buildDirectOrderUrl } from '@/lib/whatsapp'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const slideUp = (delay: number) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: easeOut,
      },
    },
  })

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-deep-space px-6 py-24 lg:px-8"
    >
      <StarField />

      {/* Stamps */}
      <div className="stamp right-8 top-28 hidden lg:block">CLASSIFIED</div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px]">
        {/* Headline — left-aligned, massive, with second line indented */}
        <motion.h1
          variants={slideUp(0.2)}
          initial="hidden"
          animate="visible"
          className="font-display font-800 uppercase leading-[0.85] tracking-tighter text-glow-white"
        >
          <span className="block text-[clamp(3rem,12vw,10rem)]">
            EDIBLE
          </span>
          <span className="block text-[clamp(3rem,12vw,10rem)] pl-[12vw]">
            MISSIONS.
          </span>
          <span className="block text-[clamp(3rem,12vw,10rem)]">
            CLEARED FOR
          </span>
          <span className="block text-[clamp(3rem,12vw,10rem)] pl-[12vw] text-cosmic-orange text-glow-orange">
            LAUNCH.
          </span>
        </motion.h1>

        {/* Bottom row: subtext left, CTAs right — like the inspo */}
        <motion.div
          variants={slideUp(0.6)}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          {/* Subtext */}
          <p className="max-w-sm font-body text-base text-muted-purple sm:text-lg">
            An experiential brand built around
            <br />
            indulgent, dessert-forward missions.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <a
              href="#menu"
              className="border-2 border-mission-white px-8 py-3.5 font-display text-xs font-700 uppercase tracking-[0.15em] text-mission-white transition-all duration-200 hover:border-cosmic-orange hover:text-cosmic-orange sm:px-10 sm:py-4 sm:text-sm"
            >
              Browse Missions
            </a>
            <a
              href={buildDirectOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cosmic-orange px-8 py-3.5 font-display text-xs font-700 uppercase tracking-[0.15em] text-dark-bg transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,138,61,0.4)] hover:brightness-110 sm:px-10 sm:py-4 sm:text-sm"
            >
              Order on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — bottom right */}
      <motion.div
        variants={slideUp(1.0)}
        initial="hidden"
        animate="visible"
        className="absolute bottom-6 right-8 hidden lg:block"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          className="text-muted-purple/50"
        >
          <svg width="18" height="32" viewBox="0 0 18 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 4v24M3 22l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
