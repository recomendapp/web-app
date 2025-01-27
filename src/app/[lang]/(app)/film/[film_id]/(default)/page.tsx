import { notFound } from 'next/navigation';
import MovieDetails from './_components/MovieDetails';
import { getMovie } from '@/features/server/movies';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';

export default async function MoviePage({
  params,
}: {
  params: {
    lang: string;
    film_id: string;
  };
}) {
  const { id: movieId } = getIdFromSlug(params.film_id);
	const movie = await getMovie(movieId, params.lang);
	if (!movie) notFound();
	return <MovieDetails movie={movie} />;
}
