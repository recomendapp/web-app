import { notFound } from 'next/navigation';

// COMPONENTS
import MovieHeader from './_components/MovieHeader';
import MovieNavbar from './_components/MovieNavbar';
import { createServerClient } from '@/lib/supabase/server';

export async function generateMetadata({
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
		.select('id, data:tmdb_movie_translation!inner(*)')
		.eq('id', params.film)
		.eq('data.language_id', params.lang)
		.single();
	
	if (!movie) return { title: 'Film introuvable' };

	return {
		title: movie.data[0].title,
		description: `This is the page of ${movie.data[0].title}`,
	};
}

export default async function MovieLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
	  lang: string;
	  film: number;
	};
}) {
	const supabase = createServerClient();
	const { data: movie } = await supabase
		.from('tmdb_movie')
		.select(`
			*,
			data:tmdb_movie_translation(*),
			genres:tmdb_movie_genre(
				id,
				genre:tmdb_genre(
					*,
					data:tmdb_genre_translation(*)
				)
			),
			directors:tmdb_movie_credits(
				id,
				director:tmdb_person(*)
			),
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
		.eq('id', params.film)
		.eq('data.language_id', params.lang)
		.eq('genres.genre.data.language', params.lang)
		.eq('production_countries.country.data.iso_639_1', params.lang)
		.eq('spoken_languages.language.data.language', params.lang)
		.eq('videos.iso_639_1', params.lang)
		.eq('directors.job', 'Director')
		.single();

	if (!movie) notFound();

	return (
		<main>
			<MovieHeader movie={movie} />
			<div className="px-4 pb-4">
				<MovieNavbar movieId={String(params.film)} />
				{children}
			</div>
		</main>
	);
};
