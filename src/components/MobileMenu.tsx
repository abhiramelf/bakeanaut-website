'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { buildDirectOrderUrl } from '@/lib/whatsapp'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { href: '/menu', label: 'Menu', isRoute: true },
  { href: '/#about', label: 'About', isRoute: false },
  { href: '/#gallery', label: 'Gallery', isRoute: false },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleNavClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-dark-bg/80"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.2,
              ease: [0.25, 0, 0.25, 1],
            }}
            className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-light-purple bg-deep-space"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center text-muted-purple transition-colors hover:text-mission-white"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 2l14 14M16 2L2 16" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-1 px-6">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="border-b border-light-purple py-4 font-display text-lg font-700 uppercase tracking-widest text-mission-white transition-colors hover:text-cosmic-orange"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="border-b border-light-purple py-4 font-display text-lg font-700 uppercase tracking-widest text-mission-white transition-colors hover:text-cosmic-orange"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            <div className="p-6">
              <a
                href={buildDirectOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-cosmic-orange py-3 text-center font-display text-sm font-700 uppercase tracking-widest text-dark-bg transition-colors hover:brightness-110"
              >
                Order Now
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
