"use server"

import { z } from "zod";

const searchMovieSchema = z
	.object({
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

export const handleNowPlayingMovies = async (
	language = "fr",
	region = "fr",
	page = 1
) => {
	const verifiedField = searchMovieSchema.safeParse({ language, page });
	if (!verifiedField.success) {
		throw new Error(verifiedField.error.errors.join('; '));
	}
	const { results } = await (
		await fetch(
		  `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/now_playing?include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}&region=${region}`
		)
	).json();
	return [...results];
}
