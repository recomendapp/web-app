"use server"

import { routing } from "@/lib/i18n/routing";
import { createServerClient } from "@/lib/supabase/server";
import { MediaTvSeries } from "@recomendapp/types/dist";
import { z } from "zod";

const searchSeriesSchema = z
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

export const tmdbSearchTvSeries = async (query: string, language = routing.defaultLocale, page = 1): Promise<MediaTvSeries[]> => {
	const supabase = await createServerClient(language);
	const verifiedField = searchSeriesSchema.safeParse({ query, language, page });
	if (!verifiedField.success) {
		throw new Error(verifiedField.error.errors.join('; '));
	}
	const tmdbResults = await fetch(
		`${process.env.TMDB_API_URL}/search/tv?query=${query}&api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`
	).then(res => res.json() as Promise<{ results: { id: number }[] }>);
	const { data, error } = await supabase
		.from('media_tv_series')
		.select('*')
		.in('id', tmdbResults.results.map((serie: any) => serie.id))
		.limit(20);
	
	if (error) throw error;

	return tmdbResults.results
			.map(tmdbSerie => data.find(m => m.id === tmdbSerie.id))
			.filter((tvSeries): tvSeries is MediaTvSeries => Boolean(tvSeries));
}
