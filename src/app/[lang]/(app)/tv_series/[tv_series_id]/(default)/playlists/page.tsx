import { ShowPlaylists } from '@/app/[lang]/(app)/film/[film_id]/(default)/playlists/_components/ShowPlaylists';
import { getTvSeries } from '@/features/server/media/mediaQueries';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { notFound } from 'next/navigation';

export default async function Reviews(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: seriesId } = getIdFromSlug(params.tv_series_id);
  const tv_series = await getTvSeries({
    id: seriesId,
    locale: params.lang,
  });
  if (!tv_series) notFound();
  return <ShowPlaylists mediaId={tv_series.media_id!} />;
}
