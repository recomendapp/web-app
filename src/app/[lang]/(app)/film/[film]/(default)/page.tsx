import { notFound } from 'next/navigation';
import MovieDetails from './_components/MovieDetails';
import { getMovie } from '@/data/supabase/movies';

export default async function MoviePage({
  params,
}: {
  params: {
    lang: string;
    film: string;
  };
}) {
	const { movie } = await getMovie(params.film, params.lang);
	if (!movie) notFound();
	return <MovieDetails movie={movie as any} />;
}
