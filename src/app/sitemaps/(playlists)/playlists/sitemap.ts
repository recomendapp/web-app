import { siteConfig } from '@/config/site'
import { getSitemapPlaylistCount, getSitemapPlaylists } from '@/features/server/sitemap'
import type { MetadataRoute } from 'next'
 
export async function generateSitemaps() {
	const count = await getSitemapPlaylistCount()
	return Array.from({ length: count }, (_, i) => ({ id: i }));
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
	const playlists = await getSitemapPlaylists(id)
	return playlists.map((playlist) => ({
		url: `${siteConfig.url}/playlists/${playlist.id}`,
		lastModified: playlist.updated_at ? new Date(playlist.updated_at) : new Date(),
		changeFrequency: 'daily',
		priority: 0.8,
	}))
}