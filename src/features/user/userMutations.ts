import { useSupabaseClient } from '@/context/supabase-context';
import { UserFollower } from '@/types/type.db';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './userKeys';

/**
 * Accepts a follower request
 * @returns The mutation
 */
export const useUserAcceptFollowerRequest = ({
	userId,
} : {
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			requestId,
		} : {
			requestId: number;
		}) => {
			const { error } = await supabase
				.from('user_follower')
				.update({
					is_pending: false,
				})
				.eq('id', requestId)
			if (error) throw error;
			return requestId;
		},
		onSuccess: (requestId) => {
			// Delete the request from the cache
			queryClient.setQueryData(userKeys.followersRequests(userId as string), (oldData: UserFollower[] | undefined) => {
				if (!oldData) return [];
				return oldData.filter((request) => request.id !== requestId);
			});
			// Invalidate the followees cache
			queryClient.invalidateQueries({queryKey: userKeys.followees(userId as string)});
		},
	});
};

/**
 * Declines a follower request
 * @returns The mutation
 */
export const useUserDeclineFollowerRequest = ({
	userId,
} : {
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			requestId,
		} : {
			requestId: number;
		}) => {
			const { error } = await supabase
				.from('user_follower')
				.delete()
				.eq('id', requestId)
			if (error) throw error;
			return requestId;
		},
		onSuccess: (requestId) => {
			// Delete the request from the cache
			queryClient.setQueryData(userKeys.followersRequests(userId as string), (oldData: UserFollower[] | undefined) => {
				if (!oldData) return [];
				return oldData.filter((request) => request.id !== requestId);
			});
		},
	});
};

export const useUserMovieActivityInsert = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			movieId,
			rating,
			isLiked,
		} : {
			userId?: string;
			movieId?: number;
			rating?: number;
			isLiked?: boolean;
		}) => {
			if (!userId || !movieId) throw Error('Missing profile id or movie id');
			const { data, error } = await supabase
				.from('user_movie_activity')
				.insert({
					user_id: userId,
					movie_id: movieId,
					rating: rating,
					is_liked: isLiked,
				})
				.select(`*, review:user_movie_review(*)`)
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.movieActivity(data.user_id as string, data.movie_id as number), data)

			// Remove movie from watchlist
			queryClient.setQueryData(userKeys.movieWatchlist(data.user_id as string, data.movie_id as number), null)
			// Invalidate watchlist
			queryClient.invalidateQueries({
				queryKey: userKeys.watchlist(data.user_id as string)
			});
			queryClient.invalidateQueries({
				queryKey: userKeys.collectionWatchlist(data.user_id as string)
			});
			// Invalidate guidelist
			queryClient.invalidateQueries({
				queryKey: userKeys.guidelist(data.user_id as string)
			});
			queryClient.invalidateQueries({
				queryKey: userKeys.collectionGuidelist(data.user_id as string)
			});
		}
	});
};

export const useUserMovieActivityDelete = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
		} : {
			activityId?: number;
		}) => {
			if (!activityId) throw Error('Missing activity id');
			const { data, error } = await supabase
				.from('user_movie_activity')
				.delete()
				.eq('id', activityId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.movieActivity(data.user_id, data.movie_id), null)

			// Invalidate watchlist
			queryClient.invalidateQueries({
				queryKey: userKeys.watchlist(data.user_id)
			});
			queryClient.invalidateQueries({
				queryKey: userKeys.collectionWatchlist(data.user_id)
			});
		}
	});
}

export const useUserMovieActivityUpdate = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
			rating,
			date,
			isLiked,
		} : {
			activityId?: number;
			rating?: number | null;
			date?: Date;
			isLiked?: boolean;
		}) => {
			if (!activityId) throw Error('Missing activity id');
			const { data, error } = await supabase
				.from('user_movie_activity')
				.update({
					rating: rating,
					date: date?.toISOString(),
					is_liked: isLiked,
				})
				.eq('id', activityId)
				.select(`*, review:user_movie_review(*)`)
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.movieActivity(data.user_id as string, data.movie_id as number), data)
		}
	});
}

export const useUserMovieWatchlistInsert = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			movieId,
		} : {
			userId?: string;
			movieId?: number;
		}) => {
			if (!userId || !movieId) throw Error('Missing profile id or movie id');
			const { data, error } = await supabase
				.from('user_movie_watchlist')
				.insert({
					user_id: userId,
					movie_id: movieId,
				})
				.select()
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.movieWatchlist(data.user_id as string, data.movie_id as number), data)

			// Invalidate watchlist
			queryClient.invalidateQueries({
				queryKey: userKeys.watchlist(data.user_id as string)
			});
			queryClient.invalidateQueries({
				queryKey: userKeys.collectionWatchlist(data.user_id as string)
			});
		}
	});
}

export const useUserMovieWatchlistDelete = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			watchlistId,
		} : {
			watchlistId?: number;
		}) => {
			if (!watchlistId) throw Error('Missing watchlist id');
			const { data, error } = await supabase
				.from('user_movie_watchlist')
				.delete()
				.eq('id', watchlistId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.movieWatchlist(data.user_id, data.movie_id), null)

			// Invalidate watchlist
			queryClient.invalidateQueries({
				queryKey: userKeys.watchlist(data.user_id)
			});
			queryClient.invalidateQueries({
				queryKey: userKeys.collectionWatchlist(data.user_id)
			});
		}
	});
}

export const useUserMovieWatchlistUpdate = () => {
	const supabase = useSupabaseClient();
	return useMutation({
		mutationFn: async ({
			watchlistId,
			comment,
		} : {
			watchlistId?: number;
			comment?: string;
		}) => {
			if (!watchlistId) throw Error('Missing watchlist id');
			const { data, error } = await supabase
				.from('user_movie_watchlist')
				.update({
					comment: comment,
				})
				.eq('id', watchlistId)
				.select()
				.single()
			if (error) throw error;
			console.log(data);
			return data;
		}
	});
}