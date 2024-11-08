import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { userKeys } from "./userKeys"
import { useSupabaseClient } from '@/context/supabase-context';
import { Playlist, PlaylistType, UserFriend, UserMovieActivity } from "@/types/type.db";

export const useUserSearch = ({
	filters,
} : {
	filters?: {
		search?: string | null;
	};
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.search(filters),
		queryFn: async () => {
			let query = supabase
				.from('user')
				.select('*')
			if (filters) {
				if (filters.search) {
					query = query
						.ilike('username', `${filters.search}%`)
				}
			}
			const { data, error } = await query;
			if (error) throw error;
			return data;
		},
	});
}

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
		order?: 'created_at-desc' | 'created_at-asc' | 'date-desc' | 'date-asc';
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		order: 'date-desc',
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
						case 'date-desc':
							request = request.order('date', { ascending: false });
							break;
						case 'date-asc':
							request = request.order('date', { ascending: true });
							break;
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

export const useUserPlaylistsFriendsInfinite = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		resultsPerPage?: number;
		order?: 'updated_at-desc' | 'updated_at-asc';
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		order: 'updated_at-desc',
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.playlistsFriends(userId as string, mergedFilters),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
      		let to = from - 1 + mergedFilters.resultsPerPage;
			
			let request = supabase
				.from('playlists_friends')
				.select(`
					*,
					user(*)
				`)
				.range(from, to)
				.returns<Playlist[]>();
			
			if (mergedFilters) {
				if (mergedFilters.order) {
					switch (mergedFilters.order) {
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
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	});
}

export const useUserDiscoveryInfinite = ({
	filters,
} : {
	filters?: {
		resultsPerPage?: number;
		order?: 'created_at-desc' | 'created_at-asc' | 'popularity-desc' | 'popularity-asc';
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		order: 'created_at-desc',
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.discovery({
			filters: mergedFilters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
	  		let to = from - 1 + mergedFilters.resultsPerPage;
			let request = supabase
				.from('user')
				.select(`*`)
				.range(from, to);

			if (mergedFilters) {
				if (mergedFilters.order) {
					switch (mergedFilters.order) {
						case 'created_at-desc':
							request = request.order('created_at', { ascending: false });
							break;
						case 'created_at-asc':
							request = request.order('created_at', { ascending: true });
							break;
						case 'popularity-desc':
							request = request.order('followers_count', { ascending: false });
							break;
						case 'popularity-asc':
							request = request.order('followers_count', { ascending: true });
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
			return lastPage?.length == mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
	});
}
