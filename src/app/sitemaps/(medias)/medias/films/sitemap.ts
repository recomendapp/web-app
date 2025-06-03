import { siteConfig } from '@/config/site'
import { getSitemapMediaMovieCount, getSitemapMediaMovies } from '@/features/server/sitemap'
import { routing } from '@/lib/i18n/routing';
import { kebabCase } from 'lodash';
import type { MetadataRoute } from 'next'
 
export async function generateSitemaps() {
	const count = await getSitemapMediaMovieCount()
	return Array.from({ length: count }, (_, i) => ({ id: i }));
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
	const films = await getSitemapMediaMovies(id);
	return films.map((film) => {
		const translations = Object.fromEntries(
			film.tmdb_movie_translations.map((t) => [
				`${t.iso_639_1}-${t.iso_3166_1}`,
				t.title,
			])
    	);
		return ({
			url: `${siteConfig.url}/film/${film.id}${film.original_title ? `-${kebabCase(film.original_title)}` : ''}`,
			priority: 0.8,
			alternates: {
				languages: Object.fromEntries(
					routing.locales.map((locale) => {
						const title = translations[locale] || film.original_title;
						const slug = `${film.id}${title ? `-${kebabCase(title)}` : ''}`;
						return [
							locale,
							`${siteConfig.url}/${locale}/film${slug}`
						];
					})
				),
			}
		})
	});
}