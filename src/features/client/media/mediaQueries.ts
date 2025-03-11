import { MediaType, UserReview } from "@/types/type.db";
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
export const useMediaReviewsInfiniteQuery = ({
	id,
	filters,
} : {
	id: number;
	filters: {
		perPage: number;
		sortBy: 'updated_at';
		sortOrder: 'asc' | 'desc';
	};
}) => {
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: mediaKeys.reviews({
			id,
			filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * filters.perPage;
	  		let to = from - 1 + filters.perPage;
			let request = supabase
				.from('user_review')
				.select(`
					*,
					activity:user_activity!inner(*, user(*))
				`)
				.eq('activity.media_id', id)
				.range(from, to)
			
			if (filters) {
				if (filters.sortBy && filters.sortOrder) {
					switch (filters.sortBy) {
						case 'updated_at':
							request = request.order('updated_at', { ascending: filters.sortOrder === 'asc', nullsFirst: false });
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
		enabled: !!id,
	});

};
/* -------------------------------------------------------------------------- */
export const useMediaPlaylistsInfiniteQuery = ({
	id,
	filters,
} : {
	id: number;
	filters: {
		perPage: number;
		sortBy: 'created_at' | 'updated_at' | 'likes_count';
		sortOrder: 'asc' | 'desc';
	};
}) => {
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: mediaKeys.playlists({
			id,
			filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * filters.perPage;
	  		let to = from - 1 + filters.perPage;
			let request = supabase
				.from('playlists')
				.select('*, playlist_items!inner(*)')
				.match({
					'playlist_items.media_id': id,
				})
				.range(from, to);
			
			if (filters) {
				if (filters.sortBy && filters.sortOrder) {
					request = request.order(filters.sortBy, { ascending: filters.sortOrder === 'asc', nullsFirst: false });
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
		enabled: !!id,
	});
};
/* -------------------------------- PLAYLISTS ------------------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   PERSON                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------- FILMOGRAPHY ------------------------------ */
// export const useMediaPersonMostRatedInfiniteQuery = ({
// 	personId,
// 	filters,
// } : {
// 	personId: number;
// 	filters?: {
// 		resultsPerPage?: number;
// 		limit?: number;
// 	};
// }) => {
// 	const mergedFilters = {
// 		resultsPerPage: 20,
// 		limit: 10,
// 		...filters,
// 	};
// 	const supabase = useSupabaseClient();
// 	return useInfiniteQuery({
// 		queryKey: mediaKeys.mostRated({ personId, filters: mergedFilters }),
// 		queryFn: async ({ pageParam = 1}) => {
// 			if (!personId) throw Error('No person id provided');
// 			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
// 			let to = from - 1 + mergedFilters.resultsPerPage;
// 			let request = supabase
// 				.from('media_person_combined_credits')
// 				.select('*')
// 				.eq('person_id', personId)
// 				.order('popularity', { ascending: false, nullsFirst: false })
// 				.order('tmdb_popularity', { ascending: false, nullsFirst: false })
// 				.range(from, to);
// 			if (mergedFilters) {
// 				if (mergedFilters.limit) {
// 					request = request.limit(mergedFilters.limit);
// 				}
// 			}
// 			const { data, error } = await request;
// 			if (error) throw error;
// 			return data;
// 		},
// 		initialPageParam: 1,
// 		getNextPageParam: (lastPage, pages) => {
// 			return lastPage?.length == mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
// 		},
// 		enabled: !!personId,
// 	});
// };
/* -------------------------------------------------------------------------- */