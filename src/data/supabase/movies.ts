import { getIdFromSlug } from "@/hooks/get-id-from-slug";
import { createServerClient } from "@/lib/supabase/server";
import { id } from "date-fns/locale";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getMovie = cache(async (id: string, lang: string) => {
	const { id: movieId } = getIdFromSlug(id);
	const supabase = createServerClient(lang);
	const { data: movie, error } = await supabase
		.from('movie')
		.select(`
			*,
			cast:tmdb_movie_credits(
				id,
				person:person(*),
				role:tmdb_movie_role(*)
			),
			production_countries:tmdb_movie_country(
				id,
				country:tmdb_country(
					*,
					data:tmdb_country_translation(*)
				)
			),
			spoken_languages:tmdb_movie_language(
				id,
				language:tmdb_language(
					*,
					data:tmdb_language_translation(*)
				)
			),
			videos:tmdb_movie_videos(*)
		`)
		.match({
			'id': movieId,
			'cast.job': 'Actor',
			'production_countries.country.data.language': lang,
			'spoken_languages.language.data.language': lang,
			'videos.iso_639_1': lang
		})
		.maybeSingle();
	if (error) throw error;
	return {
		id: movieId,
		movie,
	};
})

// export const getMovie = async (id: string, lang: string) => {
// 	const supabase = createServerClient();
// 	return unstable_cache(async () => {
// 		const { id: movieId } = getIdFromSlug(id);
// 		const { data: movie, error } = await supabase
// 			.from('movie')
// 			.select(`
// 				*,
// 				cast:tmdb_movie_credits(
// 					id,
// 					person:person(*),
// 					role:tmdb_movie_role(*)
// 				),
// 				production_countries:tmdb_movie_country(
// 					id,
// 					country:tmdb_country(
// 						*,
// 						data:tmdb_country_translation(*)
// 					)
// 				),
// 				spoken_languages:tmdb_movie_language(
// 					id,
// 					language:tmdb_language(
// 						*,
// 						data:tmdb_language_translation(*)
// 					)
// 				),
// 				videos:tmdb_movie_videos(*)
// 			`)
// 			.match({
// 				'id': movieId,
// 				'cast.job': 'Actor',
// 				'production_countries.country.data.language': lang,
// 				'spoken_languages.language.data.language': lang,
// 				'videos.iso_639_1': lang
// 			})
// 			.maybeSingle();
// 		if (error) throw error;
// 		console.log(`REQUESTED MOVIE ${id}`);
// 		return {
// 			id: movieId,
// 			movie,
// 		};
// 	}, [], {
// 		revalidate: 60 * 60 * 24,
// 		tags: [lang, 'movie', id],
// 	})();
// }
