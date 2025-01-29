import { notFound } from 'next/navigation';
import MovieDetails from './_components/MovieDetails';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getMovie } from '@/features/server/media/mediaQueries';

export default async function MoviePage(
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
  return <MovieDetails movie={movie} />;
}
