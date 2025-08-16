import { useSupabaseClient } from '@/context/supabase-context';
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { mediaKeys } from "./mediaKeys";

/* --------------------------------- DETAILS -------------------------------- */
export const useMediaMovieDetailsQuery = ({
	id,
	locale,
} : {
	id?: number;
	locale: string;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: mediaKeys.detail({ id: id as number, type: 'movie' }),
		queryFn: async () => {
			if (!id) throw Error('No id or type provided');
			const { data, error } = await supabase
				.from('media_movie')
				.select(`
					*,
					videos:tmdb_movie_videos(*)	
				`)
				.eq('id', id)
				.eq('videos.iso_639_1', locale)
				.single();
			if (error) throw error;
			return data;
		},
		enabled: !!id && !!locale,
	});
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- REVIEWS -------------------------------- */
export const useMediaReviewsMovieInfiniteQuery = ({
	movieId,
	filters,
} : {
	movieId: number;
	filters: {
		perPage: number;
		sortBy: 'updated_at';
		sortOrder: 'asc' | 'desc';
	};
}) => {
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: mediaKeys.reviews({
			id: movieId,
			type: 'movie',
			filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * filters.perPage;
	  		let to = from - 1 + filters.perPage;
			let request = supabase
				.from('user_reviews_movie')
				.select(`
					*,
					activity:user_activities_movie!inner(*, user(*))
				`)
				.eq('activity.movie_id', movieId)
				.range(from, to)
			
			if (filters) {
				if (filters.sortBy && filters.sortOrder) {
					switch (filters.sortBy) {
						case 'updated_at':
							request = request.order('updated_at', { ascending: filters.sortOrder === 'asc' });
							break;
						default:
							break;
					}
				}
			}
			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == filters.perPage ? pages.length + 1 : undefined;
		},
		enabled: !!movieId,
	});

};
export const useMediaReviewsTvSeriesInfiniteQuery = ({
	tvSeriesId,
	filters,
} : {
	tvSeriesId: number;
	filters: {
		perPage: number;
		sortBy: 'updated_at';
		sortOrder: 'asc' | 'desc';
	};
}) => {
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: mediaKeys.reviews({
			id: tvSeriesId,
			type: 'tv_series',
			filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * filters.perPage;
	  		let to = from - 1 + filters.perPage;
			let request = supabase
				.from('user_reviews_tv_series')
				.select(`
					*,
					activity:user_activities_tv_series!inner(*, user(*))
				`)
				.eq('activity.tv_series_id', tvSeriesId)
				.range(from, to)

			if (filters) {
				if (filters.sortBy && filters.sortOrder) {
					switch (filters.sortBy) {
						case 'updated_at':
							request = request.order('updated_at', { ascending: filters.sortOrder === 'asc' });
							break;
						default:
							break;
					}
				}
			}
			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == filters.perPage ? pages.length + 1 : undefined;
		},
		enabled: !!tvSeriesId,
	});
};
/* -------------------------------------------------------------------------- */

/* -------------------------------- PLAYLISTS ------------------------------- */
export const useMediaPlaylistsMovieInfiniteQuery = ({
	movieId,
	filters,
} : {
	movieId: number;
	filters: {
		perPage: number;
		sortBy: 'created_at' | 'updated_at' | 'likes_count';
		sortOrder: 'asc' | 'desc';
	};
}) => {
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: mediaKeys.playlists({
			id: movieId,
			type: 'movie',
			filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * filters.perPage;
	  		let to = from - 1 + filters.perPage;
			let request = supabase
				.from('playlists')
				.select('*, user(*), playlist_items_movie!inner(*)')
				.match({
					'type': 'movie',
					'playlist_items_movie.movie_id': movieId,
				})
				.range(from, to);

			if (filters) {
				if (filters.sortBy && filters.sortOrder) {
					switch (filters.sortBy) {
						case 'updated_at':
							request = request.order('updated_at', { ascending: filters.sortOrder === 'asc' });
							break;
						case 'likes_count':
							request = request.order('likes_count', { ascending: filters.sortOrder === 'asc' });
							break;
						default:
							request = request.order('created_at', { ascending: filters.sortOrder === 'asc' });
							break;
					}
				}
			}
			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == filters.perPage ? pages.length + 1 : undefined;
		},
		enabled: !!movieId,
	});
};
export const useMediaPlaylistsTvSeriesInfiniteQuery = ({
	tvSeriesId,
	filters,
} : {
	tvSeriesId: number;
	filters: {
		perPage: number;
		sortBy: 'created_at' | 'updated_at' | 'likes_count';
		sortOrder: 'asc' | 'desc';
	};
}) => {
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: mediaKeys.playlists({
			id: tvSeriesId,
			type: 'tv_series',
			filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * filters.perPage;
	  		let to = from - 1 + filters.perPage;
			let request = supabase
				.from('playlists')
				.select('*, user(*), playlist_items_tv_series!inner(*)')
				.match({
					'type': 'tv_series',
					'playlist_items_tv_series.tv_series_id': tvSeriesId,
				})
				.range(from, to);

			if (filters) {
				if (filters.sortBy && filters.sortOrder) {
					switch (filters.sortBy) {
						case 'updated_at':
							request = request.order('updated_at', { ascending: filters.sortOrder === 'asc' });
							break;
						case 'likes_count':
							request = request.order('likes_count', { ascending: filters.sortOrder === 'asc' });
							break;
						default:
							request = request.order('created_at', { ascending: filters.sortOrder === 'asc' });
							break;
					}
				}
			}
			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == filters.perPage ? pages.length + 1 : undefined;
		},
		enabled: !!tvSeriesId,
	});
};
/* -------------------------------------------------------------------------- */
