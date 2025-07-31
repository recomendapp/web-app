import TvSeasonHeader from "./_components/TvSeasonHeader";
import { redirect } from "next/navigation";
import { getTvSeason } from "@/features/server/media/mediaQueries";
import TvSeasonDetails from "./_components/TvSeasonDetails";
import { getIdFromSlug } from "@/utils/get-id-from-slug";
import { siteConfig } from "@/config/site";
import { truncate, upperFirst } from "lodash";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { TVSeason, WithContext } from "schema-dts";
import { seoLocales } from "@/lib/i18n/routing";

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
      season_number: number;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.serie.seasons.season' });
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const season = await getTvSeason(params.lang, serieId, Number(params.season_number));
  if (!season) return { title: upperFirst(common('messages.season_not_found')) };
  return {
    title: t('metadata.title', { title: season.serie?.title!, number: season.season_number! }),
    description: truncate(
      t('metadata.description', {
        title: season.serie?.title!,
        number: season.season_number!,
      }),
      { length: siteConfig.seo.description.limit }
    ),
    alternates: seoLocales(params.lang, `/tv_series/${params.tv_series_id}/${params.season_number}`),
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('metadata.title', { title: season.serie?.title!, number: season.season_number! })} • ${siteConfig.name}`,
      description: truncate(
        t('metadata.description', {
          title: season.serie?.title!,
          number: season.season_number!,
        }),
        { length: siteConfig.seo.description.limit }
      ),
      url: `${siteConfig.url}/${params.lang}/tv_series/${params.tv_series_id}/${params.season_number}`,
      images: season.avatar_url ? [
        { url: season.avatar_url }
      ] : undefined,
      type: 'video.episode',
      locale: params.lang,
    },
  };
}

export default async function TvSeriesSeason(
  props: {
      params: Promise<{
        lang: string;
        tv_series_id: string;
        season_number: number;
      }>;
  }
) {
  const params = await props.params;
  const { id: seriesId } = getIdFromSlug(params.tv_series_id);
  const seasonNumber = Number(params.season_number);
  if (isNaN(seasonNumber)) {
    return redirect(`/${params.lang}/tv_series/${params.tv_series_id}`);
  }
  const season = await getTvSeason(params.lang, seriesId, seasonNumber);
  if (!season) return redirect(`/${params.lang}/tv_series/${params.tv_series_id}`);
  const jsonLd: WithContext<TVSeason> = {
    '@context': 'https://schema.org',
    '@type': 'TVSeason',
    name: season.title ?? undefined,
    image: season.avatar_url ?? undefined,
    seasonNumber: season.season_number ?? undefined,
    // description: season.extra_data.overview,
    // datePublished: season.date ?? undefined,
    // dateModified: new Date().toISOString(),
    // director: serie.main_credit
    //   ?.map(director => ({
    //     '@type': 'Person',
    //     name: director.title ?? undefined,
    //     image: director.avatar_url ?? undefined,
    //   })),
    // actor: serie.cast
    //   ?.map((actor) => ({
    //     '@type': 'Person',
    //     name: actor.person?.title ?? undefined,
    //     image: actor.person?.avatar_url ?? undefined,
    //   })),
    // genre: serie.genres?.map((genre) => genre.name),
    aggregateRating: (season.tmdb_vote_average) ? {
      '@type': 'AggregateRating',
      ratingValue: season.tmdb_vote_average ?? undefined,
      ratingCount: season.tmdb_vote_count ?? 0,
      bestRating: 10,
      worstRating: 1,
    } : undefined,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TvSeasonHeader season={season} urlSerie={`/tv_series/${params.tv_series_id}`} />
      <div className="px-4 pb-4">
        <TvSeasonDetails season={season} />
      </div>
    </>
  );
};
