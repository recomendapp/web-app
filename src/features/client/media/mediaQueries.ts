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
	mediaId,
	mediaType,
	filters,
} : {
	mediaId: number;
	mediaType: MediaType;
	filters?: {
		resultsPerPage?: number;
		order?:
			'updated_at-desc' |
			'updated_at-asc' |
			'rating-desc' |
			'rating-asc' |
			'likes_count-desc' |
			'likes_count-asc';
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		order: 'updated_at-desc',
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: mediaKeys.reviews({
			mediaId,
			mediaType,
			filters: mergedFilters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			if (!mediaId || !mediaType) throw Error('No media id or type provided');
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
	  		let to = from - 1 + mergedFilters.resultsPerPage;
			let request = supabase
				.from('user_review_activity')
				.select(`
					*,
					user(*)
				`)
				.match({
					media_id: mediaId,
					media_type: mediaType,
				})
				.range(from, to)
			
			if (mergedFilters) {
				if (mergedFilters.order) {
					const [ column, direction ] = mergedFilters.order.split('-');
					request = request.order(column, { ascending: direction === 'asc', nullsFirst: false });
				}
			}
			const { data, error } = await request
				.returns<UserReview[]>();
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!mediaId && !!mediaType,
	});

};
/* -------------------------------------------------------------------------- */

/* -------------------------------- PLAYLISTS ------------------------------- */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   PERSON                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------- FILMOGRAPHY ------------------------------ */
export const useMediaPersonMostRatedInfiniteQuery = ({
	personId,
	filters,
} : {
	personId: number;
	filters?: {
		resultsPerPage?: number;
		limit?: number;
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		limit: 10,
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: mediaKeys.mostRated({ personId, filters: mergedFilters }),
		queryFn: async ({ pageParam = 1}) => {
			if (!personId) throw Error('No person id provided');
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
			let to = from - 1 + mergedFilters.resultsPerPage;
			let request = supabase
				.from('media_person_combined_credits')
				.select('*')
				.eq('person_id', personId)
				.order('popularity', { ascending: false, nullsFirst: false })
				.order('tmdb_popularity', { ascending: false, nullsFirst: false })
				.range(from, to);
			if (mergedFilters) {
				if (mergedFilters.limit) {
					request = request.limit(mergedFilters.limit);
				}
			}
			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!personId,
	});
};
/* -------------------------------------------------------------------------- */