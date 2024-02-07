import { notFound } from 'next/navigation';
import MovieDescription from './components/MovieDescription';

// SUPABASE
import { createServerClient } from '@/lib/supabase/server';

export default async function MoviePage({
  params,
}: {
  params: {
    lang: string;
    film: number;
  };
}) {
  const supabase = createServerClient();
  const { data: movie } = await supabase
		.from('tmdb_movie')
		.select(`
			id,
			data:tmdb_movie_translation(*),
			cast:tmdb_movie_credits(
				id,
				person:tmdb_person(*),
				role:tmdb_movie_role(*)
			)
		`)
		.eq('id', params.film)
		.eq('data.language_id', params.lang)
		.eq('cast.job', 'Actor')
		.single();

  if (!movie) notFound();

  return (<MovieDescription movie={movie} />);
}
