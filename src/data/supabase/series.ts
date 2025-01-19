import { getIdFromSlug } from "@/hooks/get-id-from-slug";
import { createServerClient } from "@/lib/supabase/server";
import { cache } from "react";

export const getSerie = cache(async (id: string, lang: string) => {
	const { id: serieId } = getIdFromSlug(id);
	const supabase = createServerClient(lang);
	const { data: serie, error } = await supabase
		.from('tv_serie')
		.select(`
			*,
			cast:tmdb_tv_series_credits(
				*,
				person:person(*)
			),
			videos:tmdb_tv_series_videos(*)
		`)
		.match({
			'id': serieId,
			'cast.job': 'Actor',
			'videos.iso_639_1': lang.split('-')[0]
		})
		.maybeSingle();
	if (error) throw error;
	return {
		id: serieId,
		serie,
	};
})