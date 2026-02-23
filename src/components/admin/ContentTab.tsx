'use client'

import { useEffect, useState, useCallback } from 'react'
import type { SiteContent } from '@/types/content'
import DynamicList from '@/components/admin/DynamicList'
import Toast from '@/components/admin/Toast'

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="border-t border-gray-200 px-5 py-5">{children}</div>}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      )}
    </div>
  )
}

export default function ContentTab() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then(setContent)
      .finally(() => setLoading(false))
  }, [])

  const update = useCallback(
    <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
      setContent((prev) => (prev ? { ...prev, [key]: value } : prev))
    },
    []
  )

  async function save() {
    if (!content) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error('Failed to save')
      setToast({ message: 'Content saved', type: 'success' })
    } catch {
      setToast({ message: 'Failed to save content', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  if (loading || !content) {
    return <div className="py-12 text-center text-gray-400">Loading content...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Content Editor</h1>
          <p className="mt-1 text-sm text-gray-500">Edit site copy across all sections</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <Section title="Meta / SEO">
          <div className="space-y-4">
            <Field label="Site Title" value={content.meta.siteTitle} onChange={(v) => update('meta', { ...content.meta, siteTitle: v })} />
            <Field label="Site Description" value={content.meta.siteDescription} onChange={(v) => update('meta', { ...content.meta, siteDescription: v })} multiline />
            <Field label="Canonical URL" value={content.meta.canonicalUrl} onChange={(v) => update('meta', { ...content.meta, canonicalUrl: v })} />
          </div>
        </Section>

        <Section title="Contact Info">
          <div className="space-y-4">
            <Field label="WhatsApp Phone (no +)" value={content.contact.whatsappPhone} onChange={(v) => update('contact', { ...content.contact, whatsappPhone: v })} />
            <Field label="Display Phone" value={content.contact.phone} onChange={(v) => update('contact', { ...content.contact, phone: v })} />
            <Field label="Street Address" value={content.contact.address.street} onChange={(v) => update('contact', { ...content.contact, address: { ...content.contact.address, street: v } })} />
            <Field label="City" value={content.contact.address.city} onChange={(v) => update('contact', { ...content.contact, address: { ...content.contact.address, city: v } })} />
            <Field label="Postal Code" value={content.contact.address.postalCode} onChange={(v) => update('contact', { ...content.contact, address: { ...content.contact.address, postalCode: v } })} />
            <DynamicList label="Operational Hours" items={content.contact.hours} onChange={(v) => update('contact', { ...content.contact, hours: v })} placeholder="e.g. Mon–Thu: 11AM–9PM" />
            <Field label="Instagram Handle" value={content.contact.instagram.handle} onChange={(v) => update('contact', { ...content.contact, instagram: { ...content.contact.instagram, handle: v } })} />
            <Field label="Instagram URL" value={content.contact.instagram.url} onChange={(v) => update('contact', { ...content.contact, instagram: { ...content.contact.instagram, url: v } })} />
            <Field label="Google Maps URL" value={content.contact.googleMapsUrl} onChange={(v) => update('contact', { ...content.contact, googleMapsUrl: v })} />
          </div>
        </Section>

        <Section title="Hero Section" defaultOpen>
          <div className="space-y-4">
            <DynamicList label="Headline Lines" items={content.hero.headline} onChange={(v) => update('hero', { ...content.hero, headline: v })} placeholder="e.g. EDIBLE" />
            <div>
              <label className="block text-sm font-medium text-gray-700">Highlight Line Index (0-based, which line gets orange color)</label>
              <input
                type="number"
                min={0}
                max={content.hero.headline.length - 1}
                value={content.hero.highlightLineIndex}
                onChange={(e) => update('hero', { ...content.hero, highlightLineIndex: parseInt(e.target.value) || 0 })}
                className="mt-1 w-24 border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <Field label="Subheadline" value={content.hero.subheadline} onChange={(v) => update('hero', { ...content.hero, subheadline: v })} multiline />
            <Field label="Primary CTA Label" value={content.hero.ctaPrimaryLabel} onChange={(v) => update('hero', { ...content.hero, ctaPrimaryLabel: v })} />
            <Field label="Secondary CTA Label" value={content.hero.ctaSecondaryLabel} onChange={(v) => update('hero', { ...content.hero, ctaSecondaryLabel: v })} />
            <DynamicList label="Ticker Items" items={content.hero.tickerItems} onChange={(v) => update('hero', { ...content.hero, tickerItems: v })} placeholder="e.g. SECTOR I: ONLINE" />
          </div>
        </Section>

        <Section title="Brand Intro (The Program)">
          <div className="space-y-4">
            <Field label="Section Label" value={content.brandIntro.sectionLabel} onChange={(v) => update('brandIntro', { ...content.brandIntro, sectionLabel: v })} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cards</label>
              {content.brandIntro.cards.map((card, i) => (
                <div key={i} className="mb-4 border border-gray-200 p-4">
                  <div className="space-y-3">
                    <Field label={`Card ${i + 1} Number`} value={card.number} onChange={(v) => {
                      const cards = [...content.brandIntro.cards]
                      cards[i] = { ...cards[i], number: v }
                      update('brandIntro', { ...content.brandIntro, cards })
                    }} />
                    <Field label={`Card ${i + 1} Title`} value={card.title} onChange={(v) => {
                      const cards = [...content.brandIntro.cards]
                      cards[i] = { ...cards[i], title: v }
                      update('brandIntro', { ...content.brandIntro, cards })
                    }} />
                    <Field label={`Card ${i + 1} Description`} value={card.description} onChange={(v) => {
                      const cards = [...content.brandIntro.cards]
                      cards[i] = { ...cards[i], description: v }
                      update('brandIntro', { ...content.brandIntro, cards })
                    }} multiline />
                  </div>
                </div>
              ))}
            </div>
            <DynamicList label="Quote Lines" items={content.brandIntro.quote} onChange={(v) => update('brandIntro', { ...content.brandIntro, quote: v })} />
          </div>
        </Section>

        <Section title="Featured Missions">
          <div className="space-y-4">
            <Field label="Section Label" value={content.featuredMissions.sectionLabel} onChange={(v) => update('featuredMissions', { ...content.featuredMissions, sectionLabel: v })} />
            <Field label="Heading" value={content.featuredMissions.heading} onChange={(v) => update('featuredMissions', { ...content.featuredMissions, heading: v })} />
            <Field label="Heading Highlight" value={content.featuredMissions.headingHighlight} onChange={(v) => update('featuredMissions', { ...content.featuredMissions, headingHighlight: v })} />
            <Field label="Subtext" value={content.featuredMissions.subtext} onChange={(v) => update('featuredMissions', { ...content.featuredMissions, subtext: v })} />
            <Field label="CTA Label" value={content.featuredMissions.ctaLabel} onChange={(v) => update('featuredMissions', { ...content.featuredMissions, ctaLabel: v })} />
          </div>
        </Section>

        <Section title="Crew Program">
          <div className="space-y-4">
            <Field label="Section Label" value={content.crewProgram.sectionLabel} onChange={(v) => update('crewProgram', { ...content.crewProgram, sectionLabel: v })} />
            <DynamicList label="Heading Lines" items={content.crewProgram.headingLines} onChange={(v) => update('crewProgram', { ...content.crewProgram, headingLines: v })} />
            <Field label="Heading Highlight (which line gets orange)" value={content.crewProgram.headingHighlight} onChange={(v) => update('crewProgram', { ...content.crewProgram, headingHighlight: v })} />
            <Field label="Description" value={content.crewProgram.description} onChange={(v) => update('crewProgram', { ...content.crewProgram, description: v })} multiline />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ranks</label>
              {content.crewProgram.ranks.map((rank, i) => (
                <div key={i} className="mb-4 border border-gray-200 p-4">
                  <div className="space-y-3">
                    <Field label="Rank Name" value={rank.rank} onChange={(v) => {
                      const ranks = [...content.crewProgram.ranks]
                      ranks[i] = { ...ranks[i], rank: v }
                      update('crewProgram', { ...content.crewProgram, ranks })
                    }} />
                    <Field label="Ordinal" value={rank.ordinal} onChange={(v) => {
                      const ranks = [...content.crewProgram.ranks]
                      ranks[i] = { ...ranks[i], ordinal: v }
                      update('crewProgram', { ...content.crewProgram, ranks })
                    }} />
                    <Field label="Requirement" value={rank.requirement} onChange={(v) => {
                      const ranks = [...content.crewProgram.ranks]
                      ranks[i] = { ...ranks[i], requirement: v }
                      update('crewProgram', { ...content.crewProgram, ranks })
                    }} />
                    <DynamicList label="Perks" items={rank.perks} onChange={(v) => {
                      const ranks = [...content.crewProgram.ranks]
                      ranks[i] = { ...ranks[i], perks: v }
                      update('crewProgram', { ...content.crewProgram, ranks })
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <Field label="Quote" value={content.crewProgram.quote} onChange={(v) => update('crewProgram', { ...content.crewProgram, quote: v })} multiline />
            <Field label="Quote Attribution" value={content.crewProgram.quoteAttribution} onChange={(v) => update('crewProgram', { ...content.crewProgram, quoteAttribution: v })} />
            <Field label="Primary CTA Label" value={content.crewProgram.ctaPrimaryLabel} onChange={(v) => update('crewProgram', { ...content.crewProgram, ctaPrimaryLabel: v })} />
            <Field label="Secondary CTA Label" value={content.crewProgram.ctaSecondaryLabel} onChange={(v) => update('crewProgram', { ...content.crewProgram, ctaSecondaryLabel: v })} />
          </div>
        </Section>

        <Section title="Menu Section Labels">
          <div className="space-y-4">
            <Field label="Section Label" value={content.menu.sectionLabel} onChange={(v) => update('menu', { ...content.menu, sectionLabel: v })} />
            <Field label="Heading" value={content.menu.heading} onChange={(v) => update('menu', { ...content.menu, heading: v })} />
            <Field label="Subtext" value={content.menu.subtext} onChange={(v) => update('menu', { ...content.menu, subtext: v })} />
            <Field label="Page Heading (full menu page)" value={content.menu.pageHeading} onChange={(v) => update('menu', { ...content.menu, pageHeading: v })} />
            <Field label="Page Subtext" value={content.menu.pageSubtext} onChange={(v) => update('menu', { ...content.menu, pageSubtext: v })} />
            <DynamicList label="Ticker Items" items={content.menu.tickerItems} onChange={(v) => update('menu', { ...content.menu, tickerItems: v })} />
          </div>
        </Section>

        <Section title="Footer">
          <div className="space-y-4">
            <Field label="Tagline" value={content.footer.tagline} onChange={(v) => update('footer', { ...content.footer, tagline: v })} />
            <Field label="Closing Line" value={content.footer.closingLine} onChange={(v) => update('footer', { ...content.footer, closingLine: v })} />
          </div>
        </Section>

        <Section title="Loading Screen">
          <DynamicList label="System Check Messages" items={content.loadingScreen.systemChecks} onChange={(v) => update('loadingScreen', { ...content.loadingScreen, systemChecks: v })} />
        </Section>
      </div>

      <div className="sticky bottom-0 mt-6 border-t border-gray-200 bg-gray-50 px-4 py-3 -mx-4 lg:-mx-6 lg:px-6">
        <button
          onClick={save}
          disabled={saving}
          className="bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
