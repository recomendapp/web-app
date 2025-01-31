"use server"

import { createServerClient } from "@/lib/supabase/server";
import { Media } from "@/types/type.db";
import { z } from "zod";

const searchMultiSchema = z
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

export const tmdbSearchMulti = async (query: string, language = "en", page = 1) => {
	const supabase = await createServerClient();
	const verifiedField = searchMultiSchema.safeParse({ query, language, page });
	if (!verifiedField.success) {
		throw new Error(verifiedField.error.errors.join('; '));
	}
	const tmdbResults = await (
		await fetch(
			`${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/multi?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}`
		)
	).json();

	const { data, error } = await supabase
		.from('medias')
		.select('*, media_movie(*), media_tv_series(*), media_person(*)')
		.or(tmdbResults.results.map((result: any) => {
			return `${result.media_type === 'tv' ? 'tv_series' : result.media_type}_id.eq.${result.id}`
		}).join(','));

	if (!data || error) throw error;

	const orderedData = tmdbResults.results.map((tmdbResult: any) => {
		return data.find((result) => {
			if (tmdbResult.media_type === 'movie') {
				return result.movie_id === tmdbResult.id;
			} else if (tmdbResult.media_type === 'tv') {
				return result.tv_series_id === tmdbResult.id;
			} else if (tmdbResult.media_type === 'person') {
				return result.person_id === tmdbResult.id;
			}
			return false;
		});
	}).filter(Boolean) as typeof data;

	const best_result = {
		...orderedData[0].media_movie,
		...orderedData[0].media_tv_series,
		...orderedData[0].media_person,
	} as Media;
	const movies = orderedData.filter((result) => result.media_type === 'movie').map((result) => result.media_movie);
	const tv_series = orderedData.filter((result) => result.media_type === 'tv_series').map((result) => result.media_tv_series);
	const persons = orderedData.filter((result) => result.media_type === 'person').map((result) => result.media_person);

	return {
		best_result: best_result,
		movies: movies,
		tv_series: tv_series,
		persons: persons,
		total_results: tmdbResults.total_results,
	}
}
