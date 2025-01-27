import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { userKeys } from "./userKeys"
import { useSupabaseClient } from '@/context/supabase-context';
import { FeedCastCrew, MediaType, Playlist, UserActivity, UserFollower, UserFriend, UserMovieActivity, UserRecosAggregated, UserReview, UserWatchlist } from "@/types/type.db";

/* ---------------------------------- USER ---------------------------------- */

/**
 * Fetches the user details
 * @param userId The user id
 * @returns The user details
*/
export const useUserQuery = ({
	userId,
	enabled,
} : {
	userId?: string
	enabled?: boolean
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
		enabled: enabled ? enabled : userId !== undefined,
	});
};

/**
 * Fetches the user friends
 * @param userId The user id
 * @param filters The filters
 * @returns The user friends
 */
export const useUserFriendsQuery = ({
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
/* -------------------------------------------------------------------------- */

/* -------------------------------- ACTIVITY -------------------------------- */
export const useUserActivitiesInfiniteQuery = ({
	userId,
	filters,
} : {
	userId?: string
	filters?: {
		resultsPerPage?: number;
		order?:
			'created_at-desc' |
			'created_at-asc' |
			'watched_date-desc' |
			'watched_date-asc' |
			'rating-desc' |
			'rating-asc';
		type?: MediaType[];
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		order: 'watched_date-desc',
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.activities({
			userId: userId as string,
			filters: mergedFilters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) throw Error('Missing user id');
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
	  		let to = from - 1 + mergedFilters.resultsPerPage;
			let request = supabase
				.from('user_activity_media')
				.select(`
					*,
					user(*),
					review:user_review(*)
				`)
				.eq('user_id', userId)
				.range(from, to)
			
			if (mergedFilters) {
				if (mergedFilters.order) {
					const [ column, direction ] = mergedFilters.order.split('-');
					request = request.order(column, { ascending: direction === 'asc', nullsFirst: false });
				}
				if (mergedFilters.type && mergedFilters.type.length > 0) {
					request = request.in('media_type', mergedFilters.type);
				}
			}
			const { data, error } = await request
				.returns<UserActivity[]>();
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	});
};

export const useUserActivityQuery = ({
	userId,
	mediaId,
	mediaType,
} : {
	userId?: string;
	mediaId: number;
	mediaType: MediaType;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.activity({
			userId: userId as string,
			mediaId: mediaId as number,
			mediaType: mediaType as MediaType,
		}),
		queryFn: async () => {
			if (!userId || !mediaId || !mediaType) throw Error('Missing user id, media id or media type');
			const { data, error } = await supabase
				.from('user_activity_media')
				.select('*, review:user_review(*)')
				.match({
					'user_id': userId,
					'media_id': mediaId,
					'media_type': mediaType,
				})
				.maybeSingle();
			if (error) throw error;
			return data;
		},
		enabled: !!userId && !!mediaId && !!mediaType,
	});
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- REVIEWS -------------------------------- */
export const useUserReviewQuery = ({
	reviewId,
	initialData,
} : {
	reviewId: number;
	initialData?: UserReview;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.review({ reviewId: reviewId as number }),
		queryFn: async () => {
			if (!reviewId) throw Error('Missing review id');
			const { data, error } = await supabase
				.from('user_review_media_activity')
				.select('*, user(*)')
				.eq('id', reviewId)
				.returns<UserReview[]>()
				.maybeSingle();
			if (error) throw error;
			return data;
		},
		initialData: initialData,
		enabled: !!reviewId,
	});
};

export const useUserReviewLikeQuery = ({
	userId,
	reviewId,
} : {
	userId?: string;
	reviewId: number;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.reviewLike({
			userId: userId as string,
			reviewId: reviewId as number,
		}),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			const { data, error } = await supabase
				.from('user_review_like')
				.select('*')
				.match({
					'user_id': userId,
					'review_id': reviewId,
				})
				.maybeSingle();
			if (error) throw error;
			return data;
		},
		enabled: !!userId && !!reviewId,
	});
};
/* -------------------------------------------------------------------------- */

/* ---------------------------------- RECOS --------------------------------- */
export const useUserRecosQuery = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		order?: 'created_at-desc' | 'created_at-asc' | 'random';
		limit?: number;
	};
}) => {
	const mergedFilters = {
		order: 'created_at-asc',
		...filters
	} as typeof filters;
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.recos({
			userId: userId as string,
			filters: mergedFilters,
		}),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			let request = supabase
				.from(mergedFilters?.order === 'random' ? 'user_recos_aggregated_random' : 'user_recos_aggregated')
				.select('*')
				.match({
					'user_id': userId,
					'status': 'active',
				})
			if (mergedFilters) {
				if (mergedFilters?.order !== 'random' && mergedFilters.order) {
					const [ column, direction ] = mergedFilters.order.split('-');
					request = request.order(column, { ascending: direction === 'asc', nullsFirst: false });
				}
				if (mergedFilters.limit) {
					request = request.limit(mergedFilters.limit);
				}
			}
			const { data, error } = await request
				.returns<UserRecosAggregated[]>();
			if (error) throw error;
			return data;
		},
		enabled: !!userId,
	})
};

export const useUserRecosSendQuery = ({
	userId,
	mediaId,
	mediaType,
} : {
	userId?: string;
	mediaId: number;
	mediaType: MediaType;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.recosSend({
			mediaId: mediaId as number,
			mediaType: mediaType as MediaType,
		}),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			if (!mediaId) throw Error('Missing media id');
			if (!mediaType) throw Error('Missing media type');
			const { data, error } = await supabase
				.from('user_friend')
				.select(`
					id,
					friend:friend_id!inner(
						*,
						user_activity(count),
						user_recos!user_recos_user_id_fkey(count)
					)
				`)
				.match({
					'user_id': userId,
					'friend.user_activity.media_id': mediaId,
					'friend.user_activity.media_type': mediaType,
					'friend.user_recos.media_id': mediaId,
					'friend.user_recos.media_type': mediaType,
					'friend.user_recos.sender_id': userId,
					'friend.user_recos.status': 'active',
				})
				.returns<(UserFriend & {
					friend: {
						user_activity: {
							count: number;
						}[];
						user_recos: {
							count: number;
						}[];
					};
				})[]>();
			if (error) throw error;
			const output = data?.map((userFriend) => ({
				friend: userFriend.friend,
				as_watched: userFriend.friend.user_activity[0]?.count > 0,
				already_sent: userFriend.friend.user_recos[0]?.count > 0,
			}));
			return output;
		},
		enabled: !!userId && !!mediaId && !!mediaType,
	});
};
/* -------------------------------------------------------------------------- */

/* -------------------------------- WATCHLIST ------------------------------- */
export const useUserWatchlistQuery = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		order?: 'created_at-desc' | 'created_at-asc' | 'random';
		limit?: number;
	};
}) => {
	const mergedFilters = {
		order: 'created_at-asc',
		...filters
	} as typeof filters;
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.watchlist({
			userId: userId as string,
			filters: mergedFilters,
		}),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			let request = supabase
				.from(mergedFilters?.order === 'random' ? 'user_watchlist_media_random' : 'user_watchlist_media')
				.select('*')
				.match({
					'user_id': userId,
					'status': 'active',
				})
			
			if (mergedFilters) {
				if (mergedFilters?.order !== 'random' && mergedFilters.order) {
					const [ column, direction ] = mergedFilters.order.split('-');
					request = request.order(column, { ascending: direction === 'asc', nullsFirst: false });
				}
				if (mergedFilters.limit) {
					request = request.limit(mergedFilters.limit);
				}
			}
			const { data, error } = await request
				.returns<UserWatchlist[]>();
			if (error) throw error;
			return data;
		},
		enabled: !!userId,
	});
};

export const useUserWatchlistItemQuery = ({
	userId,
	mediaId,
	mediaType,
} : {
	userId?: string;
	mediaId: number;
	mediaType: MediaType;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.watchlistItem({
			userId: userId as string,
			mediaId: mediaId as number,
			mediaType: mediaType as MediaType,
		}),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			if (!mediaId) throw Error('Missing media id');
			if (!mediaType) throw Error('Missing media type');
			const { data, error } = await supabase
				.from('user_watchlist_media')
				.select('*')
				.match({
					'user_id': userId,
					'media_id': mediaId,
					'media_type': mediaType,
					'status': 'active',
				})
				.returns<UserWatchlist[]>()
				.maybeSingle();
			if (error) throw error;
			return data;
		},
		enabled: !!userId && !!mediaId && !!mediaType,
	});
};
/* -------------------------------------------------------------------------- */

/* ---------------------------------- LIKES --------------------------------- */
export const useUserLikesQuery = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		order?: 'created_at-desc' | 'created_at-asc' | 'random';
		limit?: number;
	};
}) => {
	const mergedFilters = {
		order: 'created_at-asc',
		...filters
	} as typeof filters;
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.likes({
			userId: userId as string,
			filters: mergedFilters,
		}),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			let request = supabase
				.from('user_activity_media')
				.select('*')
				.match({
					'user_id': userId,
					'is_liked': true,
				})
			
			if (mergedFilters) {
				if (mergedFilters?.order !== 'random' && mergedFilters.order) {
					const [ column, direction ] = mergedFilters.order.split('-');
					request = request.order(column, { ascending: direction === 'asc', nullsFirst: false });
				}
				if (mergedFilters.limit) {
					request = request.limit(mergedFilters.limit);
				}
			}
			const { data, error } = await request
				.returns<UserActivity[]>();
			if (error) throw error;
			return data;
		},
		enabled: !!userId,
	});
};
/* -------------------------------------------------------------------------- */

/* ---------------------------------- FEED ---------------------------------- */
export const useUserFeedInfiniteQuery = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		resultsPerPage?: number;
		order?: 'created_at-desc' | 'created_at-asc' | 'watched_date-desc' | 'watched_date-asc';
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		order: 'watched_date-desc',
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.feed({
			userId: userId as string,
			filters: mergedFilters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
	  		let to = from - 1 + mergedFilters.resultsPerPage;
			let request = supabase
				.from('user_feed')
				.select(`
					*,
					user(*),
					review:user_review_activity(*, user(*))
				`)
				.range(from, to)
			
			if (mergedFilters) {
				if (mergedFilters.order) {
					const [ column, direction ] = mergedFilters.order.split('-');
					request = request.order(column, { ascending: direction === 'asc', nullsFirst: false });
				}
			}
			const { data, error } = await request
				.returns<UserActivity[]>();
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	});
};

export const useUserFeedCastCrewInfiniteQuery = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		resultsPerPage?: number;
		order?: 'release_date-desc';
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		order: 'release_date-desc',
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.feedCastCrew(userId as string, mergedFilters),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
	  		let to = from - 1 + mergedFilters.resultsPerPage;
			let request = supabase
				.from('feed_cast_crew')
				.select(`
					*,
					media:media_movie(*),
					person(*)
				`)
				.range(from, to)
				.returns<FeedCastCrew[]>();
			
			if (mergedFilters) {
				if (mergedFilters.order) {
					const [ column, direction ] = mergedFilters.order.split('-');
					switch (column) {
						case 'release_date':
							request = request.order('release_date', { ascending: direction === 'asc' });
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
};
/* -------------------------------------------------------------------------- */

/* -------------------------------- PLAYLIST -------------------------------- */
export const useUserPlaylistsInfiniteQuery = ({
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
		queryKey: userKeys.playlists({
			userId: userId as string,
			filters: mergedFilters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) throw Error('Missing user id');
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
	  		let to = from - 1 + mergedFilters.resultsPerPage;
			let request = supabase
				.from('playlist')
				.select(`*`)
				.eq('user_id', userId)
				.range(from, to)

			if (mergedFilters) {
				if (mergedFilters.order) {
					const [ column, direction ] = mergedFilters.order.split('-');
					request = request.order(column, { ascending: direction === 'asc', nullsFirst: false });
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
};
/* -------------------------------------------------------------------------- */

/* -------------------------------- FOLLOWER -------------------------------- */

/**
 * Fetches the user followers
 * @param userId The user id
 * @param filters The filters
 * @param numPerPage The number of items per page
 * @returns The user followers
*/
export const useUserFollowersInfiniteQuery = ({
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
				.range(from, to);
			
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
 * Fetches the user followers requests
 * @param userId The user id
 * @returns The user followers requests
*/
export const useUserFollowersRequestsQuery = ({
	userId,
} : {
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.followersRequests(userId as string),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			const { data, error } = await supabase
				.from('user_follower')
				.select('id, user:user_id!inner(*)')
				.eq('followee_id', userId)
				.eq('is_pending', true)
				.returns<UserFollower[]>();
			if (error) throw error;
			return data;
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
export const useUserFolloweesInfiniteQuery = ({
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
			const { data, error } = await query
				.returns<UserFollower[]>();
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
/* -------------------------------------------------------------------------- */

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
		queryKey: userKeys.playlists({
			userId: userId as string,
			filters: filters,
		}),
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
};

export const useUserPlaylistsFriendsInfinite = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		resultsPerPage?: number;
		order?:
			'updated_at-desc' |
			'updated_at-asc' |
			'created_at-desc' |
			'created_at-asc' |
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
		queryKey: userKeys.playlistsFriends({
			userId: userId as string,
			filters: mergedFilters,
		}),
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
					const [ column, direction ] = mergedFilters.order.split('-');
					request = request.order(column, { ascending: direction === 'asc', nullsFirst: false });
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

export const useUserFollowProfile = ({
	userId,
	followeeId,
} : {
	userId?: string;
	followeeId?: string;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.followProfile(userId as string, followeeId as string),
		queryFn: async () => {
			if (!userId || !followeeId) throw Error('Missing user id or followee id');
			const { data, error } = await supabase
				.from('user_follower')
				.select('*')
				.eq('user_id', userId)
				.eq('followee_id', followeeId)
				.maybeSingle();
			if (error) throw error;
			return data;
		},
		enabled: !!userId && !!followeeId,
	});
}


/* -------------------------------------------------------------------------- */
/*                                     OLD                                    */
/* -------------------------------------------------------------------------- */


export const useUserMovieActivitiesInfinite = ({
	userId,
	filters,
} : {
	userId?: string
	filters?: {
		resultsPerPage?: number;
		order?:
			'created_at-desc' |
			'created_at-asc' |
			'date-desc' |
			'date-asc' |
			'rating-desc' |
			'rating-asc';
	};
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		order: 'date-desc',
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.movieActivities({
			userId: userId as string,
			filters: mergedFilters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) throw Error('Missing user id');
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
	  		let to = from - 1 + mergedFilters.resultsPerPage;
			let request = supabase
				.from('user_movie_activity')
				.select(`
					*,
					user(*),
					review:user_movie_review(*),
					movie(*)
				`)
				.eq('user_id', userId)
				.range(from, to)
				// .returns<UserMovieActivity[]>();
			
			if (mergedFilters) {
				if (mergedFilters.order) {
					const [ column, direction ] = mergedFilters.order.split('-');
					request = request.order(column, { ascending: direction === 'asc', nullsFirst: false });
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

export const useUserMovieActivity = ({
	userId,
	movieId,
} : {
	userId?: string;
	movieId?: number;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.movieActivity(userId as string, movieId as number),
		queryFn: async () => {
			if (!userId || !movieId) throw Error('Missing user id or movie id');
			const { data, error } = await supabase
				.from('user_movie_activity')
				.select(`*, review:user_movie_review(*)`)
				.eq('user_id', userId)
				.eq('movie_id', movieId)
				.maybeSingle();
			if (error) throw error;
			return data;
		},
		enabled: !!userId && !!movieId,
	});
}

export const useUserMovieWatchlist = ({
	userId,
	movieId,
} : {
	userId?: string;
	movieId?: number;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.movieWatchlist(userId as string, movieId as number),
		queryFn: async () => {
			if (!userId || !movieId) throw Error('Missing user id or movie id');
			const { data, error } = await supabase
				.from('user_movie_watchlist')
				.select(`*`)
				.eq('user_id', userId)
				.eq('movie_id', movieId)
				.eq('status', 'active')
				.maybeSingle();
			if (error) throw error;
			return data;
		},
		enabled: !!userId && !!movieId,
	});
}

export const useUserMovieFollowersRating = ({
	userId,
	movieId,
} : {
	userId?: string;
	movieId?: number;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.movieFollowersRating(userId as string, movieId as number),
		queryFn: async () => {
			if (!userId || !movieId) throw Error('Missing user id or movie id');
			const { data, error } = await supabase
				.from('movie_followers_rating')
				.select(`
					*,
					user(*)
				`)
				.eq('movie_id', movieId)
				.not('rating', 'is', null)
				.order('created_at', { ascending: false });
			if (error) throw error;
			return data;
		},
		enabled: !!userId && !!movieId,
	});
}