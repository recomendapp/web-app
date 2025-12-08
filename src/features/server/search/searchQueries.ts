import { createServerClient } from "@/lib/supabase/server";
import { searchKeys } from "./searchKeys";
import { getTmdbSearchMovies, getTmdbSearchMulti, getTmdbSearchPersons, getTmdbSearchTvSeries } from "@/lib/tmdb/tmdbQueries";
import { MEDIA_REVALIDATE_TIME } from "../media/mediaQueries";
import { cache } from "@/lib/utils/cache";

export const getSearchMulti = cache(
	async (
		locale: string,
		filters: {
			query: string;
			page: number;
		}
	) => {
		return await getTmdbSearchMulti({
			query: filters.query,
			language: locale,
			page: filters.page
		});
	},
	{ revalidate: MEDIA_REVALIDATE_TIME },
	searchKeys.multi(),
);

export const getSearchMovies = cache(
	async (
		locale: string,
		filters: {
			query: string;
			page: number;
		}
	) => {
		return await getTmdbSearchMovies({
			query: filters.query,
			language: locale,
			page: filters.page
		});
	},
	{ revalidate: MEDIA_REVALIDATE_TIME },
	searchKeys.movies(),
);

export const getSearchTvSeries = cache(
	async (
		locale: string,
		filters: {
			query: string;
			page: number;
		}
	) => {
		return await getTmdbSearchTvSeries({
			query: filters.query,
			language: locale,
			page: filters.page
		});
	},
	{ revalidate: MEDIA_REVALIDATE_TIME },
	searchKeys.tvSeries(),
);

export const getSearchPersons = cache(
	async (
		locale: string,
		filters: {
			query: string;
			page: number;
		}
	) => {
		return await getTmdbSearchPersons({
			query: filters.query,
			language: locale,
			page: filters.page
		});
	},
	{ revalidate: MEDIA_REVALIDATE_TIME },
	searchKeys.persons(),
);

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
			const supabase = await createServerClient();
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
							request = request.order('created_at', { referencedTable: 'playlist', ascending: props.filters.sortOrder === 'asc' });
							break;
						case 'updated_at':
							request = request.order('updated_at', { referencedTable: 'playlist', ascending: props.filters.sortOrder === 'asc' });
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