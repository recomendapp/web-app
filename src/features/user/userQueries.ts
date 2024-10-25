import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { userKeys } from "./userKeys"
import { useSupabaseClient } from '@/context/supabase-context';
import { PlaylistType, UserFriend, UserMovieActivity } from "@/types/type.db";

/**
 * Fetches the user details
 * @param userId The user id
 * @returns The user details
*/
export const useUserDetails = ({
	userId,
} : {
	userId?: string
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.detail(userId as string),
		queryFn: async () => {
			if (!userId) return null;
			const { data, error } = await supabase
				.from('user')
				.select('*')
				.eq('id', userId)
				.single();
			if (error) throw error;
			return data;	
		},
		enabled: !!userId,
	});
};

/**
 * Fetches the user friends
 * @param userId The user id
 * @param filters The filters
 * @returns The user friends
 */
export const useUserFriends = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		search?: string | null;
	};
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.friends(userId as string, filters),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			let query = supabase
				.from('user_friend')
				.select('id, friend:friend_id!inner(*)')
				.eq('user_id', userId)
			if (filters) {
				if (filters.search) {
					query = query
						.ilike(`friend.username`, `${filters.search}%`)
				}
			}
			const { data, error } = await query;
			if (error) throw error;
			return data;
		},
		enabled: !!userId,
	});
};

/**
 * Fetches the user friends to send a movie
 * @param userId The user id
 * @param movieId The movie id
 * @returns The user friends
 */
export const useUserSendMovie = ({
	userId,
	movieId,
} : {
	userId?: string;
	movieId?: number;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.sendMovie(userId as string, movieId as number),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			if (!movieId) throw Error('Missing movie id');
			const { data, error } = await supabase
				.from('user_friend')
				.select(`
					id,
					friend:friend_id!inner(
						*,
						user_movie_activity(count),
						user_movie_guidelist!user_movie_guidelist_user_id_fkey(count)
					)
				`)
				.match({
					'user_id': userId,
					'friend.user_movie_activity.movie_id': movieId,
					'friend.user_movie_guidelist.movie_id': movieId,
					'friend.user_movie_guidelist.sender_id': userId,
					'friend.user_movie_guidelist.status': 'active',
				})
				.returns<(UserFriend & {
					friend: {
						user_movie_activity: {
							count: number;
						}[];
						user_movie_guidelist: {
							count: number;
						}[];
					};
				})[]>();
			if (error) throw error;
			const output = data?.map((userFriend) => ({
				friend: userFriend.friend,
				as_watched: userFriend.friend.user_movie_activity[0]?.count > 0,
				already_sent: userFriend.friend.user_movie_guidelist[0]?.count > 0,
			}));
			return output;
		},
		enabled: !!userId && !!movieId,
	});
}

/**
 * Fetches the user playlists to add a movie
 * @param userId The user id
 * @param movieId The movie id
 * @returns The user playlists
 */
export const useUserAddMovieToPlaylist = ({
	movieId,
	userId,
	type = 'personal',
} : {
	movieId?: number;
	userId?: string;
	type: PlaylistType;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.addMovieToPlaylistType(userId as string, movieId as number, type),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			if (!movieId) throw Error('Missing movie id');
			if (!type) throw Error('Missing type');

			if (type === 'personal') { // personal
				const { data, error } = await supabase
					.from('playlist')
					.select('*, playlist_item(count)')
					.match({
						'user_id': userId,
						'playlist_item.movie_id': movieId,
					})
					.order('updated_at', { ascending: false })
				if (error) throw error;
				const output = data?.map(({ playlist_item, ...playlist }) => ({
					playlist: playlist,
					already_added: playlist_item[0]?.count > 0,
				}));
				return output;
			} else { // shared
				const { data, error } = await supabase
					.from('playlist_like')
					.select(`
						id,
						playlist!inner(
							*,
							playlist_guest!inner(*),
							user!inner(*),
							playlist_item(count)
						)
					`)
					.match({
						'user_id': userId,
						'playlist.playlist_guest.user_id': userId,
						'playlist.playlist_guest.edit': true,
						'playlist.user.premium': true,
						'playlist.playlist_item.movie_id': movieId,
					})
					.order('updated_at', {
						referencedTable: 'playlist',
						ascending: false 
					})
				if (error) throw error;
				const output = data?.map(({ playlist: { playlist_item, playlist_guest, user, ...playlist }, ...playlist_like }) => ({
					playlist: playlist,
					already_added: playlist_item[0]?.count > 0,
				}));
				return output;
			}
		},
		enabled: !!userId && !!movieId,
	});
}

/**
 * Fetches the user followers
 * @param userId The user id
 * @param filters The filters
 * @param numPerPage The number of items per page
 * @returns The user followers
*/
export const useUserFollowersInfinite = ({
	userId,
	filters,
	numPerPage = 20,
} : {
	userId?: string;
	filters?: {
		search?: string | null;
	};
	numPerPage?: number;
}) => {
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.followers(userId as string, filters),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) throw Error('Missing user id');
			let from = (pageParam - 1) * numPerPage;
			let to = from - 1 + numPerPage;

			let query = supabase
				.from('user_follower')
				.select('id, follower:user_id!inner(*)')
				.eq('followee_id', userId)
				.eq('is_pending', false)
				.range(from, to)
			
			if (filters) {
				if (filters.search) {
					query = query
						.ilike(`follower.username`, `${filters.search}%`)
				}
			}
			const { data, error } = await query;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	});
};

/**
 * Fetches the user followees
 * @param userId The user id
 * @param filters The filters
 * @param numPerPage The number of items per page
 * @returns The user followees
*/
export const useUserFolloweesInfinite = ({
	userId,
	filters,
	numPerPage = 20,
} : {
	userId?: string;
	filters?: {
		search?: string | null;
	};
	numPerPage?: number;
}) => {
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.followees(userId as string, filters),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) throw Error('Missing user id');
			let from = (pageParam - 1) * numPerPage;
			let to = from - 1 + numPerPage;

			let query = supabase
				.from('user_follower')
				.select('id, followee:followee_id!inner(*)')
				.eq('user_id', userId)
				.eq('is_pending', false)
				.range(from, to)
			
			if (filters) {
				if (filters.search) {
					query = query
						.ilike(`followee.username`, `${filters.search}%`)
				}
			}
			const { data, error } = await query;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	});
};

/**
 * Fetches the user guidelist
 * @param userId The user id
 * @param locale The locale
 */
export const useUserGuidelist = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		order?: 'created_at-desc' | 'created_at-asc' | 'random';
		limit?: number;
	};
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.guidelist(userId as string, filters),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			let request = supabase
				.from(filters?.order === 'random' ? 'guidelist_random' : 'guidelist')
				.select('*, movie(*)')
				.eq('user_id', userId)
				.eq('status', 'active')
			
			if (filters) {
				if (filters?.order !== 'random' && filters.order) {
					switch (filters.order) {
						case 'created_at-desc':
							request = request.order('created_at', { ascending: false });
							break;
						case 'created_at-asc':
							request = request.order('created_at', { ascending: true });
							break;
					}
				}
				if (filters.limit) {
					request = request.limit(filters.limit);
				}
			}
			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		enabled: !!userId,
	});
}

/**
 * Fetches the user watchlist
 * @param userId The user id
 * @param filters The filters
 * @returns The user watchlist
 */
export const useUserWatchlist = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		order?: 'created_at-desc' | 'created_at-asc' | 'random';
		limit?: number;
	};
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.watchlist(userId as string, filters),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			let request;
			if (filters?.order === 'random') {
				request = supabase
					.from('watchlist_random')
					.select('*, movie(*)')
			} else {
				request = supabase
					.from('user_movie_watchlist')
					.select('*, movie(*)')
			}
			request = request
				.eq('user_id', userId)
				.eq('status', 'active')
			
			if (filters) {
				if (filters?.order !== 'random' && filters.order) {
					switch (filters.order) {
						case 'created_at-desc':
							request = request.order('created_at', { ascending: false });
							break;
						case 'created_at-asc':
							request = request.order('created_at', { ascending: true });
							break;
					}
				}
				if (filters.limit) {
					request = request.limit(filters.limit);
				}
			}
			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		enabled: !!userId,
	});
}

/**
 * Fetches the user playlists
 * @param userId The user id
 * @param filters The filters
 * @returns The user playlists
*/
export const useUserPlaylists = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		order?: "updated_at-desc" | "updated_at-asc";
	};
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.playlists(userId as string, filters),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			let request = supabase
				.from('playlist')
				.select('*')
				.eq('user_id', userId)
			
			if (filters) {
				if (filters.order) {
					switch (filters.order) {
						case 'updated_at-desc':
							request = request.order('updated_at', { ascending: false });
							break;
						case 'updated_at-asc':
							request = request.order('updated_at', { ascending: true });
							break;
					}
				}
			}
			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		enabled: !!userId,
	});
}

export const useUserFeedInfinite = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		resultsPerPage?: number;
		order?: 'created_at-desc' | 'created_at-asc';
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		order: 'created_at-desc',
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.feed(userId as string, mergedFilters),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
      		let to = from - 1 + mergedFilters.resultsPerPage;
			let request = supabase
				.from('feed')
				.select(`
					*,
					movie(*),
					user(*),
					review(*, user(*))
				`)
				.range(from, to)
				.returns<UserMovieActivity[]>();
			
			if (mergedFilters) {
				if (mergedFilters.order) {
					switch (mergedFilters.order) {
						case 'created_at-desc':
							request = request.order('created_at', { ascending: false });
							break;
						case 'created_at-asc':
							request = request.order('created_at', { ascending: true });
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
			return lastPage?.length == mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	});
}
