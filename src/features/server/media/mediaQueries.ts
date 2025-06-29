import { mediaKeys } from "@/features/server/media/mediaKeys";
import { createServerClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server-no-cookie";
import { cache } from "@/lib/utils/cache";
import { Media, MediaMovie, MediaTvSeries, MediaTvSeriesSeason } from "@/types/type.db";

export const MEDIA_REVALIDATE_TIME = 60 * 60 * 24; // 24 hours

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
export const getMedia = cache(
	async (locale: string, id: number) => {
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
	{ revalidate: MEDIA_REVALIDATE_TIME },
	mediaKeys.detail()
);
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    MOVIE                                   */
/* -------------------------------------------------------------------------- */
export const getMovie = cache(
	async (locale: string, id: number) => {
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
			.order('published_at', { referencedTable: 'videos', ascending: true })
			.returns<MediaMovie[]>()
			.maybeSingle();
		if (error) throw error;
		return film;
	},
	{
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['tmdb']
	},
	mediaKeys.specify('movie'),
);
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  TV_SERIES                                 */
/* -------------------------------------------------------------------------- */
export const getTvSeries = cache(
	async (locale: string, id: number) => {
		const supabase = await createClient(locale);
		const { data: rawTvSeries, error } = await supabase
			.from('media_tv_series')
			.select(`
				*,
				cast:tmdb_tv_series_credits(
					*,
					person:media_person(*)
				),
				videos:tmdb_tv_series_videos(*),
				seasons:media_tv_series_seasons(*)
			`)
			.match({
				'id': id,
				'cast.job': 'Actor',
				'videos.iso_639_1': locale.split('-')[0],
				'videos.type': 'Trailer',
			})
			// .filter('seasons.season_number', 'neq', 0)
			.order('published_at', { referencedTable: 'videos', ascending: true })
			.maybeSingle()
			.overrideTypes<MediaTvSeries, { merge: false }>();
		if (error) throw error;
		if (!rawTvSeries) return rawTvSeries;
		const specials = rawTvSeries?.seasons?.filter(season => season.season_number === 0) || [];
		const regularSeasons = rawTvSeries?.seasons?.filter(season => season.season_number !== 0) || [];
		const tvSeries: MediaTvSeries = {
			...rawTvSeries!,
			seasons: regularSeasons,
			specials: specials,
		};
		return tvSeries;
	},
	{
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['tmdb']
	},
	mediaKeys.specify('tv_series'),
);

export const getTvSeason = cache(
	async (locale: string, serieId: number, seasonNumber: number) => {
		const supabase = await createClient(locale);
		const { data, error } = await supabase
			.from('media_tv_series_seasons')
			.select(`
				*,
				episodes:media_tv_series_episodes(
					*
				),
				serie:media_tv_series(
					id,
					title
				)
			`)
			.match({
				serie_id: serieId,
				season_number: seasonNumber,
			})
			.order('episode_number', { referencedTable: 'episodes', ascending: true })
			.maybeSingle()
			.overrideTypes<MediaTvSeriesSeason, { merge: false }>();
		if (error) throw error;
		return data;
	},
	{
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['tmdb']
	},
	mediaKeys.specify('tv_season')
);

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   PERSON                                   */
/* -------------------------------------------------------------------------- */

export const getPerson = cache(
	async (locale: string, id: number) => {
		const supabase = await createClient(locale);
		const { data: person, error } = await supabase
			.from('media_person')
			.select(`
				*,
				movies:media_movie_aggregate_credits(*, media:media_movie(*)),
				tv_series:tmdb_tv_series_credits(*, media:media_tv_series(*)),
				jobs:person_jobs(*)
			`)
			.match({
				'id': id,
			})
			.order('media(date)', { referencedTable: 'movies', ascending: false })
			.limit(10, { foreignTable: 'movies' })
			.limit(10, { foreignTable: 'tv_series' })
			.maybeSingle();
		if (error) throw error;
		return person;
	},
	{
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['tmdb']
	},
	mediaKeys.specify('person'),
);

// export const getPersonCombinedCredits = async ({
// 	id,
// 	locale,
// } : {
// 	id: number;
// 	locale: string;
// }) => {
// 	return await unstable_cache(
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

export const getPersonFilms = cache(
	async (
		locale: string,
		id: number,
		filters: {
			page: number;
			perPage: number;
			sortBy: 'release_date' | 'vote_average';
			sortOrder: 'asc' | 'desc';
			department?: string;
			job?: string;
		}
	) => {
		const supabase = await createClient(locale);
		let from = (filters.page - 1) * filters.perPage;
		let to = from + filters.perPage - 1;
		let request;
		if (filters.department || filters.job) {
			request = supabase
				.from('tmdb_movie_credits')
				.select(`
					*,
					media:media_movie(*)
				`, {
					count: 'exact',
				})
				.match({ 'person_id': id })
				.range(from, to);
		} else {
			request = supabase
				.from('media_movie_aggregate_credits')
				.select(`
					*,
					media:media_movie(*)
				`, {
					count: 'exact',
				})
				.match({ 'person_id': id })
				.range(from, to);
		}
		if (filters) {
			if (filters.sortBy && filters.sortOrder) {
				switch (filters.sortBy) {
					case 'release_date':
						request = request.order(`media(date)`, { ascending: filters.sortOrder === 'asc' });
						break;
					case 'vote_average':
						if (filters.sortOrder === 'asc') {
							request = request.order(`media(tmdb_vote_average)`, { ascending: true, nullsFirst: true });
							request = request.order(`media(vote_average)`, { ascending: true, nullsFirst: true });
						} else {
							request = request.order(`media(vote_average)`, { ascending: false, nullsFirst: false });
							request = request.order(`media(tmdb_vote_average)`, { ascending: false, nullsFirst: false });
						}
						break;
					default:
						break;
				}
			}
			if (filters.department) {
				request = request.eq('department', filters.department);
			}
			if (filters.job) {
				request = request.eq('job', filters.job);
			}
		}
		return await request.overrideTypes<Array<{
			media: Media;
		}>, { merge: true }>()
	},
	{ revalidate: MEDIA_REVALIDATE_TIME },
	mediaKeys.personFilms(),
);

/* -------------------------------------------------------------------------- */
  