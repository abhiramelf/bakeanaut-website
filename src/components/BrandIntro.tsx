import ScrollReveal from './ScrollReveal'

const cards = [
  {
    number: '01',
    title: 'Not a bakery.',
    description: 'A space program for your taste buds. Every recipe is a mission. Every launch is an event.',
  },
  {
    number: '02',
    title: 'Not products.',
    description: 'Missions with codes, logs, and lore. Each item carries a story, a sector, and a purpose.',
  },
  {
    number: '03',
    title: 'Not customers.',
    description: 'Crew members who earn badges and rank up. You don\'t just order — you enlist and become part of something bigger.',
  },
]

export default function BrandIntro() {
  return (
    <section id="about" className="relative overflow-hidden bg-dark-bg px-6 py-28 md:py-36">
      {/* Decorative accent line top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cosmic-orange/30 to-transparent" />

      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-light-purple/50" />
            <p className="font-mono text-xs tracking-[0.4em] text-cosmic-orange">
              THE PROGRAM
            </p>
            <div className="h-px flex-1 bg-light-purple/50" />
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((card, i) => (
            <ScrollReveal key={card.number} delay={i * 0.15}>
              <div className="group relative border border-light-purple/60 bg-deep-space/50 p-8 transition-all duration-300 hover:border-cosmic-orange/50 hover:bg-light-purple/20 md:p-10">
                {/* Orange top accent */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-cosmic-orange" />

                {/* Large number watermark */}
                <span className="absolute right-4 top-2 font-display text-[80px] font-800 leading-none text-light-purple/20 transition-colors duration-300 group-hover:text-cosmic-orange/10">
                  {card.number}
                </span>

                <span className="relative font-mono text-[10px] tracking-[0.3em] text-muted-purple">
                  PROTOCOL {card.number}
                </span>
                <h3 className="relative mt-4 font-display text-2xl font-800 uppercase tracking-tight text-mission-white md:text-3xl">
                  {card.title}
                </h3>
                <p className="relative mt-3 font-body text-sm leading-relaxed text-muted-purple md:text-base">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-20 text-center">
            <div className="mx-auto mb-6 h-px w-16 bg-cosmic-orange/40" />
            <blockquote className="font-body text-xl italic leading-relaxed text-cookie-tan md:text-2xl lg:text-3xl">
              &ldquo;Every offering exists for a reason.
              <br />
              Every customer becomes crew.&rdquo;
            </blockquote>
            <div className="mx-auto mt-6 h-px w-16 bg-cosmic-orange/40" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
