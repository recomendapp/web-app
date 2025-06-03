import { siteConfig } from '@/config/site'
import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
	{
		url: `${siteConfig.url}/explore`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.8,
	},
	{
		url: `${siteConfig.url}/upgrade`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.8,
	},
  ]
}