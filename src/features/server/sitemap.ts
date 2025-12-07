import { routing } from "@/lib/i18n/routing";
import { createClient } from "@/lib/supabase/server-no-cookie";
import { MEDIA_REVALIDATE_TIME } from "./media/mediaQueries";
import { cache } from "@/lib/utils/cache";

const USER_REVALIDATE_TIME = 60 * 60 * 24; // 24 hours
const PLAYLIST_REVALIDATE_TIME = 60 * 60 * 24; // 24 hours
const REVIEW_REVALIDATE_TIME = 60 * 60 * 24; // 24 hours

/* ---------------------------------- USERS --------------------------------- */
const USER_PER_PAGE = 10000;
export const getSitemapUserCount = cache(
	async (perPage: number = USER_PER_PAGE): Promise<number> => {
		const supabase = await createClient(routing.defaultLocale);
		const { count, error } = await supabase
			.from('profile')
			.select('*', { count: 'exact', head: true })
			.eq('private', false);
		if (error) throw error;
		if (count === null) {
			return 0;
		}
		return count ? Math.ceil(count / perPage) : 0;
	},
	{ revalidate: USER_REVALIDATE_TIME },
);
export const getSitemapUsers = cache(
	async (id: number, perPage: number = USER_PER_PAGE) => {
		const start = id * perPage;
		const end = start + perPage - 1;
		const supabase = await createClient(routing.defaultLocale);
		const { data, error } = await supabase
			.from('profile')
			.select('id, username, created_at')
			.eq('private', false)
			.range(start, end)
			.order('created_at', { ascending: true });
		if (error) throw error;
		return data || [];
	},
	{ revalidate: USER_REVALIDATE_TIME },
);
/* -------------------------------------------------------------------------- */

/* --------------------------------- MEDIAS --------------------------------- */
// Movies
const MEDIA_MOVIE_PER_PAGE = 500;
export const getSitemapMediaMovieCount = cache(
	async (perPage: number = MEDIA_MOVIE_PER_PAGE) => {
		const supabase = await createClient(routing.defaultLocale);
		const { count, error } = await supabase
			.from('tmdb_movie')
			.select('*', { count: 'exact', head: true });
		if (error) throw error;
		if (count === null) {
			return 0;
		}
		return count ? Math.ceil(count / perPage) : 0;
	},
	{ revalidate: MEDIA_REVALIDATE_TIME },
);
export const getSitemapMediaMovies = cache(
	async (id: number, perPage: number = MEDIA_MOVIE_PER_PAGE) => {
		const start = id * perPage;
		const end = start + perPage - 1;
		const supabase = await createClient(routing.defaultLocale);
		const { data, error } = await supabase
			.from('tmdb_movie')
			.select(`
				id,
				original_title,
				tmdb_movie_translations(
					iso_639_1,
					iso_3166_1,
					title
				)
			`)
			.range(start, end)
			.order('id', { ascending: true });
		if (error) throw error;
		return data || [];
	},
	{ revalidate: MEDIA_REVALIDATE_TIME },
);

// TV Series
const MEDIA_TV_SERIES_PER_PAGE = 500;
export const getSitemapMediaTvSeriesCount = cache(
	async (perPage: number = MEDIA_TV_SERIES_PER_PAGE) => {
		const supabase = await createClient(routing.defaultLocale);
		const { count, error } = await supabase
			.from('tmdb_tv_series')
			.select('*', { count: 'exact', head: true });
		if (error) throw error;
		if (count === null) {
			return 0;
		}
		return count ? Math.ceil(count / perPage) : 0;
	},
	{ revalidate: MEDIA_REVALIDATE_TIME },
);
export const getSitemapMediaTvSeries = cache(
	async (id: number, perPage: number = MEDIA_TV_SERIES_PER_PAGE) => {
		const start = id * perPage;
		const end = start + perPage - 1;
		const supabase = await createClient(routing.defaultLocale);
		const { data, error } = await supabase
			.from('tmdb_tv_series')
			.select(`
				id,
				original_name,
				tmdb_tv_series_translations(
					iso_639_1,
					iso_3166_1,
					name
				)
			`)
			.range(start, end)
			.order('id', { ascending: true });
		if (error) throw error;
		return data || [];
	},
	{ revalidate: MEDIA_REVALIDATE_TIME },
);
/* -------------------------------------------------------------------------- */

/* -------------------------------- PLAYLISTS ------------------------------- */
const PLAYLIST_PER_PAGE = 10000;
export const getSitemapPlaylistCount = cache(
	async (perPage: number = PLAYLIST_PER_PAGE): Promise<number> => {
		const supabase = await createClient(routing.defaultLocale);
		const { count, error } = await supabase
			.from('playlists')
			.select('*', { count: 'exact', head: true })
			// .eq('private', false); // RLS already handles this
		if (error) throw error;
		if (count === null) {
			return 0;
		}
		return count ? Math.ceil(count / perPage) : 0;
	},
	{ revalidate: PLAYLIST_REVALIDATE_TIME }
);
export const getSitemapPlaylists = cache(
	async (id: number, perPage: number = PLAYLIST_PER_PAGE) => {
		const start = id * perPage;
		const end = start + perPage - 1;
		const supabase = await createClient(routing.defaultLocale);
		const { data, error } = await supabase
			.from('playlists')
			.select('id, title, updated_at')
			.range(start, end)
			.order('id', { ascending: true });
		if (error) throw error;
		return data || [];
	},
	{ revalidate: PLAYLIST_REVALIDATE_TIME }
);
/* -------------------------------------------------------------------------- */

/* --------------------------------- REVIEWS -------------------------------- */
const REVIEW_PER_PAGE = 10000;
export const getSitemapReviewMovieCount = cache(
	async (perPage: number = REVIEW_PER_PAGE): Promise<number> => {
		const supabase = await createClient(routing.defaultLocale);
		const { count, error } = await supabase
			.from('user_reviews_movie')
			.select('*', { count: 'exact', head: true })
		if (error) throw error;
		if (count === null) {
			return 0;
		}
		return count ? Math.ceil(count / perPage) : 0;
	},
	{ revalidate: REVIEW_REVALIDATE_TIME },
);
export const getSitemapReviewTvSeriesCount = cache(
	async (perPage: number = REVIEW_PER_PAGE): Promise<number> => {
		const supabase = await createClient(routing.defaultLocale);
		const { count, error } = await supabase
			.from('user_reviews_tv_series')
			.select('*', { count: 'exact', head: true })
		if (error) throw error;
		if (count === null) {
			return 0;
		}
		return count ? Math.ceil(count / perPage) : 0;
	},
	{ revalidate: REVIEW_REVALIDATE_TIME },
);

export const getSitemapReviewsMovie = cache(
	async (id: number, perPage: number = REVIEW_PER_PAGE) => {
		const start = id * perPage;
		const end = start + perPage - 1;
		const supabase = await createClient(routing.defaultLocale);
		const { data, error } = await supabase
			.from('user_reviews_movie')
			.select('id, updated_at, activity:user_activities_movie(movie_id)')
			.range(start, end)
			.order('created_at', { ascending: true });
		if (error) throw error;
		return data || [];
	},
	{ revalidate: REVIEW_REVALIDATE_TIME },
);
export const getSitemapReviewsTvSeries = cache(
	async (id: number, perPage: number = REVIEW_PER_PAGE) => {
		const start = id * perPage;
		const end = start + perPage - 1;
		const supabase = await createClient(routing.defaultLocale);
		const { data, error } = await supabase
			.from('user_reviews_tv_series')
			.select('id, updated_at, activity:user_activities_tv_series(tv_series_id)')
			.range(start, end)
			.order('created_at', { ascending: true });
		if (error) throw error;
		return data || [];
	},
	{ revalidate: REVIEW_REVALIDATE_TIME },
);
/* -------------------------------------------------------------------------- */