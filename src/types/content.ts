export interface SiteContent {
  _version: number
  _updatedAt: string

  meta: {
    siteTitle: string
    siteDescription: string
    canonicalUrl: string
  }

  contact: {
    whatsappPhone: string
    address: {
      street: string
      city: string
      postalCode: string
    }
    hours: string[]
    phone: string
    instagram: {
      handle: string
      url: string
    }
    googleMapsUrl: string
  }

  hero: {
    headline: string[]
    highlightLineIndex: number
    subheadline: string
    ctaPrimaryLabel: string
    ctaSecondaryLabel: string
    tickerItems: string[]
  }

  brandIntro: {
    sectionLabel: string
    cards: {
      number: string
      title: string
      description: string
    }[]
    quote: string[]
  }

  gallery: {
    sectionLabel: string
    heading: string
    headingHighlight: string
    images: {
      url: string
      alt: string
    }[]
  }

  crewTransmissions: {
    sectionLabel: string
    overallRating: string
    reportCount: string
    reviews: {
      name: string
      text: string
      rating: number
      tag?: string
    }[]
    googleReviewUrl: string
  }

  featuredMissions: {
    sectionLabel: string
    heading: string
    headingHighlight: string
    subtext: string
    ctaLabel: string
  }

  crewProgram: {
    sectionLabel: string
    headingLines: string[]
    headingHighlight: string
    description: string
    ranks: {
      rank: string
      ordinal: string
      requirement: string
      perks: string[]
    }[]
    quote: string
    quoteAttribution: string
    ctaPrimaryLabel: string
    ctaSecondaryLabel: string
  }

  menu: {
    sectionLabel: string
    heading: string
    subtext: string
    pageHeading: string
    pageSubtext: string
    tickerItems: string[]
  }

  footer: {
    tagline: string
    closingLine: string
  }

  loadingScreen: {
    systemChecks: string[]
  }
}

export interface MenuData {
  sectors: import('@/types').Sector[]
  specialPayloads: import('@/types').Sector
  bundles: import('@/types').Bundle[]
  featuredItemIds: string[]
}
