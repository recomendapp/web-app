import { siteConfig } from '@/config/site';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShowPlaylists } from './_components/ShowPlaylists';
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
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.serie.playlists' });
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries(params.lang, serieId);
  if (!serie) return { title: upperFirst(common('errors.serie_not_found')) };
  return {
    title: t('metadata.title', { title: serie.title!, year: new Date(String(serie.extra_data.first_air_date)).getFullYear() }),
    description: truncate(
      t('metadata.description', {
        title: serie.title!,
      }),
      { length: siteConfig.seo.description.limit }
    ),
    alternates: seoLocales(params.lang, `/tv_series/${serie.slug}/playlists`),
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('metadata.title', { title: serie.title!, year: new Date(String(serie.extra_data.first_air_date)).getFullYear() })} • ${siteConfig.name}`,
      description: truncate(
        t('metadata.description', {
          title: serie.title!,
        }),
        { length: siteConfig.seo.description.limit }
      ),
      url: `${siteConfig.url}/${params.lang}/tv_series/${serie.slug}/playlists`,
      images: serie.avatar_url ? [
        { url: serie.avatar_url }
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
  return <ShowPlaylists mediaId={serie.media_id!} />;
}
