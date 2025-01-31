import { notFound } from 'next/navigation';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import Reviews from '@/components/Review/Reviews';

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
  const serie = await getTvSeries({
    id: serieId,
    locale: params.lang,
  });
  if (!serie) notFound();
  return <Reviews mediaId={serie.media_id!} />;
}
