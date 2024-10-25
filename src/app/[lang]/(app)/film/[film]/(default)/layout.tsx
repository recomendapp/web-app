import { notFound } from 'next/navigation';

// COMPONENTS
import MovieHeader from './_components/MovieHeader';
import MovieNavbar from './_components/MovieNavbar';
import { createServerClient } from '@/lib/supabase/server';
import { getMovieId } from '@/hooks/get-movie-id';
import { Movie } from '@/types/type.db';

export async function generateMetadata({
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
		.select('title')
		.eq('id', movieId)
		.single();
	
	if (!movie) return { title: 'Film introuvable' };

	return {
		title: movie.title,
		description: `This is the page of ${movie.title}`,
	};
}

export default async function MovieLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
	  lang: string;
	  film: string;
	};
}) {
	const { movieId } = getMovieId(params.film);
	const supabase = createServerClient(params.lang);
	const { data: movie, error } = await supabase
		.from('movie')
		.select(`
			*,
			production_countries:tmdb_movie_country(
				id,
				country:tmdb_country(
					*,
					data:tmdb_country_translation(*)
				)
			),
			spoken_languages:tmdb_movie_language(
				id,
				language:tmdb_language(
					*,
					data:tmdb_language_translation(*)
				)
			),
			videos:tmdb_movie_videos(*)
		`)
		.eq('id', movieId)
		.eq('production_countries.country.data.language', params.lang)
		.eq('spoken_languages.language.data.language', params.lang)
		.eq('videos.iso_639_1', params.lang)
		.returns<Movie>()
		.single()

	if (!movie) notFound();

	return (
		<div>
			<MovieHeader movie={movie} />
			<div className="px-4 pb-4">
				<MovieNavbar movieId={movieId} />
				{children}
			</div>
		</div>
	);
};
