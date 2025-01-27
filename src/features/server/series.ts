import { createServerClient } from "@/lib/supabase/server";
import { MediaTvSerie } from "@/types/type.db";
import { cache } from "react";

export const getSerie = cache(async (id: number, lang: string) => {
	const supabase = createServerClient(lang);
	const { data: serie, error } = await supabase
		.from('media_tv_serie')
		.select(`
			*,
			cast:tmdb_tv_series_credits(
				*,
				person:person(*)
			),
			videos:tmdb_tv_series_videos(*)
		`)
		.match({
			'id': id,
			'cast.job': 'Actor',
			'videos.iso_639_1': lang.split('-')[0]
		})
		.returns<MediaTvSerie[]>()
		.maybeSingle();
	if (error) throw error;
	return serie;
})