import { ShowPlaylists } from '@/app/[lang]/(app)/film/[film_id]/(default)/playlists/_components/ShowPlaylists';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';

export default async function Reviews({
  params,
}: {
  params: {
    lang: string;
    film_id: string;
  };
}) {
  const { id: movieId } = getIdFromSlug(params.film_id);
  return <ShowPlaylists filmId={movieId} />;
}
