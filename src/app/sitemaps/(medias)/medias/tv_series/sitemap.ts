import { siteConfig } from '@/config/site'
import { getSitemapMediaMovieCount, getSitemapMediaMovies, getSitemapMediaTvSeries, getSitemapMediaTvSeriesCount, getSitemapUsers } from '@/features/server/sitemap'
import { routing } from '@/lib/i18n/routing';
import { kebabCase } from 'lodash';
import type { MetadataRoute } from 'next'
 
export async function generateSitemaps() {
	const count = await getSitemapMediaTvSeriesCount()
	return Array.from({ length: count }, (_, i) => ({ id: i }));
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
	const series = await getSitemapMediaTvSeries(id);
	return series.map((serie) => {
		const translations = Object.fromEntries(
			serie.tmdb_tv_series_translations.map((t) => [
				`${t.iso_639_1}-${t.iso_3166_1}`,
				t.name,
			])
    	);
		return ({
			url: `${siteConfig.url}/tv/${serie.id}${serie.original_name ? `-${kebabCase(serie.original_name)}` : ''}`,
			priority: 0.8,
			alternates: {
				languages: Object.fromEntries(
					routing.locales.map((locale) => {
						const title = translations[locale] || serie.original_name;
						const slug = `${serie.id}${title ? `-${kebabCase(title)}` : ''}`;
						return [
							locale,
							`${siteConfig.url}/${locale}/tv_series/${slug}`
						];
					})
				),
			}
		})
	});
}