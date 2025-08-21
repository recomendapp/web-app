import { siteConfig } from '@/config/site';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TvSeriesPlaylists } from './_components/TvSeriesPlaylists';
import { truncate, upperFirst } from 'lodash';
import { seoLocales } from '@/lib/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.tv_series.playlists' });
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries(params.lang, serieId);
  if (!serie) return { title: upperFirst(common('messages.tv_series_not_found')) };
  return {
    title: t('metadata.title', { title: serie.name, year: new Date(String(serie.first_air_date)).getFullYear() }),
    description: truncate(
      t('metadata.description', {
        title: serie.name,
      }),
      { length: siteConfig.seo.description.limit }
    ),
    alternates: seoLocales(params.lang, `/tv-series/${serie.slug}/playlists`),
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('metadata.title', { title: serie.name, year: new Date(String(serie.first_air_date)).getFullYear() })} • ${siteConfig.name}`,
      description: truncate(
        t('metadata.description', {
          title: serie.name,
        }),
        { length: siteConfig.seo.description.limit }
      ),
      url: `${siteConfig.url}/${params.lang}/tv-series/${serie.slug}/playlists`,
      images: serie.poster_url ? [
        { url: serie.poster_url }
      ] : undefined,
      type: 'video.tv_show',
      locale: params.lang,
    },
  };
}

export default async function Reviews(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: seriesId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries(params.lang, seriesId);
  if (!serie) notFound();
  return <TvSeriesPlaylists tvSeriesId={seriesId} />;
}
