import TvSeasonHeader from "./_components/TvSeasonHeader";
import { redirect } from "next/navigation";
import { getTvSeason } from "@/features/server/media/mediaQueries";
import TvSeasonDetails from "./_components/TvSeasonDetails";
import { getIdFromSlug } from "@/hooks/get-id-from-slug";

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
  const { id: seasonId } = getIdFromSlug(params.tv_series_id);
  const seasonNumber = Number(params.season_number);
  if (isNaN(seasonNumber)) {
    return redirect(`/${params.lang}/tv_series/${params.tv_series_id}`);
  }
  const season = await getTvSeason({
    serieId: seasonId,
    seasonNumber: seasonNumber,
    locale: params.lang,
  });
  if (!season) return redirect(`/${params.lang}/tv_series/${params.tv_series_id}`);
  return (
    <>
      <TvSeasonHeader season={season} />
      <div className="px-4 pb-4">
        <TvSeasonDetails season={season} />
      </div>
    </>
  );
};
