'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import type { SiteContent } from '@/types/content'

interface BrandIntroProps {
  brandIntro: SiteContent['brandIntro']
}

function QuoteReveal({ quote }: { quote: string[] }) {
  const shouldReduceMotion = useReducedMotion()

  const quoteLine1 = (quote[0] || '').split(' ')
  const quoteLine2 = (quote[1] || '').split(' ')
  const allWords = [...quoteLine1, '\n', ...quoteLine2]

  if (shouldReduceMotion) {
    return (
      <div className="mt-20 text-center">
        <div className="mx-auto mb-6 h-px w-16 bg-cosmic-orange/40" />
        <blockquote className="font-body text-xl italic leading-relaxed text-cookie-tan md:text-2xl lg:text-3xl">
          &ldquo;{quote[0]}
          <br />
          {quote[1]}&rdquo;
        </blockquote>
        <div className="mx-auto mt-6 h-px w-16 bg-cosmic-orange/40" />
      </div>
    )
  }

  return (
    <motion.div
      className="mt-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
      }}
    >
      <motion.div
        className="mx-auto mb-6 h-px w-16 bg-cosmic-orange/40"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.6, ease: 'easeOut' } },
        }}
        style={{ originX: 0.5 }}
      />

      <blockquote className="font-body text-xl italic leading-relaxed text-cookie-tan md:text-2xl lg:text-3xl">
        <span aria-label={quote.join(' ')}>&ldquo;</span>
        {allWords.map((word, i) => {
          if (word === '\n') return <br key={i} />
          const isLast = i === allWords.length - 1
          return (
            <motion.span
              key={i}
              aria-hidden="true"
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
              }}
            >
              {word}{isLast ? '' : '\u00A0'}
            </motion.span>
          )
        })}
        <motion.span
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.3 } },
          }}
        >
          &rdquo;
        </motion.span>
      </blockquote>

      <motion.div
        className="mx-auto mt-6 h-px w-16 bg-cosmic-orange/40"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.6, ease: 'easeOut' } },
        }}
        style={{ originX: 0.5 }}
      />
    </motion.div>
  )
}

export default function BrandIntro({ brandIntro }: BrandIntroProps) {
  return (
    <section id="about" className="relative overflow-hidden bg-dark-bg px-6 py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cosmic-orange/30 to-transparent" />
      <div className="stamp-solid right-12 top-20 hidden lg:block" style={{ transform: 'rotate(7deg)' }}>DECLASSIFIED</div>

      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-light-purple/50" />
            <p className="font-mono text-xs tracking-[0.4em] text-cosmic-orange">
              {brandIntro.sectionLabel}
            </p>
            <div className="h-px flex-1 bg-light-purple/50" />
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {brandIntro.cards.map((card, i) => (
            <ScrollReveal key={card.number} delay={i * 0.15}>
              <div className="group relative border border-light-purple/60 bg-deep-space/50 p-8 transition-all duration-300 hover:border-cosmic-orange/50 hover:bg-light-purple/20 md:p-10">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-cosmic-orange" />
                <span className="absolute right-4 top-2 font-display text-[80px] font-extrabold leading-none text-light-purple/20 transition-colors duration-300 group-hover:text-cosmic-orange/10">
                  {card.number}
                </span>
                <span className="relative font-mono text-[10px] tracking-[0.3em] text-muted-purple">
                  PROTOCOL {card.number}
                </span>
                <h3 className="relative mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-mission-white md:text-3xl">
                  {card.title}
                </h3>
                <p className="relative mt-3 font-body text-sm leading-relaxed text-muted-purple md:text-base">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <QuoteReveal quote={brandIntro.quote} />
      </div>
    </section>
  )
}
