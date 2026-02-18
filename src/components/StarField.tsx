'use client'

// Mulberry32 PRNG — pure integer arithmetic, identical output on server & client
function mulberry32(seed: number): () => number {
  let s = seed | 0
  return () => {
    s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const STAR_COUNT = 150
const TWINKLE_CLASSES = [
  'animate-[twinkle1_2.8s_ease-in-out_infinite]',
  'animate-[twinkle2_3.7s_ease-in-out_infinite]',
  'animate-[twinkle3_4.3s_ease-in-out_infinite]',
  'animate-[twinkle4_5.9s_ease-in-out_infinite]',
]

// Round to 2 decimal places for hydration-safe strings
function r2(n: number): string {
  return (Math.round(n * 100) / 100).toString()
}

// Generate stars at module scope — deterministic, hydration-safe
const rand = mulberry32(42)
const stars = Array.from({ length: STAR_COUNT }, () => {
  const r1 = rand()
  const r2Val = rand()
  const r3 = rand()
  const r4 = rand()
  const r5 = rand()

  const size = r2(1 + r3 * 2)
  const opacity = r2(0.2 + r4 * 0.6)

  return {
    left: `${r2(r1 * 100)}%`,
    top: `${r2(r2Val * 100)}%`,
    size: `${size}px`,
    opacity,
    starOpacity: opacity,
    twinkleClass: TWINKLE_CLASSES[Math.floor(r5 * TWINKLE_CLASSES.length)],
    delay: `${r2(r5 * -10)}s`,
  }
})

export default function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Star points */}
      {stars.map((star, i) => (
        <div
          key={i}
          className={star.twinkleClass}
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            ['--star-opacity' as string]: star.starOpacity,
            opacity: star.opacity,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* Primary orange blob — large, top-right area */}
      <div
        className="absolute animate-[blobPulse1_12s_ease-in-out_infinite]"
        style={{
          width: '60vw',
          height: '60vw',
          top: '5%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(255, 138, 61, 0.18) 0%, rgba(255, 138, 61, 0.06) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary purple blob — center-left */}
      <div
        className="absolute animate-[blobPulse2_15s_ease-in-out_infinite]"
        style={{
          width: '50vw',
          height: '50vw',
          top: '20%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(100, 40, 160, 0.2) 0%, rgba(61, 21, 96, 0.08) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Warm accent blob — bottom center-right */}
      <div
        className="absolute animate-[blobPulse3_18s_ease-in-out_infinite]"
        style={{
          width: '45vw',
          height: '45vw',
          bottom: '-10%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(242, 196, 141, 0.12) 0%, rgba(255, 138, 61, 0.05) 40%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Deep purple blob — top-left */}
      <div
        className="absolute animate-[blobPulse4_20s_ease-in-out_infinite]"
        style={{
          width: '40vw',
          height: '40vw',
          top: '-5%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(61, 21, 96, 0.25) 0%, rgba(43, 15, 69, 0.08) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  )
}
