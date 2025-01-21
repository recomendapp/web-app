"use server"

import { createServerClient } from "@/lib/supabase/server";
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
	const supabase = createServerClient();
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
		.rpc('find_medias', {
			media_list: tmdbResults.results.map((result: any) => {
				return {
					id: result.id,
					type: result.media_type === 'tv' ? 'tv_serie' : result.media_type,
				}
			})
		})
		.returns<any[]>();
	
	if (!data || error) throw error;
	
	const best_result = data[0];
	const movies = data.filter((result: any) => result.media_type === 'movie') // .filter((result: any) => result.id !== best_result.id);
	const tv_series = data.filter((result: any) => result.media_type === 'tv_serie') // .filter((result: any) => result.id !== best_result.id);
	const persons = data.filter((result: any) => result.media_type === 'person') // .filter((result: any) => result.id !== best_result.id);

	return {
		best_result: best_result,
		movies: movies,
		tv_series: tv_series,
		persons: persons,
		total_results: tmdbResults.total_results,
	}
}
