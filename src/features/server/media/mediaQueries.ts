import { createServerClient } from "@/lib/supabase/server";
import { createAnonClient } from "@/lib/supabase/anon";
import { cache } from "@/lib/utils/cache";
import { MediaMovie, MediaTvSeries, MediaTvSeriesSeason } from "@recomendapp/types";
import { mediaKeys } from "./mediaKeys";
import { cache as reactCache } from "react";

export const MEDIA_REVALIDATE_TIME = 60 * 60 * 24; // 24 hours

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    MOVIE                                   */
/* -------------------------------------------------------------------------- */
export const getMovie = cache(
	async (locale: string, id: number) => {
		const supabase = createAnonClient(locale);
		const { data: film, error } = await supabase
			.from('media_movie_full')
			.select(`
				*,
				cast:media_movie_casting(
					*,
					person:media_person(*)
				)
			`)
			.eq('id', id)
			.maybeSingle()
			.overrideTypes<MediaMovie, { merge: true }>();
		if (error) throw error;
		return film;
	}, {
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['media'],
	},
	mediaKeys.specify('movie')
);
export const getMovieUserActivitiesFollowerAverageRating = reactCache(async ({
	movieId,
} : {
	movieId: number;
}) => {
	const supabase = await createServerClient();
	const { data, error } = await supabase
		.from('user_activities_movie_follower_average_rating')
		.select(`*`)
		.match({
			movie_id: movieId,
		})
		.maybeSingle();
	if (error) throw error;
	return data;
});
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  TV_SERIES                                 */
/* -------------------------------------------------------------------------- */
export const getTvSeries = cache(
	async (locale: string, id: number) => {
		const supabase = createAnonClient(locale);
		const { data, error } = await supabase
			.from('media_tv_series_full')
			.select(`
				*,
				cast:media_tv_series_casting(
					*,
					person:media_person(*)
				),
				seasons:media_tv_series_seasons(*)
			`)
			.eq('id', id)
			.maybeSingle()
			.overrideTypes<MediaTvSeries, { merge: true }>();
		if (error) throw error;
		if (!data) return data;
		const specials = data?.seasons?.filter(season => season.season_number === 0) || [];
		const regularSeasons = data?.seasons?.filter(season => season.season_number !== 0) || [];
		const tvSeries: MediaTvSeries = {
			...data!,
			seasons: regularSeasons.sort((a, b) => a.season_number! - b.season_number!),
			specials: specials.sort((a, b) => a.season_number! - b.season_number!)
		};
		return tvSeries;
	}, {
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['media'],
	},
	mediaKeys.specify('tv_series')
);
export const getTvSeriesUserActivitiesFollowerAverageRating = reactCache(async ({
	tvSeriesId,
} : {
	tvSeriesId: number;
}) => {
	const supabase = await createServerClient();
	const { data, error } = await supabase
		.from('user_activities_tv_series_follower_average_rating')
		.select(`*`)
		.match({
			tv_series_id: tvSeriesId,
		})
		.maybeSingle();
	if (error) throw error;
	return data;
});

export const getTvSeason = cache(
	async (locale: string, serieId: number, seasonNumber: number) => {
		const supabase = createAnonClient(locale);
		const { data, error } = await supabase
			.from('media_tv_series_seasons')
			.select(`
				*,
				episodes:media_tv_series_episodes(
					*
				),
				serie:media_tv_series(
					id,
					name
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
	}, {
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['media'],
	},
	mediaKeys.specify('tv_series')
);

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   PERSON                                   */
/* -------------------------------------------------------------------------- */

export const getPerson = cache(
	async (locale: string, id: number) => {
		const supabase = createAnonClient(locale);
		const { data: person, error } = await supabase
			.from('media_person')
			.select(`
				*,
				movies:media_movie_aggregate_credits(*, movie:media_movie!inner(*)),
				tv_series:media_tv_series_aggregate_credits(*, tv_series:media_tv_series!inner(*)),
				jobs:media_person_jobs(*)
			`)
			.match({
				'id': id,
			})
			.filter('movies.movie.release_date', 'not.is', null)
			.filter('tv_series.last_appearance_date', 'not.is', null)
			.order('movie(release_date)', { referencedTable: 'movies', ascending: false })
			.order('last_appearance_date', { referencedTable: 'tv_series', ascending: false })
			.limit(10, { foreignTable: 'movies' })
			.limit(10, { foreignTable: 'tv_series' })
			.maybeSingle();
		if (error) throw error;
		return person;
	}, {
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['media'],
	},
	mediaKeys.specify('person')
);

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
		const supabase = createAnonClient(locale);
		let from = (filters.page - 1) * filters.perPage;
		let to = from + filters.perPage - 1;
		let request;
		if (filters.department || filters.job) {
			request = supabase
				.from('tmdb_movie_credits')
				.select(`
					*,
					movie:media_movie!inner(*)
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
					movie:media_movie!inner(*)
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
						request = request.order(`movie(release_date)`, { ascending: filters.sortOrder === 'asc' });
						break;
					case 'vote_average':
						request = request.order(`movie(vote_average)`, { ascending: false });
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
		return await request
			.filter('movie.release_date', 'not.is', null)
			.overrideTypes<Array<{
				movie: MediaMovie;
			}>, { merge: true }>()
	}, {
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['media'],
	},
	mediaKeys.personFilms()
);

export const getPersonTvSeries = cache(
	async (
		locale: string,
		id: number,
		filters: {
			page: number;
			perPage: number;
			sortBy: 'last_appearance_date' | 'release_date' | 'vote_average';
			sortOrder: 'asc' | 'desc';
			department?: string;
			job?: string;
		}
	) => {
		const supabase = createAnonClient(locale);
		let from = (filters.page - 1) * filters.perPage;
		let to = from + filters.perPage - 1;
		let request;
		if (filters.department || filters.job) {
			request = supabase
				.from('tmdb_tv_series_credits')
				.select(`
					*,
					tv_series:media_tv_series!inner(*)
				`, {
					count: 'exact',
				})
				.match({ 'person_id': id })
				.range(from, to);
		} else {
			request = supabase
				.from('media_tv_series_aggregate_credits')
				.select(`
					*,
					tv_series:media_tv_series!inner(*)
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
						request = request.order(`tv_series(first_air_date)`, { ascending: filters.sortOrder === 'asc' });
						break;
					case 'vote_average':
						request = request.order(`tv_series(vote_average)`, { ascending: false });
						break;
					default:
						if (!filters.department && !filters.job) {
							request = request.order(`last_appearance_date`, { ascending: filters.sortOrder === 'asc' });
						}
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
		if (!filters.department && !filters.job) {
			request = request.filter('last_appearance_date', 'not.is', null);
		}
		return await request
			.overrideTypes<Array<{
			tv_series: MediaTvSeries;
			}>, { merge: true }>()
	}, {
		revalidate: MEDIA_REVALIDATE_TIME,
		tags: ['media'],
	},
	mediaKeys.personTvSeries()
);

/* -------------------------------------------------------------------------- */
  