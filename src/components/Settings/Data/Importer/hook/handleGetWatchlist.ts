"use server"

// import { supabase } from "@/lib/supabase/client";
import { createServerClient } from "@/lib/supabase/server";
import { Movie } from "@/types/type.db";

export const handleGetWatchlist = async (
	movies: {
		title: string;
		year: string;
		date: string;
	}[],
	userId: string
) => {
	const supabase = createServerClient();

    const success = [];

	const failed = [];

	// const { data, error } = await supabase
	// 	.from('movies')
	// 	.select(`*`)
	// 	.eq('language_id', 'en')
	// 	.in('title_with_year', movies.map(movie => `${movie.title} ${movie.year}`))
	
	// data?.forEach(movie => {
	// 	const index = movies.findIndex(m => m.title === movie.title && m.year === movie.release_year);
	// 	if (index !== -1) {
	// 		success.push(movie);
	// 		movies.splice(index, 1);
	// 	}
	// })

	// movies.forEach(movie => failed.push(movie));

	for (const movie of movies) {
		if (!movie.title || !movie.year) {
			continue;
		}
		const { data, error } = await supabase
			.rpc('importer_best_match_movie', {
				lang: 'en',
				search_title: movie.title,
				search_year: Number(movie.year),
			})
		// const { data, error } = await supabase
		// 	.from('movies')
		// 	.select(`
		//   		*,
		// 		directors:tmdb_movie_credits(
		// 			id,
		// 			person:tmdb_person(*)
		// 		)
		// 	`)
		// 	.eq('language', 'en')
		// 	.gte('release_date', `${movie.year}-01-01`)
		// 	.lte('release_date', `${movie.year}-12-31`)
		// 	.eq('title', movie.title)
		// 	.eq('directors.job', 'Director')
		// 	.order('popularity', { ascending: false })
		// 	.limit(1);
		console.log('data', data);
		console.log('error', error);
		if (error) {
			failed.push(movie);
			continue;
		}
		if (data.length > 0)
			success.push({
				date: movie.date,
				source: movie,
				movie: data[0] as Movie,
			});
		else
			failed.push(movie);
	}
	return { success, failed };
}
