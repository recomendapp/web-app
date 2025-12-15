import TvSeasonHeader from "./_components/TvSeasonHeader";
import { redirect } from "next/navigation";
import { getTvSeason } from "@/features/server/media/mediaQueries";
import TvSeasonDetails from "./_components/TvSeasonDetails";
import { getIdFromSlug } from "@/utils/get-id-from-slug";
import { siteConfig } from "@/config/site";
import { truncate, upperFirst } from "lodash";
import { Metadata } from "next";
import { TVSeason, WithContext } from "schema-dts";
import { MediaTvSeriesSeason } from "@recomendapp/types";
import { getT } from "@/lib/i18n";

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
  const { t } = await getT();
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  try {
    const season = await getTvSeason(params.lang, serieId, Number(params.season_number));
    return {
      title: t('pages.tv_series.seasons.season.metadata.title', { title: season.serie?.name!, number: season.season_number! }),
      description: truncate(
        t('pages.tv_series.seasons.season.metadata.description', {
          title: season.serie?.name!,
          number: season.season_number!,
        }),
        { length: siteConfig.seo.description.limit }
      ),
      // alternates: seoLocales(params.lang, `/tv-series/${params.tv_series_id}/${params.season_number}`),
      openGraph: {
        siteName: siteConfig.name,
        title: `${t('pages.tv_series.seasons.season.metadata.title', { title: season.serie?.name!, number: season.season_number! })} • ${siteConfig.name}`,
        description: truncate(
          t('pages.tv_series.seasons.season.metadata.description', {
            title: season.serie?.name!,
            number: season.season_number!,
          }),
          { length: siteConfig.seo.description.limit }
        ),
        url: `${siteConfig.url}/${params.lang}/tv-series/${params.tv_series_id}/${params.season_number}`,
        images: season.poster_url ? [
          { url: season.poster_url }
        ] : undefined,
        type: 'video.episode',
        locale: params.lang,
      },
    };
  } catch {
    return { title: upperFirst(t('common.messages.tv_season_not_found')) };
  }
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
    return redirect(`/${params.lang}/tv-series/${params.tv_series_id}`);
  }
  let season: MediaTvSeriesSeason;
  try {
    season = await getTvSeason(params.lang, seriesId, seasonNumber);
  } catch {
    return redirect(`/${params.lang}/tv-series/${params.tv_series_id}`);
  }
  const jsonLd: WithContext<TVSeason> = {
    '@context': 'https://schema.org',
    '@type': 'TVSeason',
    name: season.name ?? undefined,
    image: season.poster_url ?? undefined,
    seasonNumber: season.season_number ?? undefined,
    aggregateRating: season.vote_average ? {
      '@type': 'AggregateRating',
      ratingValue: season.vote_average ?? undefined,
      ratingCount: season.vote_count ?? 0,
      bestRating: 10,
      worstRating: 1,
    } : undefined,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TvSeasonHeader season={season} urlSerie={`/tv-series/${params.tv_series_id}`} />
      <div className="px-4 pb-4">
        <TvSeasonDetails season={season} />
      </div>
    </>
  );
};
