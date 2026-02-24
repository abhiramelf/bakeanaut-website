'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export type EasterEggType = 'konami' | 'launch' | null

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

function isInputFocused(): boolean {
  const el = document.activeElement
  if (!el) return false
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if ((el as HTMLElement).isContentEditable) return true
  return false
}

export function useEasterEggs(): EasterEggType {
  const [activeEgg, setActiveEgg] = useState<EasterEggType>(null)
  const konamiIndex = useRef(0)
  const keyBuffer = useRef<string[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearEgg = useCallback(() => {
    setActiveEgg(null)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInputFocused()) return
      if (activeEgg) return // Don't trigger while one is active

      // Konami code detection
      if (e.key === KONAMI_CODE[konamiIndex.current]) {
        konamiIndex.current++
        if (konamiIndex.current === KONAMI_CODE.length) {
          konamiIndex.current = 0
          keyBuffer.current = []
          setActiveEgg('konami')
          timerRef.current = setTimeout(clearEgg, 4000)
          return
        }
      } else {
        konamiIndex.current = 0
      }

      // "launch" typed detection
      keyBuffer.current.push(e.key.toLowerCase())
      if (keyBuffer.current.length > 20) {
        keyBuffer.current = keyBuffer.current.slice(-20)
      }
      const typed = keyBuffer.current.join('')
      if (typed.endsWith('launch')) {
        keyBuffer.current = []
        konamiIndex.current = 0
        setActiveEgg('launch')
        timerRef.current = setTimeout(clearEgg, 3000)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeEgg, clearEgg])

  return activeEgg
}
