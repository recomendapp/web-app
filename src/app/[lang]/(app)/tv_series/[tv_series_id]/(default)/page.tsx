import { notFound } from 'next/navigation';
import TvSeriesDetails from './_components/TvSeriesDetails';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getTvSeries } from '@/features/server/media/mediaQueries';

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
  return <TvSeriesDetails serie={serie} />;
}
