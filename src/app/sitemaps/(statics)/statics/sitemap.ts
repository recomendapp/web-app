import { siteConfig } from '@/config/site'
import { sitemapLocales } from '@/lib/i18n/routing'
import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: sitemapLocales('/')
      }
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: sitemapLocales('/about')
      }
    },
    {
      url: `${siteConfig.url}/explore`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: sitemapLocales('/explore')
      }
    },
    {
      url: `${siteConfig.url}/upgrade`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: sitemapLocales('/upgrade')
      }
    },
  ]
}