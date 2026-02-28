import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: 'https://bakeanaut.in',
      lastModified,
      priority: 1.0,
    },
    {
      url: 'https://bakeanaut.in/menu',
      lastModified,
      priority: 0.9,
    },
    {
      url: 'https://bakeanaut.in/terms',
      lastModified,
      priority: 0.3,
    },
    {
      url: 'https://bakeanaut.in/privacy',
      lastModified,
      priority: 0.3,
    },
    {
      url: 'https://bakeanaut.in/return-refund',
      lastModified,
      priority: 0.3,
    },
    {
      url: 'https://bakeanaut.in/shipping',
      lastModified,
      priority: 0.3,
    },
  ]
}
