import { useSupabaseClient } from '@/context/supabase-context';
import { User, UserFollower, UserRecosAggregated, UserWatchlist } from '@/types/type.db';
import { JSONContent } from '@tiptap/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './userKeys';
import { mediaKeys } from '../media/mediaKeys';


/**
 * Accepts a follower request
 * @returns The mutation
 */
export const useUserAcceptFollowerRequestMutation = ({
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
export const useUserDeclineFollowerRequestMutation = ({
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

export const useUserFollowProfileInsertMutation = () => {
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
			queryClient.invalidateQueries({
				queryKey: userKeys.feed({ userId: data.user_id })
			});
		},
	});
};

export const useUserUnfollowProfileDeleteMutation = () => {
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
			queryClient.invalidateQueries({
				queryKey: userKeys.feed({ userId: data.user_id })
			});
		},
	});
};

export const useUserFollowPersonInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			personId,
			userId,
		} : {
			personId: number;
			userId: string;
		}) => {
			const { data, error } = await supabase
				.from('user_person_follower')
				.insert({
					person_id: personId,
					user_id: userId,
				})
				.select('*')
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.followPerson(data.user_id, data.person_id), data);
			queryClient.invalidateQueries({
				queryKey: userKeys.feedCastCrew(data.user_id),
			});
		},
	});
};

export const useUserUnfollowPersonDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			personId,
			userId,
		} : {
			personId: number;
			userId: string;
		}) => {
			if (!userId || !personId) throw new Error('Invalid userId or personId');
			const { data, error } = await supabase
				.from('user_person_follower')
				.delete()
				.eq('person_id', personId)
				.eq('user_id', userId)
				.select('*')
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.followPerson(data.user_id, data.person_id), null);
			queryClient.invalidateQueries({
				queryKey: userKeys.feedCastCrew(data.user_id),
			});
		},
	});
};

/* -------------------------------- ACTIVITY -------------------------------- */

// Movies
export const useUserActivityMovieInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			movieId,
			rating,
			isLiked,
		} : {
			userId: string;
			movieId: number;
			rating?: number;
			isLiked?: boolean;
		}) => {
			const { data, error } = await supabase
				.from('user_activities_movie')
				.insert({
					user_id: userId,
					movie_id: movieId,
					rating: rating,
					is_liked: isLiked,
				})
				.select(`*, review:user_reviews_movie(*)`)
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.activity({
				id: data.movie_id,
				type: 'movie',
				userId: data.user_id,
			}), data);

			// Remove media from watchlist
			queryClient.setQueryData(userKeys.watchlistItem({
				id: data.movie_id,
				type: 'movie',
				userId: data.user_id,
			}), null);

			// TODO: Remove media from recommendations
			// queryClient.setQueryData(userKeys.recos({userId: data.user_id}), (oldData: UserRecosAggregated[]) => {
			// 	if (!oldData) return oldData;
			// 	return oldData.filter((reco: any) => !(reco.media_id === data.media_id && reco.media_type === data.media_type));
			// });

			queryClient.invalidateQueries({
				queryKey: userKeys.feed({ userId: data.user_id })
			})
		}
	});
};
export const useUserActivityMovieDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
		} : {
			activityId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_activities_movie')
				.delete()
				.eq('id', activityId)
				.select(`*, review:user_reviews_movie(*)`)
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.activity({
				id: data.movie_id,
				type: 'movie',
				userId: data.user_id,
			}), null);

			queryClient.invalidateQueries({
				queryKey: userKeys.feed({ userId: data.user_id })
			})
		}
	});
};
export const useUserActivityMovieUpdateMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
			rating,
			isLiked,
			watchedDate,
		} : {
			activityId: number;
			rating?: number | null;
			isLiked?: boolean;
			watchedDate?: Date;
		}) => {
			const { data, error } = await supabase
				.from('user_activities_movie')
				.update({
					rating: rating,
					is_liked: isLiked,
					watched_date: watchedDate?.toISOString(),
				})
				.eq('id', activityId)
				.select(`*, review:user_reviews_movie(*)`)
				.single()
			if (error) throw error;
			return {
				...data,
				isLikedChange: isLiked !== undefined,
			};
		},
		onSuccess: ({ isLikedChange, ...data}) => {
			queryClient.setQueryData(userKeys.activity({
				id: data.movie_id,
				type: 'movie',
				userId: data.user_id,
			}), data);

			// TODO: Update media in watchlist
			// queryClient.setQueryData(userKeys.watchlistItem({
			// 	id: data.movie_id,
			// 	type: 'movie',
			// 	userId: data.user_id,
			// }), null);

			// TODO: Update media in recommendations
			// queryClient.setQueryData(userKeys.recos({userId: data.user_id}), (oldData: UserRecosAggregated[]) => {
			// 	if (!oldData) return oldData;
			// 	return oldData.filter((reco: any) => !(reco.media_id === data.media_id && reco.media_type === data.media_type));
			// });

			queryClient.invalidateQueries({
				queryKey: userKeys.feed({ userId: data.user_id })
			})
		}
	});
};

// TV Series
export const useUserActivityTvSeriesInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			tvSeriesId,
			rating,
			isLiked,
		} : {
			userId: string;
			tvSeriesId: number;
			rating?: number;
			isLiked?: boolean;
		}) => {
			const { data, error } = await supabase
				.from('user_activities_tv_series')
				.insert({
					user_id: userId,
					tv_series_id: tvSeriesId,
					rating: rating,
					is_liked: isLiked,
				})
				.select(`*, review:user_reviews_tv_series(*)`)
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.activity({
				id: data.tv_series_id,
				type: 'tv_series',
				userId: data.user_id,
			}), data);

			// Remove media from watchlist
			queryClient.setQueryData(userKeys.watchlistItem({
				id: data.tv_series_id,
				type: 'tv_series',
				userId: data.user_id,
			}), null);

			// TODO: Remove media from recommendations
			// queryClient.setQueryData(userKeys.recos({userId: data.user_id}), (oldData: UserRecosAggregated[]) => {
			// 	if (!oldData) return oldData;
			// 	return oldData.filter((reco: any) => !(reco.media_id === data.media_id && reco.media_type === data.media_type));
			// });

			queryClient.invalidateQueries({
				queryKey: userKeys.feed({ userId: data.user_id })
			})
		}
	});
};
export const useUserActivityTvSeriesDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
		} : {
			activityId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_activities_tv_series')
				.delete()
				.eq('id', activityId)
				.select(`*, review:user_reviews_tv_series(*)`)
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.activity({
				id: data.tv_series_id,
				type: 'tv_series',
				userId: data.user_id,
			}), null);

			queryClient.invalidateQueries({
				queryKey: userKeys.feed({ userId: data.user_id })
			})
		}
	});
};
export const useUserActivityTvSeriesUpdateMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
			rating,
			isLiked,
			watchedDate,
		} : {
			activityId: number;
			rating?: number | null;
			isLiked?: boolean;
			watchedDate?: Date;
		}) => {
			const { data, error } = await supabase
				.from('user_activities_tv_series')
				.update({
					rating: rating,
					is_liked: isLiked,
					watched_date: watchedDate?.toISOString(),
				})
				.eq('id', activityId)
				.select(`*, review:user_reviews_tv_series(*)`)
				.single()
			if (error) throw error;
			return {
				...data,
				isLikedChange: isLiked !== undefined,
			};
		},
		onSuccess: ({ isLikedChange, ...data}) => {
			queryClient.setQueryData(userKeys.activity({
				id: data.tv_series_id,
				type: 'tv_series',
				userId: data.user_id,
			}), data);

			queryClient.invalidateQueries({
				queryKey: userKeys.feed({ userId: data.user_id })
			})
		}
	});
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- REVIEW --------------------------------- */
// Movies
export const useUserReviewMovieUpsertMutation = ({
	userId,
	movieId
}: {
	userId?: string;
	movieId: number;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
			title,
			body,
		} : {
			activityId?: number;
			title?: string | null;
			body: JSONContent;
		}) => {
			const { data, error } = await supabase
				.from('user_reviews_movie')
				.upsert({
					id: activityId,
					title: title,
					body: body,
				}, { onConflict: 'id'})
				.select('*')
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			// Invalidate reviews queries
			queryClient.invalidateQueries({
				queryKey: mediaKeys.reviews({ id: movieId, type: 'movie' }),
			});

			// Invalidate the review activity
			userId && queryClient.invalidateQueries({
				queryKey: userKeys.activity({ id: movieId, type: 'movie', userId: userId }),
			});
		}
	});
};
export const useUserReviewMovieDeleteMutation = ({
	userId,
	movieId
}: {
	userId?: string;
	movieId: number;
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
				.from('user_reviews_movie')
				.delete()
				.eq('id', id)
			if (error) throw error;
			return {
				id,
				movieId,
			}
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.review({ id: data.id, type: 'movie' }), null);

			queryClient.invalidateQueries({
				queryKey: mediaKeys.reviews({ id: data.movieId, type: 'movie' }),
			});

			// Invalidate the review activity
			userId && queryClient.invalidateQueries({
				queryKey: userKeys.activity({ id: data.movieId, type: 'movie', userId: userId }),
			});
		}
	});
};

export const useUserReviewMovieLikeInsertMutation = () => {
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
				.from('user_review_movie_likes')
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
			queryClient.setQueryData(userKeys.reviewLike({ reviewId: data.review_id, type: 'movie', userId: data.user_id }), data);
		},
	});
};
export const useUserReviewMovieLikeDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			likeId,
		} : {
			likeId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_review_movie_likes')
				.delete()
				.eq('id', likeId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.reviewLike({ reviewId: data.review_id, type: 'movie', userId: data.user_id }), null);
		},
	});
};

// Tv Series
export const useUserReviewTvSeriesUpsertMutation = ({
	userId,
	tvSeriesId
}: {
	userId?: string;
	tvSeriesId: number;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			activityId,
			title,
			body,
		} : {
			activityId?: number;
			title?: string | null;
			body: JSONContent;
		}) => {
			const { data, error } = await supabase
				.from('user_reviews_tv_series')
				.upsert({
					id: activityId,
					title: title,
					body: body,
				}, { onConflict: 'id'})
				.select('*')
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			// Invalidate reviews queries
			queryClient.invalidateQueries({
				queryKey: mediaKeys.reviews({ id: tvSeriesId, type: 'tv_series' }),
			});

			// Invalidate the review activity
			userId && queryClient.invalidateQueries({
				queryKey: userKeys.activity({ id: tvSeriesId, type: 'tv_series', userId: userId }),
			});
		}
	});
};
export const useUserReviewTvSeriesDeleteMutation = ({
	userId,
	tvSeriesId
}: {
	userId?: string;
	tvSeriesId: number;
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
				.from('user_reviews_tv_series')
				.delete()
				.eq('id', id)
			if (error) throw error;
			return {
				id,
				tvSeriesId,
			}
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.review({ id: data.id, type: 'tv_series' }), null);

			queryClient.invalidateQueries({
				queryKey: mediaKeys.reviews({ id: data.tvSeriesId, type: 'tv_series' }),
			});

			// Invalidate the review activity
			userId && queryClient.invalidateQueries({
				queryKey: userKeys.activity({ id: data.tvSeriesId, type: 'tv_series', userId: userId }),
			});
		}
	});
};

export const useUserReviewTvSeriesLikeInsertMutation = () => {
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
				.from('user_review_tv_series_likes')
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
			queryClient.setQueryData(userKeys.reviewLike({ reviewId: data.review_id, type: 'tv_series', userId: data.user_id }), data);
		},
	});
};
export const useUserReviewTvSeriesLikeDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			likeId,
		} : {
			likeId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_review_tv_series_likes')
				.delete()
				.eq('id', likeId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.reviewLike({ reviewId: data.review_id, type: 'tv_series', userId: data.user_id }), null);
		},
	});
};
/* -------------------------------------------------------------------------- */

/* ---------------------------------- RECOS --------------------------------- */
// Movies
export const useUserRecosMovieInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			senderId,
			movieId,
			receivers,
			comment,
		} : {
			senderId: string;
			movieId: number;
			receivers: User[];
			comment: string;
		}) => {
			if (receivers.length === 0) throw Error('Missing receivers');
			const { error } = await supabase
				.rpc('user_recos_movie_insert', {
					p_movie_id: movieId,
					receiver_user_ids: receivers.map((user) => String(user?.id)),
					sender_user_id: senderId,
					comment: comment,
				})
			if (error) throw error;
			return {
				senderId,
				movieId,
			}
		},
		onSuccess: ({ movieId }) => {
			queryClient.invalidateQueries({
				queryKey: userKeys.recosSend({ id: movieId, type: 'movie' }),
			});
		}
	});
};
export const useUserRecosMovieDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			movieId,
			userId,
		} : {
			movieId: number;
			userId: string;
		}) => {
			const { error } = await supabase
				.from('user_recos_movie')
				.update({
					status: 'deleted',
				})
				.match({
					movie_id: movieId,
					user_id: userId,
					status: 'active',
				})
			if (error) throw error;
			return {
				movieId,
				userId,
			};
		},
		onSuccess: (data) => {
			// invalidate
		}
	});
};
export const useUserRecosMovieCompleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			movieId,
			userId,
		} : {
			movieId: number;
			userId: string;
		}) => {
			const { error } = await supabase
				.from('user_recos_movie')
				.update({
					status: 'completed',
				})
				.match({
					movie_id: movieId,
					user_id: userId,
					status: 'active',
				})
				.single();
			if (error) throw error;
			return {
				movieId,
				userId,
			}
		},
		onSuccess: (data) => {
			// Invalidate
		}
	});
};

// TV Series
export const useUserRecosTvSeriesInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			senderId,
			tvSeriesId,
			receivers,
			comment,
		} : {
			senderId: string;
			tvSeriesId: number;
			receivers: User[];
			comment: string;
		}) => {
			if (receivers.length === 0) throw Error('Missing receivers');
			const { error } = await supabase
				.rpc('user_recos_tv_series_insert', {
					p_tv_series_id: tvSeriesId,
					receiver_user_ids: receivers.map((user) => String(user?.id)),
					sender_user_id: senderId,
					comment: comment,
				})
			if (error) throw error;
			return {
				senderId,
				tvSeriesId,
			}
		},
		onSuccess: ({ tvSeriesId }) => {
			queryClient.invalidateQueries({
				queryKey: userKeys.recosSend({ id: tvSeriesId, type: 'tv_series' }),
			});
		}
	});
};
export const useUserRecosTvSeriesDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			tvSeriesId,
			userId,
		} : {
			tvSeriesId: number;
			userId: string;
		}) => {
			const { error } = await supabase
				.from('user_recos_tv_series')
				.update({
					status: 'deleted',
				})
				.match({
					tv_series_id: tvSeriesId,
					user_id: userId,
					status: 'active',
				})
			if (error) throw error;
			return {
				tvSeriesId,
				userId,
			};
		},
		onSuccess: (data) => {
			// Invalidate
		}
	});
};
export const useUserRecosTvSeriesCompleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			tvSeriesId,
			userId,
		} : {
			tvSeriesId: number;
			userId: string;
		}) => {
			const { error } = await supabase
				.from('user_recos_tv_series')
				.update({
					status: 'completed',
				})
				.match({
					tv_series_id: tvSeriesId,
					user_id: userId,
					status: 'active',
				})
				.single();
			if (error) throw error;
			return {
				tvSeriesId,
				userId,
			}
		},
		onSuccess: (data) => {
			// Invalidate
		}
	});
};
// 			senderId,
// 			mediaId,
// 			receivers,
// 			comment,
// 		} : {
// 			senderId: string;
// 			mediaId: number;
// 			receivers: User[];
// 			comment: string;
// 		}) => {
// 			if (receivers.length === 0) throw Error('Missing receivers');
// 			const { error } = await supabase
// 				.rpc('user_recos_insert', {
// 					mediaid: mediaId,
// 					receiver_user_ids: receivers.map((user) => String(user?.id)),
// 					sender_user_id: senderId,
// 					comment: comment,
// 				})
// 			if (error) throw error;
// 			return {
// 				senderId,
// 				mediaId,
// 			}
// 		},
// 		onSuccess: ({ mediaId }) => {
// 			queryClient.invalidateQueries({
// 				queryKey: userKeys.recosSend({ mediaId: mediaId }),
// 			});
// 		}
// 	});	
// };

// export const useUserRecosDeleteMutation = () => {
// 	const supabase = useSupabaseClient();
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: async ({
// 			userId,
// 			mediaId,
// 		} : {
// 			userId: string;
// 			mediaId: number;
// 		}) => {
// 			const { error } = await supabase
// 				.from('user_recos')
// 				.update({
// 					status: 'deleted',
// 				})
// 				.match({
// 					media_id: mediaId,
// 					user_id: userId,
// 					status: 'active',
// 				})
// 				if (error) throw error;
// 				return {
// 					userId,
// 					mediaId,
// 				};
// 		},
// 		onSuccess: (data) => {
// 			/* ---------------- Delete the reco in all the recos queries ---------------- */
// 			const baseKey = userKeys.recos({ userId: data.userId});
// 			const recosQueries = queryClient.getQueriesData<UserRecosAggregated[]>({
// 				predicate: (query) => {
// 					const key = query.queryKey
// 					return Array.isArray(key) && baseKey.every((v, i) => v === key[i]);
// 				}
// 			});
// 			recosQueries.forEach(([key, oldData]) => {
// 				if (!oldData) return;
// 				queryClient.setQueryData(key, (currentData: UserRecosAggregated[] | undefined) => {
// 					if (!currentData) return currentData;
// 					return currentData.filter(
// 						(reco) => reco.media_id !== data.mediaId
// 					);
// 				});
// 			});
// 			/* -------------------------------------------------------------------------- */
// 		},
// 	});
// };

// export const useUserRecosCompleteMutation = () => {
// 	const supabase = useSupabaseClient();
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: async ({
// 			userId,
// 			mediaId,
// 		} : {
// 			userId: string;
// 			mediaId: number;
// 		}) => {
// 			const { error } = await supabase
// 				.from('user_recos')
// 				.update({
// 					status: 'completed',
// 				})
// 				.match({
// 					media_id: mediaId,
// 					user_id: userId,
// 					status: 'active',
// 				})
// 				.single();
// 			if (error) throw error;
// 			return {
// 				userId,
// 				mediaId,
// 			}
// 		},
// 		onSuccess: (data) => {
// 			/* ---------------- Delete the reco in all the recos queries ---------------- */
// 			const baseKey = userKeys.recos({ userId: data.userId});
// 			const recosQueries = queryClient.getQueriesData<UserRecosAggregated[]>({
// 				predicate: (query) => {
// 					const key = query.queryKey
// 					return Array.isArray(key) && baseKey.every((v, i) => v === key[i]);
// 				}
// 			});
// 			recosQueries.forEach(([key, oldData]) => {
// 				if (!oldData) return;
// 				queryClient.setQueryData(key, (currentData: UserRecosAggregated[] | undefined) => {
// 					if (!currentData) return currentData;
// 					return currentData.filter(
// 						(reco) => reco.media_id !== data.mediaId
// 					);
// 				});
// 			});
// 			/* -------------------------------------------------------------------------- */
// 		},
// 	});
// };
/* -------------------------------------------------------------------------- */

/* -------------------------------- WATCHLIST ------------------------------- */
// Movies
export const useUserWatchlistMovieInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			movieId,
		} : {
			userId: string;
			movieId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_watchlists_movie')
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
			queryClient.setQueryData(userKeys.watchlistItem({
				id: data.movie_id,
				type: 'movie',
				userId: data.user_id,
			}), data);

			queryClient.invalidateQueries({
				queryKey: userKeys.watchlist({
					userId: data.user_id,
				})
			});
		}
	});
};

export const useUserWatchlistMovieDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			watchlistId,
		} : {
			watchlistId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_watchlists_movie')
				.delete()
				.eq('id', watchlistId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.watchlistItem({
				id: data.movie_id,
				type: 'movie',
				userId: data.user_id,
			}), null);

			queryClient.invalidateQueries({
				queryKey: userKeys.watchlist({
					userId: data.user_id,
				})
			});

			/* -------------- Delete the item in all the watchlist queries -------------- */
			// const baseKey = userKeys.watchlist({ userId: data.user_id});
			// const watchlistQueries = queryClient.getQueriesData<UserWatchlist[]>({
			// 	predicate: (query) => {
			// 		const key = query.queryKey
			// 		return Array.isArray(key) && baseKey.every((v, i) => v === key[i]);
			// 	}
			// });

			// watchlistQueries.forEach(([key, oldData]) => {
			// 	if (!oldData) return;
			// 	queryClient.setQueryData(key, (currentData: UserWatchlist[] | undefined) => {
			// 		if (!currentData) return currentData;
			// 		return currentData.filter(
			// 			(watchlist) => watchlist?.id !== data.id
			// 		);
			// 	});
			// });
			// /* -------------------------------------------------------------------------- */
		}
	});
};

export const useUserWatchlistMovieUpdateMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			watchlistId,
			comment,
		} : {
			watchlistId: number;
			comment: string;
		}) => {
			const { data, error } = await supabase
				.from('user_watchlists_movie')
				.update({
					comment: comment,
				})
				.eq('id', watchlistId)
				.select()
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.watchlistItem({
				id: data.movie_id,
				type: 'movie',
				userId: data.user_id,
			}), data);

			queryClient.setQueryData(userKeys.watchlist({
				userId: data.user_id,
			}), (oldData: UserWatchlist[]) => {
				if (!oldData) return oldData;
				return oldData.map((item) => {
					if (item.type === 'movie' && item.id === data.id) {
						return {
							...item,
							...data,
						};
					}
					return item;
				});
			});
		}
	});
};

// TV Series
export const useUserWatchlistTvSeriesInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			tvSeriesId,
		} : {
			userId: string;
			tvSeriesId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_watchlists_tv_series')
				.insert({
					user_id: userId,
					tv_series_id: tvSeriesId,
				})
				.select()
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.watchlistItem({
				id: data.tv_series_id,
				type: 'tv_series',
				userId: data.user_id,
			}), data);

			queryClient.invalidateQueries({
				queryKey: userKeys.watchlist({
					userId: data.user_id,
				})
			});
		}
	});
};

export const useUserWatchlistTvSeriesDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			watchlistId,
		} : {
			watchlistId: number;
		}) => {
			const { data, error } = await supabase
				.from('user_watchlists_tv_series')
				.delete()
				.eq('id', watchlistId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.watchlistItem({
				id: data.tv_series_id,
				type: 'tv_series',
				userId: data.user_id,
			}), null);

			queryClient.invalidateQueries({
				queryKey: userKeys.watchlist({
					userId: data.user_id,
				})
			});
			/* -------------- Delete the item in all the watchlist queries -------------- */
			// const baseKey = userKeys.watchlist({ userId: data.user_id});
			// const watchlistQueries = queryClient.getQueriesData<UserWatchlist[]>({
			// 	predicate: (query) => {
			// 		const key = query.queryKey
			// 		return Array.isArray(key) && baseKey.every((v, i) => v === key[i]);
			// 	}
			// });

			// watchlistQueries.forEach(([key, oldData]) => {
			// 	if (!oldData) return;
			// 	queryClient.setQueryData(key, (currentData: UserWatchlist[] | undefined) => {
			// 		if (!currentData) return currentData;
			// 		return currentData.filter(
			// 			(watchlist) => watchlist?.id !== data.id
			// 		);
			// 	});
			// });
			/* -------------------------------------------------------------------------- */
		}
	});
};

export const useUserWatchlistTvSeriesUpdateMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			watchlistId,
			comment,
		} : {
			watchlistId: number;
			comment: string;
		}) => {
			const { data, error } = await supabase
				.from('user_watchlists_tv_series')
				.update({
					comment: comment,
				})
				.eq('id', watchlistId)
				.select()
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.watchlistItem({
				id: data.tv_series_id,
				type: 'tv_series',
				userId: data.user_id,
			}), data);

			queryClient.setQueryData(userKeys.watchlist({
				userId: data.user_id,
			}), (oldData: UserWatchlist[]) => {
				if (!oldData) return oldData;
				return oldData.map((item) => {
					if (item.type === 'tv_series' && item.id === data.id) {
						return {
							...item,
							...data,
						};
					}
					return item;
				});
			});
		}
	});
};
/* -------------------------------------------------------------------------- */

/* -------------------------------- PLAYLIST -------------------------------- */
export const useUserPlaylistSavedInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			playlistId,
		} : {
			userId: string;
			playlistId: number;
		}) => {
			const { data, error } = await supabase
				.from('playlists_saved')
				.insert({
					user_id: userId,
					playlist_id: playlistId,
				})
				.select()
				.single()
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.playlistSaved({
				userId: data.user_id,
				playlistId: data.playlist_id,
			}), data);

			queryClient.invalidateQueries({
				queryKey: userKeys.playlistsSaved({
					userId: data.user_id,
				})
			})
		}
	});
};

export const useUserPlaylistSavedDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			savedId,
		} : {
			savedId: number;
		}) => {
			const { data, error } = await supabase
				.from('playlists_saved')
				.delete()
				.eq('id', savedId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.playlistSaved({
				userId: data.user_id,
				playlistId: data.playlist_id,
			}), null);

			queryClient.invalidateQueries({
				queryKey: userKeys.playlistsSaved({
					userId: data.user_id,
				})
			})
		}
	});
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- ACCOUNT -------------------------------- */
export const useUserDeleteRequestInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
		} : {
			userId: string;
		}) => {
			const { data, error } = await supabase
				.from('user_deletion_requests')
				.insert({
					user_id: userId,
				})
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.deleteRequest({ userId: data.user_id }), data);
		}
	});
};

export const useUserDeleteRequestDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
		} : {
			userId: string;
		}) => {
			const { data, error } = await supabase
				.from('user_deletion_requests')
				.delete()
				.eq('user_id', userId)
				.select()
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(userKeys.deleteRequest({ userId: data.user_id }), null);
		}
	});
};
/* -------------------------------------------------------------------------- */
