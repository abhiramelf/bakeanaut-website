import ScrollReveal from './ScrollReveal'

interface Review {
  name: string
  text: string
  rating: 5
  tag?: string
}

const reviews: Review[] = [
  {
    name: 'Al Ameen Mohammed Hussain',
    text: 'Visited to get a butter cake for my wife\'s birthday, and the quality was beyond my expectations. The sweetness was perfectly balanced — not too sugary. You can feel the personal touch in their baking. Must try!',
    rating: 5,
    tag: 'LOCAL GUIDE',
  },
  {
    name: 'Mohammadyahya Mansuri',
    text: 'A must-visit for anyone who loves fresh, delicious pastries. From buttery croissants to decadent chocolate chip cookies, everything is made with care and high-quality ingredients. Their cakes are simply divine.',
    rating: 5,
    tag: 'LOCAL GUIDE',
  },
  {
    name: 'Sneha Saha',
    text: 'One stop destination for gorgeous looking and incredibly delicious cakes. Highly recommend these for every occasion!',
    rating: 5,
  },
  {
    name: 'Deepa',
    text: 'Treats have been consistently amazing! Fresh, flavorful, and incredibly tasty. A true delight! Definitely a must-try!',
    rating: 5,
  },
  {
    name: 'Sruthi R',
    text: 'The cakes over here are so awesome and freshly baked — super healthy too! Loved the taste!',
    rating: 5,
  },
  {
    name: 'Rachna Goel',
    text: 'Had jowar, oats brownie, modak and other delicacies. All are superb. No palm oil, no preservatives, no maida. Totally healthy and tasty options. Go for it without a second thought.',
    rating: 5,
  },
  {
    name: 'Sujitha Thangavelu',
    text: 'I have bought brownie from Bakeanaut. It was very tasty.',
    rating: 5,
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="var(--cosmic-orange)"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ color: 'var(--muted-purple)' }}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="currentColor"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="currentColor"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="currentColor"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function CrewTransmissions() {
  return (
    <section className="relative overflow-hidden bg-dark-bg px-6 py-28 md:py-36">
      {/* Accent line top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cosmic-orange/30 to-transparent" />

      <div className="mx-auto max-w-[1280px]">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-light-purple/50" />
            <p className="font-mono text-xs tracking-[0.4em] text-cosmic-orange">
              CREW TRANSMISSIONS
            </p>
            <div className="h-px flex-1 bg-light-purple/50" />
          </div>
        </ScrollReveal>

        {/* Overall rating bar */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
            {/* Stars + score */}
            <div className="flex items-center gap-3">
              <span className="font-display text-5xl font-800 text-mission-white">
                5.0
              </span>
              <div className="flex flex-col gap-1">
                <Stars />
                <span className="font-mono text-[10px] tracking-[0.15em] text-muted-purple">
                  7 CREW REPORTS
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="hidden h-10 w-px bg-light-purple/40 sm:block" />

            {/* Google badge */}
            <div className="flex items-center gap-2">
              <GoogleIcon />
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-purple">
                VERIFIED ON GOOGLE
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Reviews grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured review — spans 2 cols on desktop */}
          <ScrollReveal delay={0.15} className="lg:col-span-2">
            <div className="group relative h-full border border-light-purple/60 bg-deep-space/50 p-7 transition-all duration-300 hover:border-cosmic-orange/40 hover:bg-light-purple/20 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-cosmic-orange" />
              <div className="mb-4 flex items-center justify-between">
                <Stars />
                {reviews[0].tag && (
                  <span className="font-mono text-[9px] tracking-[0.2em] text-cosmic-orange/60">
                    {reviews[0].tag}
                  </span>
                )}
              </div>
              <blockquote className="font-body text-base leading-relaxed text-mission-white/90 sm:text-lg">
                &ldquo;{reviews[0].text}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center bg-cosmic-orange font-display text-sm font-700 text-dark-bg">
                  {reviews[0].name[0]}
                </div>
                <div>
                  <p className="font-display text-sm font-600 uppercase tracking-wide text-mission-white">
                    {reviews[0].name}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Second featured review */}
          <ScrollReveal delay={0.25}>
            <div className="group relative h-full border border-light-purple/60 bg-deep-space/50 p-7 transition-all duration-300 hover:border-cosmic-orange/40 hover:bg-light-purple/20 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-cosmic-orange" />
              <div className="mb-4 flex items-center justify-between">
                <Stars />
                {reviews[5].tag && (
                  <span className="font-mono text-[9px] tracking-[0.2em] text-cosmic-orange/60">
                    {reviews[5].tag}
                  </span>
                )}
              </div>
              <blockquote className="font-body text-sm leading-relaxed text-mission-white/90">
                &ldquo;{reviews[5].text}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center bg-cosmic-orange font-display text-sm font-700 text-dark-bg">
                  {reviews[5].name[0]}
                </div>
                <p className="font-display text-sm font-600 uppercase tracking-wide text-mission-white">
                  {reviews[5].name}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Remaining reviews — standard cards */}
          {[1, 2, 3, 4].map((idx, i) => (
            <ScrollReveal key={reviews[idx].name} delay={0.3 + i * 0.1}>
              <div className="group relative h-full border border-light-purple/40 bg-deep-space/30 p-6 transition-all duration-300 hover:border-cosmic-orange/30 hover:bg-light-purple/15">
                <div className="mb-3 flex items-center justify-between">
                  <Stars />
                  {reviews[idx].tag && (
                    <span className="font-mono text-[9px] tracking-[0.2em] text-cosmic-orange/60">
                      {reviews[idx].tag}
                    </span>
                  )}
                </div>
                <blockquote className="font-body text-sm leading-relaxed text-mission-white/80">
                  &ldquo;{reviews[idx].text}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center bg-light-purple font-display text-xs font-700 text-cookie-tan">
                    {reviews[idx].name[0]}
                  </div>
                  <p className="font-display text-xs font-600 uppercase tracking-wide text-muted-purple">
                    {reviews[idx].name}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Last review + CTA combo */}
          <ScrollReveal delay={0.7}>
            <div className="group relative h-full border border-light-purple/40 bg-deep-space/30 p-6 transition-all duration-300 hover:border-cosmic-orange/30 hover:bg-light-purple/15">
              <div className="mb-3">
                <Stars />
              </div>
              <blockquote className="font-body text-sm leading-relaxed text-mission-white/80">
                &ldquo;{reviews[6].text}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center bg-light-purple font-display text-xs font-700 text-cookie-tan">
                  {reviews[6].name[0]}
                </div>
                <p className="font-display text-xs font-600 uppercase tracking-wide text-muted-purple">
                  {reviews[6].name}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <a
              href="https://maps.app.goo.gl/LCLYbiTDUeq5VU7n8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-light-purple/50 px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-muted-purple transition-all duration-200 hover:border-cosmic-orange/50 hover:text-cookie-tan"
            >
              <GoogleIcon />
              VIEW ALL REPORTS ON GOOGLE
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
