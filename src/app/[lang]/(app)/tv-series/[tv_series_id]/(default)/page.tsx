import { notFound } from 'next/navigation';
import TvSeriesDetails from './_components/TvSeriesDetails';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { truncate, upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';
import { seoLocales } from '@/lib/i18n/routing';
import { TVSeries, WithContext } from 'schema-dts';
import { SupportedLocale } from '@/translations/locales';
import { MediaTvSeries } from '@recomendapp/types';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang as SupportedLocale });
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  try {
    const serie = await getTvSeries(params.lang, serieId);
    return {
      title: t('pages.tv_series.metadata.title', { title: serie.name!, year: new Date(String(serie.first_air_date)).getFullYear() }),
      description: truncate(
        serie.created_by
          ? t('pages.tv_series.metadata.description', {
            title: serie.name!,
            creators: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(serie.created_by.map((creator) => creator.name ?? '')),
            year: new Date(String(serie.first_air_date)).getFullYear(),
            overview: serie.overview!,
          }) : t('pages.tv_series.metadata.description_no_creator', {
            title: serie.name!,
            year: new Date(String(serie.first_air_date)).getFullYear(),
            overview: serie.overview!,
          }),
        { length: siteConfig.seo.description.limit }
      ),
      alternates: seoLocales(params.lang, `/tv-series/${serie.slug}`),
      openGraph: {
        siteName: siteConfig.name,
        title: `${t('pages.tv_series.metadata.title', { title: serie.name!, year: new Date(String(serie.first_air_date)).getFullYear() })} • ${siteConfig.name}`,
        description: truncate(
          serie.created_by
            ? t('pages.tv_series.metadata.description', {
              title: serie.name!,
              creators: new Intl.ListFormat(params.lang, { style: 'long', type: 'conjunction' }).format(serie.created_by.map((creator) => creator.name ?? '')),
              year: new Date(String(serie.first_air_date)).getFullYear(),
              overview: serie.overview!,
            }) : t('pages.tv_series.metadata.description_no_creator', {
              title: serie.name!,
              year: new Date(String(serie.first_air_date)).getFullYear(),
              overview: serie.overview!,
            }),
          { length: siteConfig.seo.description.limit }
        ),
        url: `${siteConfig.url}/${params.lang}/tv-series/${serie.slug}`,
        images: serie.poster_url ? [
          { url: serie.poster_url }
        ] : undefined,
        type: 'video.tv_show',
        locale: params.lang,
      },
    };
  } catch {
    return { title: upperFirst(t('common.messages.tv_series_not_found')) };
  }
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
  let serie: MediaTvSeries;
  try {
    serie = await getTvSeries(params.lang, serieId);
  } catch {
    return notFound();
  }
  const jsonLd: WithContext<TVSeries> = {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    name: serie.name?? undefined,
    image: serie.poster_url ?? undefined,
    description: serie.overview ?? undefined,
    datePublished: serie.first_air_date ?? undefined,
    dateModified: new Date().toISOString(),
    director: serie.created_by
      ?.map(director => ({
        '@type': 'Person',
        name: director.name ?? undefined,
        image: director.profile_url ?? undefined,
      })),
    actor: serie.cast
      ?.map((actor) => ({
        '@type': 'Person',
        name: actor.person?.name ?? undefined,
        image: actor.person?.profile_url ?? undefined,
      })),
    genre: serie.genres?.map((genre) => genre.name),
    aggregateRating: serie.vote_average ? {
      '@type': 'AggregateRating',
      ratingValue: serie.vote_average ?? undefined,
      ratingCount: serie.vote_count ?? 0,
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
