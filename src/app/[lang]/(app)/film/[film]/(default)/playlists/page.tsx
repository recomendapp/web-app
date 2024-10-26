import { ShowPlaylists } from '@/app/[lang]/(app)/film/[film]/(default)/playlists/_components/ShowPlaylists';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';

export default async function Reviews({
  params,
}: {
  params: {
    lang: string;
    film: string;
  };
}) {
  const { id: movieId } = getIdFromSlug(params.film);
  return <ShowPlaylists filmId={movieId} />;
}
