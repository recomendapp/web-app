"use server"

import { fallbackLng } from "@/lib/i18n/settings";
import { createServerClient } from "@/lib/supabase/server";
import { MediaMovie } from "@recomendapp/types";
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

export const tmdbSearchMovies = async (query: string, language = fallbackLng, page = 1): Promise<MediaMovie[]> => {
	const supabase = await createServerClient();
	const verifiedField = searchMovieSchema.safeParse({ query, language, page });
	if (!verifiedField.success) {
		throw new Error(verifiedField.error.errors.join('; '));
	}
	const tmdbResults = await fetch(
		`${process.env.TMDB_API_URL}/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`
	).then(res => res.json() as Promise<{ results: { id: number }[] }>);
	const { data, error } = await supabase
		.from('media_movie')
		.select('*')
		.in('id', tmdbResults.results.map((movie: any) => movie.id))
		.limit(20);
	
	if (error) throw error;

	return tmdbResults.results
		.map(tmdbMovie => data.find(m => m.id === tmdbMovie.id))
		.filter((movie): movie is MediaMovie => Boolean(movie));
}
