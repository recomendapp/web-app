import { notFound } from 'next/navigation';
import MovieDescription from './_components/MovieDescription';

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
  const time = new Date().getTime();
  const { data: movie } = await supabase
		.from('movie')
		.select(`
			*,
			cast:tmdb_movie_credits(
				id,
				person:tmdb_person(*),
				role:tmdb_movie_role(*)
			)
		`)
		.eq('id', params.film)
		.eq('language', params.lang)
		.eq('cast.job', 'Actor')
		.single();

  if (!movie) notFound();

  return (<MovieDescription movie={movie} />);
}
