import { ShowPlaylists } from '@/app/[lang]/(app)/film/[film_id]/(default)/playlists/_components/ShowPlaylists';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';

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
  return <ShowPlaylists filmId={movieId} />;
}
