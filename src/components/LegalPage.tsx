import Link from 'next/link'

interface LegalPageProps {
  title: string
  children: React.ReactNode
}

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-deep-space px-6 pb-24 pt-12 md:px-12">
      <div className="mx-auto max-w-[800px]">
        {/* Back navigation */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted-purple transition-colors hover:text-cosmic-orange"
        >
          <span aria-hidden="true">&larr;</span>
          <span>RETURN TO BASE</span>
        </Link>

        {/* Page title */}
        <h1 className="mb-4 font-display text-4xl font-extrabold uppercase tracking-tight text-mission-white md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Accent line */}
        <div className="mb-12 h-px w-24 bg-cosmic-orange" />

        {/* Content */}
        <article className="legal-content space-y-6 text-sm leading-relaxed text-muted-purple/90 md:text-base md:leading-relaxed [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-mission-white md:[&_h2]:text-2xl [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-cookie-tan [&_li]:pl-2 [&_li]:text-muted-purple/80 [&_p]:text-muted-purple/80 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_a]:text-cosmic-orange [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-cookie-tan">
          {children}
        </article>

        {/* Footer accent */}
        <div className="mt-16 border-t border-light-purple/20 pt-8">
          <p className="font-mono text-[11px] tracking-[0.3em] text-muted-purple/40">
            BAKEANAUT LEGAL // DOCUMENT END
          </p>
        </div>
      </div>
    </main>
  )
}
