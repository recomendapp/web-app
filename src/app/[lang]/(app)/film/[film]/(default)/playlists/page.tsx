import { ShowPlaylists } from '@/app/[lang]/(app)/film/[film]/(default)/playlists/_components/ShowPlaylists';
import { getMovieId } from '@/hooks/get-movie-id';

export default async function Reviews({
  params,
}: {
  params: {
    lang: string;
    film: string;
  };
}) {
  const { movieId } = getMovieId(params.film);
  return (<ShowPlaylists filmId={movieId} />);
}
