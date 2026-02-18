'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[40vh] flex-col items-center justify-center bg-dark-bg px-6 py-20 text-center">
            <div className="h-px w-16 bg-cosmic-orange/50" />
            <p className="mt-6 font-mono text-xs tracking-[0.3em] text-cosmic-orange">
              SYSTEM MALFUNCTION
            </p>
            <p className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight text-mission-white">
              Something went wrong
            </p>
            <p className="mt-3 max-w-sm font-body text-sm text-muted-purple">
              Mission data failed to load. Try refreshing the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-8 border border-cosmic-orange/50 bg-cosmic-orange/10 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-cosmic-orange transition-all hover:bg-cosmic-orange hover:text-dark-bg"
            >
              Retry
            </button>
            <div className="mt-6 h-px w-16 bg-cosmic-orange/50" />
          </div>
        )
      )
    }

    return this.props.children
  }
}
