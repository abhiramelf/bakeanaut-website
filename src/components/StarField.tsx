'use client'

export default function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
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
