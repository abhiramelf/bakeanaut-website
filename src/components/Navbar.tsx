'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { buildSmartOrderUrl } from '@/lib/whatsapp'
import MobileMenu from './MobileMenu'
import CartDrawer from './CartDrawer'
import StickyCartBar from './StickyCartBar'

const navLinks = [
  { href: '/menu', label: 'Menu', id: 'menu', isRoute: true },
  { href: '/#about', label: 'About', id: 'about', isRoute: false },
  { href: '/#gallery', label: 'Gallery', id: 'gallery', isRoute: false },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems, items, addCount } = useCart()
  const cartButtonRef = useRef<HTMLButtonElement>(null)
  const activeSection = useScrollSpy(['hero', 'about', 'gallery', 'menu'])
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (addCount === 0 || shouldReduceMotion) return
    const btn = cartButtonRef.current
    if (!btn) return
    const ripple = document.createElement('span')
    ripple.className = 'cart-ripple'
    btn.appendChild(ripple)
    const timeout = setTimeout(() => {
      ripple.remove()
    }, 700)
    return () => {
      clearTimeout(timeout)
      ripple.remove()
    }
  }, [addCount, shouldReduceMotion])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'border-b border-light-purple/40 bg-dark-bg/95 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="mx-auto flex max-w-[1280px] items-center px-6 py-4 lg:px-8"
        >
          {/* Logo — left */}
          <Link href="/" aria-label="Bakeanaut - back to home" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Bakeanaut"
              width={240}
              height={80}
              priority
              className="h-14 w-auto sm:h-16 lg:h-[72px]"
            />
          </Link>

          {/* Desktop nav links — absolutely centered in the nav bar */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="flex items-center gap-10">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-mono text-sm tracking-[0.15em] uppercase transition-colors duration-200 ${
                      activeSection === link.id
                        ? 'text-cosmic-orange'
                        : 'text-muted-purple hover:text-mission-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`font-mono text-sm tracking-[0.15em] uppercase transition-colors duration-200 ${
                      activeSection === link.id
                        ? 'text-cosmic-orange'
                        : 'text-muted-purple hover:text-mission-white'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-5 md:ml-0">
            {/* Cart button */}
            <button
              ref={cartButtonRef}
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center text-mission-white transition-colors hover:text-cosmic-orange"
              aria-label={`Cart - ${totalItems} items`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-cosmic-orange font-mono text-[10px] font-700 text-dark-bg"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Desktop CTA */}
            <a
              href={buildSmartOrderUrl(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden bg-cosmic-orange px-6 py-2.5 font-display text-sm font-700 uppercase tracking-widest text-dark-bg transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,138,61,0.4)] hover:brightness-110 md:block"
            >
              Order Now
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Open menu"
            >
              <span className="h-0.5 w-6 bg-mission-white" />
              <span className="h-0.5 w-6 bg-mission-white" />
              <span className="h-0.5 w-4 bg-cosmic-orange self-end" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <CartDrawer isOpen={cartOpen} onClose={closeCart} />
      <StickyCartBar onOpenCart={openCart} />
    </>
  )
}
