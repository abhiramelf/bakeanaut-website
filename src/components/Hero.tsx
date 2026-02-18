'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import StarField from './StarField'
import { buildSmartOrderUrl } from '@/lib/whatsapp'
import { useCart } from '@/hooks/useCart'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const tickerItems = [
  'SECTOR I: ONLINE',
  'SECTOR II: ONLINE',
  'SECTOR III: ONLINE',
  '7 ACTIVE SECTORS',
  'CREW CLEARANCE: OPEN',
  'PAYLOAD CAPACITY: LIMITED',
  'BASE: TRIVANDRUM',
  'STATUS: OPERATIONAL',
]

function TickerContent() {
  return (
    <>
      {tickerItems.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-8 px-8">
          <span className="text-xs tracking-[0.2em] text-cookie-tan sm:text-sm">
            {item}
          </span>
          <span className="text-cosmic-orange/50" aria-hidden="true">
            //
          </span>
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const { items } = useCart()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const starFieldY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 120])
  const stampsY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 60])

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
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-deep-space px-6 py-24 lg:px-8"
    >
      <motion.div style={{ y: starFieldY }} className="absolute inset-0">
        <StarField />
      </motion.div>

      {/* Stamps — scattered across the hero background */}
      <motion.div className="stamp right-4 top-20 lg:right-8 lg:top-24" style={{ y: stampsY, rotate: -12 }}>CLASSIFIED</motion.div>
      <motion.div className="stamp left-[5%] top-[38%] hidden lg:block" style={{ y: stampsY, rotate: 6 }}>TOP SECRET</motion.div>
      <motion.div className="stamp right-[15%] top-[55%] hidden lg:block" style={{ y: stampsY, rotate: -4 }}>FRAGILE</motion.div>
      <motion.div className="stamp-solid left-[12%] bottom-[22%] hidden xl:block" style={{ y: stampsY, rotate: -8 }}>HANDLE WITH CARE</motion.div>
      <motion.div className="stamp-solid right-[30%] top-[30%] hidden xl:block" style={{ y: stampsY, rotate: 10 }}>CLEARANCE GRANTED</motion.div>
      <motion.div className="stamp left-[45%] top-[20%] hidden 2xl:block" style={{ y: stampsY, rotate: 3 }}>DO NOT OPEN</motion.div>

      {/* Mission ticker */}
      <motion.div
        variants={slideUp(0.1)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-12 w-screen -ml-6 lg:-ml-8 overflow-hidden border-y border-cosmic-orange/20 bg-light-purple/20 backdrop-blur-sm"
        aria-label="Mission status ticker"
      >
        <div
          className="ticker-track font-mono py-4"
          style={shouldReduceMotion ? { animation: 'none' } : undefined}
        >
          <TickerContent />
          <TickerContent />
          <TickerContent />
          <TickerContent />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px]">
        {/* Headline — left-aligned, massive, with second line indented */}
        <motion.h1
          variants={slideUp(0.2)}
          initial="hidden"
          animate="visible"
          className="font-display font-extrabold uppercase leading-[0.85] tracking-tighter text-glow-white"
        >
          <span className="block text-[clamp(2.5rem,min(10vw,8vh),6.6rem)]">
            EDIBLE
          </span>
          <span className="block text-[clamp(2.5rem,min(10vw,8vh),6.6rem)] sm:pl-[8vw] lg:pl-[12vw]">
            MISSIONS.
          </span>
          <span className="block text-[clamp(2.5rem,min(10vw,8vh),6.6rem)]">
            CLEARED FOR
          </span>
          <span className="block text-[clamp(2.5rem,min(10vw,8vh),6.6rem)] sm:pl-[8vw] lg:pl-[12vw] text-cosmic-orange text-glow-orange">
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
          <div className="flex items-center gap-[clamp(0.75rem,1.5vw,1.25rem)]">
            <Link
              href="/menu"
              className="border-2 border-mission-white px-[clamp(1.5rem,3vw,2.5rem)] py-[clamp(0.75rem,1.2vh,1rem)] font-display text-[clamp(0.65rem,1.2vw,0.875rem)] font-bold uppercase tracking-[0.15em] text-mission-white transition-all duration-200 hover:border-cosmic-orange hover:text-cosmic-orange"
            >
              Browse Missions
            </Link>
            <a
              href={buildSmartOrderUrl(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cosmic-orange px-[clamp(1.5rem,3vw,2.5rem)] py-[clamp(0.75rem,1.2vh,1rem)] font-display text-[clamp(0.65rem,1.2vw,0.875rem)] font-bold uppercase tracking-[0.15em] text-dark-bg transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,138,61,0.4)] hover:brightness-110"
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
