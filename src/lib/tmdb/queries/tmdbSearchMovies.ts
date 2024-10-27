"use server"

import { routing } from "@/lib/i18n/routing";
import { createServerClient } from "@/lib/supabase/server";
import { Movie } from "@/types/type.db";
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

export const tmdbSearchMovies = async (query: string, language = routing.defaultLocale, page = 1) => {
	const supabase = createServerClient(language);
	const verifiedField = searchMovieSchema.safeParse({ query, language, page });
	if (!verifiedField.success) {
		throw new Error(verifiedField.error.errors.join('; '));
	}
	const tmdbResults = await (
		await fetch(
			`${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}`
		)
	).json();
	const request = await supabase
		.from('movie')
		.select('*')
		.in('id', tmdbResults.results.map((movie: any) => movie.id))
		.limit(20);
	
	const movies: Movie[] = tmdbResults.results.map((movie: any) => request.data?.find((m: any) => m.id === movie.id));

	return {
		...request,
		data: movies,
	}
}
