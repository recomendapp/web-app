import { routing } from "@/lib/i18n/routing";
import { createServerClient } from "@/lib/supabase/server";
import { cache } from "react";

/* ---------------------------------- USERS --------------------------------- */
export const getSitemapUserCount = cache(async (perPage: number = 10000): Promise<number> => {
	const supabase = await createServerClient();
	const { count, error } = await supabase
		.from('user')
		.select('*', { count: 'exact', head: true })
		.eq('private', false);
	if (error) throw error;
	if (count === null) {
		return 0;
	}
	return count ? Math.ceil(count / perPage) : 0;
});

export const getSitemapUsers = cache(async (id: number, perPage: number = 10000) => {
	const start = id * perPage;
	const end = start + perPage - 1;
	const supabase = await createServerClient();
	const { data, error } = await supabase
		.from('user')
		.select('id, username, created_at')
		.eq('private', false)
		.range(start, end)
	if (error) throw error;
	return data || [];
});
/* -------------------------------------------------------------------------- */

/* --------------------------------- MEDIAS --------------------------------- */
// Movies
export const getSitemapMediaMovieCount = cache(async (perPage: number = 500) => {
	const supabase = await createServerClient();
	const { count, error } = await supabase
		.from('tmdb_movie')
		.select('*', { count: 'exact', head: true });
	if (error) throw error;
	if (count === null) {
		return 0;
	}
	return count ? Math.ceil(count / perPage) : 0;
});
export const getSitemapMediaMovies = cache(async (id: number, perPage: number = 500) => {
	const start = id * perPage;
	const end = start + perPage - 1;
	const supabase = await createServerClient();
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
		.range(start, end);
	if (error) throw error;
	return data || [];
});

// TV Series
export const getSitemapMediaTvSeriesCount = cache(async (perPage: number = 500) => {
	const supabase = await createServerClient();
	const { count, error } = await supabase
		.from('tmdb_tv_series')
		.select('*', { count: 'exact', head: true });
	if (error) throw error;
	if (count === null) {
		return 0;
	}
	return count ? Math.ceil(count / perPage) : 0;
});

export const getSitemapMediaTvSeries = cache(async (id: number, perPage: number = 500) => {
	const start = id * perPage;
	const end = start + perPage - 1;
	const supabase = await createServerClient();
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
		.range(start, end);
	if (error) throw error;
	return data || [];
});


export const getSitemapMediaCount = cache(async (perPage: number = 500) => {
	const supabase = await createServerClient();
	const { count: filmCount, error: filmError } = await supabase
		.from('tmdb_movie')
		.select('*', { count: 'exact', head: true });
	if (filmError) throw filmError;
	const { count: seriesCount, error: seriesError } = await supabase
		.from('tmdb_tv_series')
		.select('*', { count: 'exact', head: true });
	if (seriesError) throw seriesError;

	return {
		films: filmCount ? Math.ceil(filmCount / perPage) : 0,
		series: seriesCount ? Math.ceil(seriesCount / perPage) : 0,
	}
});

/* -------------------------------------------------------------------------- */

/* -------------------------------- PLAYLISTS ------------------------------- */
export const getSitemapPlaylistCount = cache(async (perPage: number = 10000): Promise<number> => {
	const supabase = await createServerClient();
	const { count, error } = await supabase
		.from('playlists')
		.select('*', { count: 'exact', head: true })
		.eq('private', false);
	if (error) throw error;
	if (count === null) {
		return 0;
	}
	return count ? Math.ceil(count / perPage) : 0;
});
export const getSitemapPlaylists = cache(async (id: number, perPage: number = 10000) => {
	const start = id * perPage;
	const end = start + perPage - 1;
	const supabase = await createServerClient();
	const { data, error } = await supabase
		.from('playlists')
		.select('id, title, updated_at')
		.eq('private', false)
		.range(start, end);
	if (error) throw error;
	return data || [];
});
/* -------------------------------------------------------------------------- */

/* --------------------------------- REVIEWS -------------------------------- */
export const getSitemapReviewCount = cache(async (perPage: number = 10000): Promise<number> => {
	const supabase = await createServerClient();
	const { count, error } = await supabase
		.from('user_review')
		.select('*', { count: 'exact', head: true })
	if (error) throw error;
	if (count === null) {
		return 0;
	}
	return count ? Math.ceil(count / perPage) : 0;
});
export const getSitemapReviews = cache(async (id: number, perPage: number = 10000) => {
	const start = id * perPage;
	const end = start + perPage - 1;
	const supabase = await createServerClient();
	const { data, error } = await supabase
		.from('user_review')
		.select('id, updated_at')
		.range(start, end);
	if (error) throw error;
	return data || [];
});
/* -------------------------------------------------------------------------- */