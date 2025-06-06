import { notFound } from 'next/navigation';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import Reviews from '@/components/Review/Reviews';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { seoLocales } from '@/lib/i18n/routing';

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
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.serie.reviews' });
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
    alternates: seoLocales(params.lang, `/tv_series/${serie.slug}/reviews`),
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('metadata.title', { title: serie.title!, year: new Date(String(serie.extra_data.first_air_date)).getFullYear() })} • ${siteConfig.name}`,
      description: truncate(
        t('metadata.description', {
          title: serie.title!,
        }),
        { length: siteConfig.seo.description.limit }
      ),
      url: `${siteConfig.url}/${params.lang}/tv_series/${serie.slug}/reviews`,
      images: serie.avatar_url ? [
        { url: serie.avatar_url }
      ] : undefined,
      type: 'video.tv_show',
      locale: params.lang,
    },
  };
}

export default async function MovieReviewsPage(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries(params.lang, serieId);
  if (!serie) notFound();
  return <Reviews mediaId={serie.media_id!} />;
}
