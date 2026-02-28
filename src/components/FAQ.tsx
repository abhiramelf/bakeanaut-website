const faqs = [
  {
    question: 'Where is Bakeanaut located in Thiruvananthapuram?',
    answer:
      'Bakeanaut HQ is near Manacaud P.O., Thiruvananthapuram, Kerala — 695009. We operate Mon–Thu 11AM–9PM, Fri–Sat 11AM–10PM, Sun 12PM–8PM.',
  },
  {
    question: 'How do I order from Bakeanaut?',
    answer:
      'All orders are placed via WhatsApp. Browse our menu, add items to your payload, and tap "Launch Order on WhatsApp" to send your order directly to our crew.',
  },
  {
    question: 'What are your best sellers?',
    answer:
      'Our top missions include RED PLANET (crimson velvet cookie), MANHATTAN MOON (NYC baked cheesecake), APOLLO ROCK (triple-chocolate brownie), and SOLAR FLARE MINI (basque cheesecake).',
  },
  {
    question: 'Do you deliver across Trivandrum?',
    answer:
      'Yes, we deliver across Thiruvananthapuram. Message us on WhatsApp at +91 9916699631 for delivery details and availability in your area.',
  },
  {
    question: 'Can I place custom orders or bulk orders?',
    answer:
      'Absolutely. Reach out to our crew on WhatsApp for custom orders, gifting tins, bulk orders, and special event payloads. We handle classified missions too.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQ() {
  return (
    <section className="relative border-t border-light-purple/20 bg-dark-bg px-6 py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-cosmic-orange">
            DEBRIEF
          </span>
          <div className="h-px flex-1 bg-light-purple/30" />
        </div>

        <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-mission-white md:text-3xl">
          Frequently Asked Questions
        </h2>

        <dl className="mt-10 space-y-0 divide-y divide-light-purple/20">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <dt className="font-display text-sm font-bold uppercase tracking-wide text-mission-white md:text-base">
                {faq.question}
              </dt>
              <dd className="mt-2 font-body text-sm leading-relaxed text-muted-purple md:text-base">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
