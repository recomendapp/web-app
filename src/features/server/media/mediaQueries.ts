import { mediaKeys } from "@/features/server/media/mediaKeys";
import { createServerClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server-no-cookie";
import { Media, MediaMovie, MediaTvSeries } from "@/types/type.db";
import { unstable_cache as cache } from "next/cache";

export const MEDIA_REVALIDATE_TIME = 24 * 60 * 60 * 1000;

export const getMediaFollowersAverageRating = async ({
	media_id,
} : {
	media_id: number;
}) => {
	const supabase = await createServerClient();
	const { data, error } = await supabase
		.from('user_followers_average_rating')
		.select(`*`)
		.match({
			media_id: media_id,
		})
		.maybeSingle();
	if (error) throw error;
	return data;
};

/* -------------------------------------------------------------------------- */
/*                                    MEDIA                                   */
/* -------------------------------------------------------------------------- */
export const getMedia = async ({
	locale,
	id,
} : {
	locale: string;
	id: number;
}) => {
	return await cache(
		async () => {
			const supabase = await createClient(locale);
			return await supabase
				.from('media')
				.select('*')
				.match({
					media_id: id,
				})
				.returns<Media[]>()
				.maybeSingle();
		},
		mediaKeys.detail({ locale: locale, id: id }),
		{ revalidate: MEDIA_REVALIDATE_TIME }
	)();
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    MOVIE                                   */
/* -------------------------------------------------------------------------- */
export const getMovie = async ({
	locale,
	id,
} : {
	locale: string;
	id: number;
}) => {
	return await cache(
		async () => {
			const supabase = await createClient(locale);
			const { data: film, error } = await supabase
				.from('media_movie')
				.select(`
					*,
					cast:tmdb_movie_credits(
						id,
						person:media_person(*),
						role:tmdb_movie_roles(*)
					),
					videos:tmdb_movie_videos(*)
				`)
				.match({
					'id': id,
					'cast.job': 'Actor',
					'videos.iso_639_1': locale.split('-')[0],
					'videos.type': 'Trailer',
				})
				.order('published_at', { referencedTable: 'videos', ascending: true, nullsFirst: false })
				.returns<MediaMovie[]>()
				.maybeSingle();
			if (error) throw error;
			return film;
		},
		mediaKeys.detail({ locale: locale, id: id, type: 'movie' }),
		{
			revalidate: MEDIA_REVALIDATE_TIME,
			tags: ['tmdb']
		}
	)();
};

export const getMovieReviews = async ({
	locale,
	id,
	filters,
} : {
	locale: string;
	id: number;
	filters: {
		page: number;
		perPage: number;
		sortBy: 'updated_at' | 'rating' | 'likes_count';
		sortOrder: 'asc' | 'desc';
	};
}) => {
	const supabase = await createClient(locale);
	let from = (filters.page - 1) * filters.perPage;
	let to = from + filters.perPage - 1;
	let request = supabase
		.from('user_review')
		.select(`
			*,
			user(*)
		`, {
			count: 'exact',
		})
		.match({
			media_id: id,
			media_type: 'movie',
		})
		.range(from, to)
	
	if (filters) {
		if (filters.sortBy && filters.sortOrder) {
			request = request.order(filters.sortBy, { ascending: filters.sortOrder === 'asc', nullsFirst: false });
		}
	}
	return await request;
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  TV_SERIES                                 */
/* -------------------------------------------------------------------------- */
export const getTvSeries = async ({
	locale,
	id,
} : {
	locale: string;
	id: number;
}) => {
	return await cache(
		async () => {
			const supabase = await createClient(locale);
			const { data: tvSeries, error } = await supabase
				.from('media_tv_series')
				.select(`
					*,
					cast:tmdb_tv_series_credits(
						*,
						person:media_person(*)
					),
					videos:tmdb_tv_series_videos(*)
				`)
				.match({
					'id': id,
					'cast.job': 'Actor',
					'videos.iso_639_1': locale.split('-')[0],
					'videos.type': 'Trailer',
				})
				.order('published_at', { referencedTable: 'videos', ascending: true, nullsFirst: false })
				.returns<MediaTvSeries[]>()
				.maybeSingle();
			if (error) throw error;
			return tvSeries;
		},
		mediaKeys.detail({ locale: locale, id: id, type: 'tv_series' }),
		{
			revalidate: MEDIA_REVALIDATE_TIME,
			tags: ['tmdb']
		}
	)();
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   PERSON                                   */
/* -------------------------------------------------------------------------- */

export const getPerson = async ({
	id,
	locale,
} : {
	id: number;
	locale: string;
}) => {
	return await cache(
	  async () => {
		const supabase = await createClient(locale);
		const { data: person, error } = await supabase
			.from('media_person')
			.select(`
				*,
				movies:media_movie_aggregate_credits(*, media:media_movie(*)),
				tv_series:tmdb_tv_series_credits(*, media:media_tv_series(*))
			`)
			.match({
				'id': id,
			})
			.order('media(date)', { referencedTable: 'movies', ascending: false, nullsFirst: false })
			.limit(10, { foreignTable: 'movies' })
			.limit(10, { foreignTable: 'tv_series' })
			.maybeSingle();
		if (error) throw error;
		return person;
	  },
	  mediaKeys.detail({ locale: locale, id: id, type: 'person' }),
	  {
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['tmdb']
	}
	)();
};

// export const getPersonCombinedCredits = async ({
// 	id,
// 	locale,
// } : {
// 	id: number;
// 	locale: string;
// }) => {
// 	return await cache(
// 		async () => {
// 			const supabase = await createClient(locale);
// 			const { data: credits, error } = await supabase
// 				.from('media_person_combined_credits')
// 				.select(`*`)
// 				.match({
// 					'person_id': id,
// 				})
// 				.order('popularity', { ascending: false, nullsFirst: false })
// 				.order('tmdb_popularity', { ascending: false, nullsFirst: false })
// 				.limit(10)
// 			if (error) throw error;
// 			return credits;
// 		},
// 		mediaKeys.personCombinedCredits({
// 			locale: locale,
// 			id: id,
// 		}),
// 		{ revalidate: 6 * 60 * 60 * 1000 }
// 	)();
// }

export const getPersonFilms = async ({
	id,
	locale,
	filters,
} : {
	id: number;
	locale: string;
	filters: {
		page: number;
		perPage: number;
		sortBy: 'release_date' | 'vote_average';
		sortOrder: 'asc' | 'desc';
	};
}) => {
	return await cache(
		async () => {
			const supabase = await createClient(locale);
			let from = (filters.page - 1) * filters.perPage;
			let to = from + filters.perPage - 1;
			let request = supabase
				.from('media_movie_aggregate_credits')
				.select(`
					*,
					media:media_movie(*)
				`, {
					count: 'exact',
				})
				.match({
					'person_id': id,
				})
				.range(from, to)
			
			if (filters) {
				if (filters.sortBy && filters.sortOrder) {
					switch (filters.sortBy) {
						case 'release_date':
							request = request.order(`media(date)`, { ascending: filters.sortOrder === 'asc', nullsFirst: false });
							break;
						case 'vote_average':
							request = request.order(`media(vote_average)`, { ascending: filters.sortOrder === 'asc', nullsFirst: false });
							request = request.order(`media(tmdb_vote_average)`, { ascending: filters.sortOrder === 'asc', nullsFirst: false });
							break;
						default:
							break;
					}
				}
			}
			return await request;
		},
		mediaKeys.personFilms({
			locale: locale,
			id: id,
			filters: filters,
		}),
		{ revalidate: MEDIA_REVALIDATE_TIME }
	)();
};

/* -------------------------------------------------------------------------- */
  