import { ShowPlaylists } from '@/app/[lang]/(app)/film/[film_id]/(default)/playlists/_components/ShowPlaylists';
import { getMovie } from '@/features/server/media/mediaQueries';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { notFound } from 'next/navigation';

export default async function Reviews(
  props: {
    params: Promise<{
      lang: string;
      film_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id: movieId } = getIdFromSlug(params.film_id);
  const movie = await getMovie({
    id: movieId,
    locale: params.lang,
  });
  if (!movie) notFound();
  return <ShowPlaylists mediaId={movie.media_id!} />;
}
