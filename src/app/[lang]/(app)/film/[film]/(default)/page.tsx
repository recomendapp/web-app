import { notFound } from 'next/navigation';
import MovieDescription from './_components/MovieDescription';

// SUPABASE
import { createServerClient } from '@/lib/supabase/server';
import { getMovieId } from '@/hooks/get-movie-id';

export default async function MoviePage({
  params,
}: {
  params: {
    lang: string;
    film: string;
  };
}) {
	const { movieId } = getMovieId(params.film);
	const supabase = createServerClient(params.lang);
	const { data: movie } = await supabase
		.from('movie')
		.select(`
			*,
			cast:tmdb_movie_credits(
				id,
				person:person(*),
				role:tmdb_movie_role(*)
			)
		`)
		.eq('id', movieId)
		.eq('cast.job', 'Actor')
		.single();

  if (!movie) notFound();

  return (<MovieDescription movie={movie} />);
}
