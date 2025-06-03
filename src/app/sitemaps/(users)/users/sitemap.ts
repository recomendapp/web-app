import { siteConfig } from '@/config/site'
import { getSitemapUserCount, getSitemapUsers } from '@/features/server/sitemap'
import type { MetadataRoute } from 'next'
 
export async function generateSitemaps() {
	const count = await getSitemapUserCount()
	return Array.from({ length: count }, (_, i) => ({ id: i }));
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
	const users = await getSitemapUsers(id)
	return users.map((user) => ({
		url: `${siteConfig.url}/@${user.username}`,
		lastModified: user.created_at ? new Date(user.created_at) : new Date(),
		changeFrequency: 'daily',
		priority: 0.5,
	}))
}