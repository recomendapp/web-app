import { siteConfig } from '@/config/site'
import { getSitemapReviewCount, getSitemapReviews } from '@/features/server/sitemap'
import type { MetadataRoute } from 'next'
 
export async function generateSitemaps() {
	const count = await getSitemapReviewCount()
	return Array.from({ length: count }, (_, i) => ({ id: i }));
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
	const reviews = await getSitemapReviews(id)
	return reviews.map((review) => ({
		url: `${siteConfig.url}/review/${review.id}`,
		lastModified: review.updated_at ? new Date(review.updated_at) : new Date(),
		changeFrequency: 'daily',
		priority: 0.8,
	}))
}