import { notFound } from 'next/navigation';
import TvSeriesHeader from './_components/TvSeriesHeader';
import TvSeriesNavbar from './_components/TvSeriesNavbar';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getMediaFollowersAverageRating, getTvSeries } from '@/features/server/media/mediaQueries';

export default async function TvSeriesLayout(
  props: {
      children: React.ReactNode;
      params: Promise<{
        lang: string;
        tv_series_id: string;
      }>;
  }
) {
  const params = await props.params;

  const {
      children
  } = props;

  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const serie = await getTvSeries(params.lang, serieId);
  if (!serie) notFound();
  const followersAvgRating = await getMediaFollowersAverageRating({
    media_id: serie.media_id!,
  })
  return (
  <>
    <TvSeriesHeader serie={serie} followersAvgRating={followersAvgRating?.follower_avg_rating} />
    <div className="px-4 pb-4">
      <TvSeriesNavbar serieId={params.tv_series_id} />
      {children}
    </div>
  </>
	);
};
