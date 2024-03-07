"use server"

import { createServerClient } from "@/lib/supabase/server";
import { z } from "zod";

const searchMovieSchema = z
	.object({
		query: z
			.string(),
		language: z
			.string()
			.optional(),
		page: z
			.number()
			.optional(),
		numberofresult: z
			.number()
			.optional(),
	})

export const handleSearchMovies = async (query: string, language = "en", page = 1) => {
	const supabase = createServerClient();
	const verifiedField = searchMovieSchema.safeParse({ query, language, page });
	if (!verifiedField.success) {
		throw new Error(verifiedField.error.errors.join('; '));
	}
	const tmdbResults = await (
		await fetch(
			`${process.env.NEXT_PUBLIC_TMDB_API_URL}search/movie?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}&append_to_response=credits`
		)
	).json();
	const moviesWithDirectors = await Promise.all(
		tmdbResults.results.map(async (movie: any) => {
			const { data:directors } = await supabase.from('tmdb_movie_credits')
				.select('person:tmdb_person(*)')
				.eq('movie_id', movie.id)
				.eq('job', 'Director');
		  	const movieWithCredits = {
				...movie,
				directors: directors?.map(({person}) => person),
			};
			return movieWithCredits;
		})
	);
	return moviesWithDirectors;
}
