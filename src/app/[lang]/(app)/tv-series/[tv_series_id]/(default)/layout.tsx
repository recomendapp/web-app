import { notFound } from 'next/navigation';
import TvSeriesHeader from './_components/TvSeriesHeader';
import TvSeriesNavbar from './_components/TvSeriesNavbar';
import { getIdFromSlug } from '@/utils/get-id-from-slug';
import { getTvSeries, getTvSeriesUserActivitiesFollowerAverageRating } from '@/features/server/media/mediaQueries';
import { MediaTvSeries } from '@recomendapp/types';

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
  let serie: MediaTvSeries;
  try {
    serie = await getTvSeries(params.lang, serieId);
  } catch {
    return notFound();
  }
  const followersAvgRating = await getTvSeriesUserActivitiesFollowerAverageRating({
    tvSeriesId: serieId,
  })
  return (
  <>
    <TvSeriesHeader serie={serie} followersAvgRating={followersAvgRating?.follower_avg_rating} />
    <div className="px-4 pb-4 flex flex-col items-center">
        <div className='max-w-7xl w-full'>
          <TvSeriesNavbar serieId={params.tv_series_id} />
          {children}
        </div>
    </div>
  </>
	);
};
