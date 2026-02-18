import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative border-t border-light-purple/30 bg-dark-bg px-6 py-20">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cosmic-orange/30 to-transparent" />

      <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Image
            src="/images/logo.png"
            alt="Bakeanaut"
            width={180}
            height={72}
            className="mb-6 h-14 w-auto"
          />
          <p className="font-mono text-xs tracking-[0.2em] text-muted-purple/60">
            Edible Missions. Cleared for Launch.
          </p>
          <div className="mt-4 h-px w-16 bg-cosmic-orange/30" />
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm text-muted-purple">
          <p className="font-mono text-xs font-700 tracking-[0.2em] text-cosmic-orange">
            HQ COORDINATES
          </p>
          <p className="text-muted-purple/80">Near Manacaud P.O., Thiruvananthapuram, 695009</p>
          <div className="space-y-1 pt-3">
            <p className="font-mono text-xs font-700 tracking-[0.2em] text-mission-white/60">OPERATIONAL HOURS</p>
            <p className="text-muted-purple/80">Mon–Thu: 11AM–9PM</p>
            <p className="text-muted-purple/80">Fri–Sat: 11AM–10PM</p>
            <p className="text-muted-purple/80">Sun: 12PM–8PM</p>
          </div>
          <div className="flex flex-col gap-2 pt-3">
            <a
              href="tel:+919916699631"
              className="text-muted-purple/80 transition-colors hover:text-cosmic-orange"
            >
              +91 9916699631
            </a>
            <a
              href="https://instagram.com/bakeanaut_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-purple/80 transition-colors hover:text-cosmic-orange"
            >
              @bakeanaut_
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="space-y-3 text-sm">
          <p className="font-mono text-xs font-700 tracking-[0.2em] text-cosmic-orange">
            LEGAL
          </p>
          <div className="flex flex-col gap-2.5">
            <a href="#" className="text-muted-purple/80 transition-colors hover:text-cosmic-orange">
              Terms
            </a>
            <a href="#" className="text-muted-purple/80 transition-colors hover:text-cosmic-orange">
              Privacy
            </a>
            <a href="#" className="text-muted-purple/80 transition-colors hover:text-cosmic-orange">
              Return &amp; Refund
            </a>
            <a href="#" className="text-muted-purple/80 transition-colors hover:text-cosmic-orange">
              Shipping
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1280px] border-t border-light-purple/20 pt-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-cosmic-orange/30" />
          <p className="font-mono text-center text-[11px] tracking-[0.3em] text-muted-purple/40">
            EDIBLE MISSIONS. CLEARED FOR LAUNCH.
          </p>
        </div>
      </div>
    </footer>
  )
}
