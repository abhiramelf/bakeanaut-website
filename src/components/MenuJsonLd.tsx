import type { MenuData } from '@/types/content'

interface MenuJsonLdProps {
  menuData: MenuData
}

export default function MenuJsonLd({ menuData }: MenuJsonLdProps) {
  const menuSections = menuData.sectors.map((sector) => ({
    '@type': 'MenuSection',
    name: sector.name,
    description: sector.flavorText,
    hasMenuItem: sector.items
      .filter((item) => !item.classified)
      .map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        ...(item.price !== null && {
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'INR',
          },
        }),
      })),
  }))

  // Add special payloads as a section
  menuSections.push({
    '@type': 'MenuSection',
    name: menuData.specialPayloads.name,
    description: menuData.specialPayloads.flavorText,
    hasMenuItem: menuData.specialPayloads.items
      .filter((item) => !item.classified)
      .map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        ...(item.price !== null && {
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'INR',
          },
        }),
      })),
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Bakeanaut Menu',
    description:
      'Full menu of artisan cookies, NYC-style cheesecakes, brownies, bomboloni & cakes.',
    url: 'https://bakeanaut.in/menu',
    hasMenuSection: menuSections,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
