import { notFound } from 'next/navigation';
import TvSeriesDetails from './_components/TvSeriesDetails';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';
import { locales } from '@/lib/i18n/locales';
import { TVSeries, WithContext } from 'schema-dts';

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
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.serie' });
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries({
    id: serieId,
    locale: params.lang,
  });
  if (!serie) return { title: upperFirst(common('errors.serie_not_found')) };
  return {
    title: t('metadata.title', { title: serie.title!, year: new Date(String(serie.extra_data.first_air_date)).getFullYear() }),
    description: truncate(
      serie.main_credit
        ? t('metadata.description', {
          title: serie.title!,
          creators: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(serie.main_credit.map((creator) => creator.title ?? '')),
          year: new Date(String(serie.extra_data.first_air_date)).getFullYear(),
          overview: serie.extra_data.overview,
        }) : t('metadata.description_no_creator', {
          title: serie.title!,
          year: new Date(String(serie.extra_data.first_air_date)).getFullYear(),
          overview: serie.extra_data.overview,
        }),
      { length: siteConfig.seo.description.limit }
    ),
    alternates: {
      canonical: `${siteConfig.url}/${params.lang}/tv_series/${serie.slug}`,
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `${siteConfig.url}/${locale}/tv_series/${serie.slug}`])
      ),
    },
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('metadata.title', { title: serie.title!, year: new Date(String(serie.extra_data.first_air_date)).getFullYear() })} • ${siteConfig.name}`,
      description: truncate(
        serie.main_credit
          ? t('metadata.description', {
            title: serie.title!,
            creators: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(serie.main_credit.map((creator) => creator.title ?? '')),
            year: new Date(String(serie.extra_data.first_air_date)).getFullYear(),
            overview: serie.extra_data.overview,
          }) : t('metadata.description_no_creator', {
            title: serie.title!,
            year: new Date(String(serie.extra_data.first_air_date)).getFullYear(),
            overview: serie.extra_data.overview,
          }),
        { length: siteConfig.seo.description.limit }
      ),
      url: `${siteConfig.url}/${params.lang}/tv_series/${serie.slug}`,
      images: serie.avatar_url ? [
        { url: serie.avatar_url }
      ] : undefined,
      type: 'video.tv_show',
      locale: params.lang,
    },
  };
}

export default async function TvSeriesPage(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries({
    id: serieId,
    locale: params.lang,
  });
  if (!serie) notFound();
  const jsonLd: WithContext<TVSeries> = {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    name: serie.title ?? undefined,
    image: serie.avatar_url ?? undefined,
    description: serie.extra_data.overview,
    datePublished: serie.date ?? undefined,
    dateModified: new Date().toISOString(),
    director: serie.main_credit
      ?.map(director => ({
        '@type': 'Person',
        name: director.title ?? undefined,
        image: director.avatar_url ?? undefined,
      })),
    actor: serie.cast
      ?.map((actor) => ({
        '@type': 'Person',
        name: actor.person?.title ?? undefined,
        image: actor.person?.avatar_url ?? undefined,
      })),
    genre: serie.genres?.map((genre) => genre.name),
    aggregateRating: (serie.vote_average || serie.tmdb_vote_average) ? {
      '@type': 'AggregateRating',
      ratingValue: serie.vote_average ?? serie.tmdb_vote_average ?? undefined,
      ratingCount: serie.vote_count ?? serie.tmdb_vote_count ?? 0,
      bestRating: 10,
      worstRating: 1,
    } : undefined,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TvSeriesDetails slug={params.tv_series_id} serie={serie} />
    </>
  );
}
