import { unstable_cache as cache } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { searchKeys } from "./searchKeys";
import { MEDIA_REVALIDATE_TIME } from "../media/mediaQueries";
import { getTmdbSearchMovies, getTmdbSearchMulti, getTmdbSearchPersons, getTmdbSearchTvSeries } from "@/lib/tmdb/tmdbQueries";

export const getSearchMulti = async (
	props: {
		locale: string;
		filters: {
			query: string;
			page: number;
		}
	}
) => {
	return await cache(
		async () => {
			return await getTmdbSearchMulti({
				query: props.filters.query,
				language: props.locale,
				page: props.filters.page
			});
		},
		searchKeys.multi({
			locale: props.locale,
			query: props.filters.query,
			filters: props.filters
		}),
		{ revalidate: MEDIA_REVALIDATE_TIME }
	)();
};

export const getSearchMovies = async (
	props: {
		locale: string;
		filters: {
			query: string;
			page: number;
		}
	}
) => {
	return await cache(
		async () => {
			return await getTmdbSearchMovies({
				query: props.filters.query,
				language: props.locale,
				page: props.filters.page
			});
		},
		searchKeys.movies({
			locale: props.locale,
			query: props.filters.query,
			filters: props.filters
		}),
		{ revalidate: MEDIA_REVALIDATE_TIME }
	)();
};

export const getSearchTvSeries = async (
	props: {
		locale: string;
		filters: {
			query: string;
			page: number;
		}
	}
) => {
	return await cache(
		async () => {
			return await getTmdbSearchTvSeries({
				query: props.filters.query,
				language: props.locale,
				page: props.filters.page
			});
		},
		searchKeys.tvSeries({
			locale: props.locale,
			query: props.filters.query,
			filters: props.filters
		}),
		{ revalidate: MEDIA_REVALIDATE_TIME }
	)();
};

export const getSearchPersons = async (
	props: {
		locale: string;
		filters: {
			query: string;
			page: number;
		}
	}
) => {
	return await cache(
		async () => {
			return await getTmdbSearchPersons({
				query: props.filters.query,
				language: props.locale,
				page: props.filters.page
			});
		},
		searchKeys.persons({
			locale: props.locale,
			query: props.filters.query,
			filters: props.filters
		}),
		{ revalidate: MEDIA_REVALIDATE_TIME }
	)();
};

export const getSearchPlaylists = async (
	props: {
		locale: string;
		filters: {
			query: string;
			page: number;
			perPage: number;
			sortBy: 'created_at' | 'updated_at';
			sortOrder: 'asc' | 'desc';
		}
	}
) => {
	// We cannot use cache here because results on users (cookies)
	// return await (
	// 	async () => {
			const supabase = await createServerClient(props.locale);
			let from = (props.filters.page - 1) * props.filters.perPage;
			let to = from + props.filters.perPage - 1;
			let request = supabase
				.from('playlists')
				.select('*, playlist:playlists(*)', { count: 'exact' })
				.range(from, to)
				.ilike('title', `%${props.filters.query}%`)
			
			if (props.filters) {
				if (props.filters.sortBy && props.filters.sortOrder) {
					switch (props.filters.sortBy) {
						case 'created_at':
							request = request.order('created_at', { referencedTable: 'playlist', ascending: props.filters.sortOrder === 'asc', nullsFirst: false });
							break;
						case 'updated_at':
							request = request.order('updated_at', { referencedTable: 'playlist', ascending: props.filters.sortOrder === 'asc', nullsFirst: false });
							break;
						default:
							throw new Error('Invalid sortBy');
					}
				}
			}
			return await request;
	// 	}
	// )
};