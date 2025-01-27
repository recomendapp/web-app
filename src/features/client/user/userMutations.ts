import { useSupabaseClient } from '@/context/supabase-context';
import { MediaType, User, UserFollower, UserRecosAggregated, UserReview, UserWatchlist } from '@/types/type.db';
import { JSONContent } from '@tiptap/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './userKeys';
import { mediaKeys } from '../media/mediaKeys';


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

export const useUserFollowProfileInsert = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			followeeId,
		} : {
			userId?: string;
			followeeId?: string;
		}) => {
			if (!userId || !followeeId) throw Error('Missing user id or followee id');
			const { data, error } = await supabase
				.from('user_follower')
				.insert({
					user_id: userId,
					followee_id: followeeId,
				})
				.select('*, followee:followee_id(*)')
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.followProfile(data.user_id, data.followee_id), data);
			!data.is_pending && queryClient.setQueryData(userKeys.followees(data.user_id), (oldData: { pages: UserFollower[][] } | undefined) => {
				if (!oldData) return oldData;
				return {
					...oldData,
					pages: oldData.pages.map((page) => [...page, data]),
				}
			});
		},
	});
};

export const useUserUnfollowProfileDelete = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			followeeId,
		} : {
			userId?: string;
			followeeId?: string;
		}) => {
			if (!userId || !followeeId) throw Error('Missing user id or followee id');
			const { data, error } = await supabase
				.from('user_follower')
				.delete()
				.eq('user_id', userId)
				.eq('followee_id', followeeId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.followProfile(data.user_id, data.followee_id), null);
			!data.is_pending && queryClient.setQueryData(userKeys.followees(data.user_id), (oldData: { pages: UserFollower[][] } | undefined) => {
				if (!oldData) return oldData;
				return {
				...oldData,
				pages: oldData.pages.map((page) =>
					page.filter((item) => item.id !== data.id)
				),
				};
			});
		},
	});
};


/* -------------------------------- ACTIVITY -------------------------------- */
export const useUserActivityInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			mediaId,
			mediaType,
			rating,
			isLiked,
		} : {
			userId?: string;
			mediaId?: number;
			mediaType?: MediaType;
			rating?: number;
			isLiked?: boolean;
		}) => {
			if (!userId || !mediaId || !mediaType) throw Error('Missing profile id or media id or media type');
			const { data, error } = await supabase
				.from('user_activity')
				.insert({
					user_id: userId,
					media_id: mediaId,
					media_type: mediaType,
					rating: rating,
					is_liked: isLiked,
				})
				.select(`*, review:user_review(*)`)
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.activity({
				userId: data.user_id,
				mediaId: data.media_id,
				mediaType: data.media_type,
			}), data);

			// Remove media from watchlist
			queryClient.setQueryData(userKeys.watchlistItem({
				userId: data.user_id,
				mediaId: data.media_id,
				mediaType: data.media_type,
			}), null);

			// Remove media from recommendations
			queryClient.setQueryData(userKeys.recos({userId: data.user_id}), (oldData: UserRecosAggregated[]) => {
				if (!oldData) return oldData;
				return oldData.filter((reco: any) => !(reco.media_id === data.media_id && reco.media_type === data.media_type));
			});
		}
	});
};

export const useUserActivityDeleteMutation = () => {
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
				.from('user_activity')
				.delete()
				.eq('id', activityId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.activity({
				userId: data.user_id,
				mediaId: data.media_id,
				mediaType: data.media_type,
			}), null);
		}
	});
};

export const useUserActivityUpdateMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
			rating,
			watchedDate,
			isLiked,
		} : {
			activityId?: number;
			rating?: number | null;
			watchedDate?: Date;
			isLiked?: boolean;
		}) => {
			if (!activityId) throw Error('Missing activity id');
			const { data, error } = await supabase
				.from('user_activity')
				.update({
					rating: rating,
					watched_date: watchedDate?.toISOString(),
					is_liked: isLiked,
				})
				.eq('id', activityId)
				.select(`*, review:user_review(*)`)
				.single()
			if (error) throw error;
			return {
				...data,
				isLikedChange: isLiked !== undefined,
			};
		},
		onSuccess: ({ isLikedChange, ...data}) => {
			queryClient.setQueryData(userKeys.activity({
				userId: data.user_id,
				mediaId: data.media_id,
				mediaType: data.media_type,
			}), data);

			isLikedChange && queryClient.invalidateQueries({
				queryKey: userKeys.likes({
					userId: data.user_id,
				})
			});
		}
	});
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- REVIEW --------------------------------- */

export const useUserReviewInsertMutation = ({
	userId,
	mediaId,
	mediaType,
} : {
	userId?: string;
	mediaId: number;
	mediaType: MediaType;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
			title,
			body,
		} : {
			activityId: number;
			title?: string | null;
			body: JSONContent;
		}) => {
			const { data, error } = await supabase
				.from('user_review')
				.insert({
					id: activityId,
					title: title,
					body: body,
				})
				.select('*')
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			// Invalidate reviews queries
			queryClient.invalidateQueries({
				queryKey: mediaKeys.reviews({ mediaId, mediaType }),
			});

			// Invalidate the review activity
			userId && queryClient.invalidateQueries({
				queryKey: userKeys.activity({ userId: userId, mediaId, mediaType }),
			});
		}
	});
};

export const useUserReviewUpdateMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			title,
			body,
		} : {
			id: number;
			title?: string | null;
			body: JSONContent;
		}) => {
			const { data, error } = await supabase
				.from('user_review_media_activity')
				// @ts-ignore
				.update({
					title: title,
					body: body,
				})
				.eq('id', id)
				.select('*')
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			// queryClient.setQueryData(userKeys.review({ reviewId: data.id }), data);
		},
	});
};

export const useUserReviewDeleteMutation = ({
	userId,
	mediaId,
	mediaType,
} : {
	userId?: string;
	mediaId: number;
	mediaType: MediaType;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
		} : {
			id: number;
		}) => {
			const { error } = await supabase
				.from('user_review')
				.delete()
				.eq('id', id)
			if (error) throw error;
			return {
				id,
				mediaId,
				mediaType,
			}
		},
		onSuccess: (data) => {
			// queryClient.setQueryData(userKeys.review({ reviewId: data.id }), null);

			queryClient.invalidateQueries({
				queryKey: mediaKeys.reviews({ mediaId: data.mediaId, mediaType: data.mediaType }),
			});

			// Invalidate the review activity
			userId && queryClient.invalidateQueries({
				queryKey: userKeys.activity({ userId: userId, mediaId: data.mediaId, mediaType: data.mediaType }),
			});
		},
	});
}

// Likes
export const useUserReviewLikeInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			reviewId,
		} : {
			userId: string;
			reviewId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_review_like')
				.insert({
					user_id: userId,
					review_id: reviewId,
				})
				.select('*')
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.reviewLike({ userId: data.user_id, reviewId: data.review_id }), data);
		},
	});
};

export const useUserReviewLikeDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			likeId,
		} : {
			likeId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_review_like')
				.delete()
				.eq('id', likeId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.reviewLike({ userId: data.user_id, reviewId: data.review_id }), null);
		},
	});
}
/* -------------------------------------------------------------------------- */

/* ---------------------------------- RECOS --------------------------------- */
export const useUserRecosInsertMutation = ({
	senderId,
	mediaId,
	mediaType,
} : {
	senderId?: string;
	mediaId: number;
	mediaType: MediaType;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			receivers,
			comment,
		} : {
			receivers: User[];
			comment: string;
		}) => {
			if (!senderId) throw Error('Missing sender id');
			if (!mediaId || !mediaType) throw Error('Missing media id or media type');
			if (!receivers || receivers.length === 0) throw Error('Missing receivers');
			const { error } = await supabase
				.rpc('user_recos_insert', {
					mediaid: mediaId,
					mediatype: mediaType,
					receiver_user_ids: receivers.map((user) => String(user?.id)),
					sender_user_id: senderId,
					comment: comment,
				})
			if (error) throw error;
		},
		onSuccess: () => {
		},
		meta: {
			invalidates: [
				userKeys.recosSend({ mediaId, mediaType }),
			]
		}
	});	
};

export const useUserRecosDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			mediaId,
			mediaType,
		} : {
			userId: string;
			mediaId: number;
			mediaType: MediaType;
		}) => {
			const { error } = await supabase
				.from('user_recos')
				.update({
					status: 'deleted',
				})
				.match({
					media_id: mediaId,
					media_type: mediaType,
					user_id: userId,
					status: 'active',
				})
				if (error) throw error;
				return {
					userId,
					mediaId,
					mediaType,
				};
		},
		onSuccess: (data) => {
			/* ---------------- Delete the reco in all the recos queries ---------------- */
			const baseKey = userKeys.recos({ userId: data.userId});
			const recosQueries = queryClient.getQueriesData<UserRecosAggregated[]>({
				predicate: (query) => {
					const key = query.queryKey
					return Array.isArray(key) && baseKey.every((v, i) => v === key[i]);
				}
			});
			recosQueries.forEach(([key, oldData]) => {
				if (!oldData) return;
				queryClient.setQueryData(key, (currentData: UserRecosAggregated[] | undefined) => {
					if (!currentData) return currentData;
					return currentData.filter(
						(reco) => !(reco.media_id === data.mediaId && reco.media_type === data.mediaType)
					);
				});
			});
			/* -------------------------------------------------------------------------- */
		},
	});
};

export const useUserRecosCompleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			mediaId,
			mediaType,
		} : {
			userId: string;
			mediaId: number;
			mediaType: MediaType;
		}) => {
			const { error } = await supabase
				.from('user_recos')
				.update({
					status: 'completed',
				})
				.match({
					media_id: mediaId,
					media_type: mediaType,
					user_id: userId,
					status: 'active',
				})
				.single();
			if (error) throw error;
			return {
				userId,
				mediaId,
				mediaType,
			}
		},
		onSuccess: (data) => {
			/* ---------------- Delete the reco in all the recos queries ---------------- */
			const baseKey = userKeys.recos({ userId: data.userId});
			const recosQueries = queryClient.getQueriesData<UserRecosAggregated[]>({
				predicate: (query) => {
					const key = query.queryKey
					return Array.isArray(key) && baseKey.every((v, i) => v === key[i]);
				}
			});
			recosQueries.forEach(([key, oldData]) => {
				if (!oldData) return;
				queryClient.setQueryData(key, (currentData: UserRecosAggregated[] | undefined) => {
					if (!currentData) return currentData;
					return currentData.filter(
						(reco) => !(reco.media_id === data.mediaId && reco.media_type === data.mediaType)
					);
				});
			});
			/* -------------------------------------------------------------------------- */
		},
	});
};
/* -------------------------------------------------------------------------- */

/* -------------------------------- WATCHLIST ------------------------------- */
export const useUserWatchlistInsertMutation = ({
	userId,
} : {
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			mediaId,
			mediaType,
		} : {
			userId: string;
			mediaId: number;
			mediaType: MediaType;
		}) => {
			const { data, error } = await supabase
				.from('user_watchlist')
				.insert({
					user_id: userId,
					media_id: mediaId,
					media_type: mediaType,
				})
				.select()
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.watchlistItem({
				userId: data.user_id,
				mediaId: data.media_id,
				mediaType: data.media_type,
			}), data);
		},
		meta: {
			invalidates: [
				userKeys.watchlist({
					userId: userId as string,
				}),
			]
		}
	});
};

export const useUserWatchlistDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			watchlistId,
		} : {
			watchlistId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_watchlist')
				.delete()
				.eq('id', watchlistId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.watchlistItem({
				userId: data.user_id,
				mediaId: data.media_id,
				mediaType: data.media_type,
			}), null);
			/* -------------- Delete the item in all the watchlist queries -------------- */
			const baseKey = userKeys.watchlist({ userId: data.user_id});
			const watchlistQueries = queryClient.getQueriesData<UserWatchlist[]>({
				predicate: (query) => {
					const key = query.queryKey
					return Array.isArray(key) && baseKey.every((v, i) => v === key[i]);
				}
			});

			watchlistQueries.forEach(([key, oldData]) => {
				if (!oldData) return;
				queryClient.setQueryData(key, (currentData: UserWatchlist[] | undefined) => {
					if (!currentData) return currentData;
					return currentData.filter(
						(watchlist) => watchlist?.id !== data.id
					);
				});
			});
			/* -------------------------------------------------------------------------- */
		}
	});
};

export const useUserWatchlistUpdateMutation = () => {
	const supabase = useSupabaseClient();
	return useMutation({
		mutationFn: async ({
			watchlistId,
			comment,
		} : {
			watchlistId: number;
			comment: string;
		}) => {
			const { data, error } = await supabase
				.from('user_watchlist')
				.update({
					comment: comment,
				})
				.eq('id', watchlistId)
				.select()
				.single()
			if (error) throw error;
			return data;
		}
	});
};
/* -------------------------------------------------------------------------- */
