declare global {
  interface Window {
    ma?: {
      trackEvent: (category: string, action: string, label?: string, value?: string) => void
    }
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: string) {
  if (typeof window !== 'undefined' && window.ma?.trackEvent) {
    window.ma.trackEvent(category, action, label, value)
  }
}
