'use client'

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  useMemo,
  type ReactNode,
} from 'react'
import React from 'react'

type SoundName = 'beep' | 'click' | 'slide' | 'launch'

interface SoundContextValue {
  play: (name: SoundName) => void
  isMuted: boolean
  toggleMute: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const STORAGE_KEY = 'bakeanaut-sound-muted'

// Module-level AudioContext (singleton — avoids ref-in-render lint issues)
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext()
    } catch {
      return null
    }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function getStoredMuted(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored !== 'false' // muted by default
  } catch {
    return true
  }
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function playSound(name: SoundName) {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  switch (name) {
    case 'beep': {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 880
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.12)
      break
    }
    case 'click': {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.value = 1200
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.05)
      break
    }
    case 'slide': {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.2)
      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.2)
      break
    }
    case 'launch': {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(300, now)
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.6)
      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.6)
      break
    }
  }
}

// Storage event subscription for useSyncExternalStore
const muteListeners = new Set<() => void>()
function subscribeMute(callback: () => void) {
  muteListeners.add(callback)
  return () => { muteListeners.delete(callback) }
}
function notifyMuteListeners() {
  muteListeners.forEach((cb) => cb())
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const isMuted = useSyncExternalStore(
    subscribeMute,
    () => getStoredMuted(),
    () => true // server snapshot — always muted
  )

  const play = useCallback(
    (name: SoundName) => {
      if (isMuted || getPrefersReducedMotion()) return
      playSound(name)
    },
    [isMuted]
  )

  const toggleMute = useCallback(() => {
    const next = !getStoredMuted()
    try {
      localStorage.setItem(STORAGE_KEY, String(next))
    } catch {
      // Ignore
    }
    // Create AudioContext on first unmute (user gesture)
    if (!next) getAudioContext()
    notifyMuteListeners()
  }, [])

  const value = useMemo(
    () => ({ play, isMuted, toggleMute }),
    [play, isMuted, toggleMute]
  )

  return React.createElement(
    SoundContext.Provider,
    { value },
    children
  )
}

export function useSound(): SoundContextValue {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}
