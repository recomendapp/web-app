import { useSupabaseClient } from '@/context/supabase-context';
import { Media, Playlist, PlaylistGuest, PlaylistItem, PlaylistType } from '@/types/type.db';
import { matchQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistKeys } from './playlistKeys';
import { userKeys } from '../user/userKeys';
import toast from 'react-hot-toast';
import { mediaKeys } from '../media/mediaKeys';


/**
 * Creates a new playlist
 * @param userId The user id
 * @returns The mutation
 */
export const usePlaylistInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			title,
			type,
			userId,
			description,
			private: isPrivate,
			poster_url,
		} : {
			title: string;
			type: PlaylistType;
			userId: string;
			description?: string | null;
			private?: boolean;
			poster_url?: string | null;
		}) => {
			const { data, error } = await supabase
				.from('playlists')
				.insert({
					title,
					type,
					description,
					private: isPrivate,
					poster_url,
					user_id: userId,
				})
				.select(`*`)
				.single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: userKeys.playlists({
					userId: data.user_id,
				}),
			});
			// Maybe update cache manually to avoid a new query
		}
	});
};

export const usePlaylistUpdateMutation = () => {
	const supabase = useSupabaseClient();
	return useMutation({
		mutationFn: async ({
			playlistId,
			title,
			description,
			private: isPrivate,
			poster_url,
		} : {
			playlistId: number;
			title?: string;
			description?: string | null;
			private?: boolean;
			poster_url?: string | null;
		}) => {
			const { data, error } = await supabase
				.from('playlists')
				.update({
					title,
					description,
					private: isPrivate,
					poster_url,
				})
				.eq('id', playlistId)
				.select(`*`)
				.single();
			if (error) throw error;
			return data;
		},
	});
};

/**
 * Deletes a playlist
 * @param userId The user id
 * @returns The mutation
 */
export const usePlaylistDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			playlistId,
			userId,
		} : {
			playlistId: number;
			userId?: string;
		}) => {
			if (!userId) throw Error('User id is missing');
			const { error } = await supabase
				.from('playlists')
				.delete()
				.eq('id', playlistId)
			if (error) throw error;
			return {
				playlistId,
				userId,
			};
		},
		onSuccess: ({ userId }) => {
			queryClient.invalidateQueries({
				queryKey: userKeys.playlists({
					userId: userId,
				}),
			});
		}
	});
};

// Movie
export const usePlaylistMovieInsertMutation = ({
	movieId
} : {
	movieId: number;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			playlists,
			movieId,
			userId,
			comment,
		} : {
			playlists: Playlist[];
			movieId: number;
			userId: string;
			comment?: string;
		}) => {
			if (!userId) throw Error('User id is missing');
			if (playlists.length === 0) throw Error('You must select at least one playlist');
			const { data, error } = await supabase
				.from('playlist_items_movie')
				.insert(
					playlists.map((playlist) => ({
						playlist_id: playlist.id,
						movie_id: movieId,
						user_id: userId,
						comment: comment,
						rank: 0,
					}))
				);
			if (error) throw error;
			const updatedPlaylists = playlists.map((playlist) => ({
				...playlist,
				items_count: (playlist?.items_count ?? 0) + 1,
			}));
			return updatedPlaylists; // Normalized cache
		},
		onSuccess: (data) => {
			// queryClient.invalidateQueries({
			// 	queryKey: playlistKeys.detail(data.playlist_id),
			// });

			queryClient.invalidateQueries({
				queryKey: mediaKeys.playlists({
					id: movieId,
					type: 'movie',
				}),
			});
		},
		meta: {
			invalidates: [
				playlistKeys.addTo({ id: movieId, type: 'movie' }),
			]
		}
	});
};
// TV Series
export const usePlaylistTvSeriesInsertMutation = ({
	tvSeriesId
} : {
	tvSeriesId: number;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			playlists,
			tvSeriesId,
			userId,
			comment,
		} : {
			playlists: Playlist[];
			tvSeriesId: number;
			userId: string;
			comment?: string;
		}) => {
			if (!userId) throw Error('User id is missing');
			if (playlists.length === 0) throw Error('You must select at least one playlist');
			const { data, error } = await supabase
				.from('playlist_items_tv_series')
				.insert(
					playlists.map((playlist) => ({
						playlist_id: playlist.id,
						tv_series_id: tvSeriesId,
						user_id: userId,
						comment: comment,
						rank: 0,
					}))
				);
			if (error) throw error;
			const updatedPlaylists = playlists.map((playlist) => ({
				...playlist,
				items_count: (playlist?.items_count ?? 0) + 1,
			}));
			return updatedPlaylists; // Normalized cache
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: mediaKeys.playlists({
					id: tvSeriesId,
					type: 'tv_series',
				}),
			});
		},
		meta: {
			invalidates: [
				playlistKeys.addTo({ id: tvSeriesId, type: 'tv_series' }),
			]
		}
	});
};

/**
 * Adds movies to a playlist
 * @param userId The user id
 * @param playlist The playlist
 * @returns The mutation
 */
export const usePlaylistAddMediasMutation = ({
	userId,
	playlist,
} : {
	userId?: string;
	playlist: Playlist;
}) => {
	const supabase = useSupabaseClient();
	return useMutation({
		mutationFn: async ({
			medias,
			comment,
		} : {
			medias: Media[];
			comment?: string;
		}) => {
			if (!userId) throw Error('Vous devez être connecté pour effectuer cette action');
			if (!playlist?.id) throw Error('Missing playlist id');
			if (!medias || medias.length === 0) throw Error('Missing media ids');
			const { error } = await supabase
				.from('playlist_items')
				.insert(
					medias
						.map((media) => ({
							playlist_id: playlist.id,
							media_id: media?.media_id!,
							user_id: userId,
							comment: comment,
							rank: 0,
						}))
				);
			if (error) throw error;
		},
		// onSuccess: () => {
		// 	queryClient.invalidateQueries(playlistKeys.detail(playlistId));
		// }
		meta: {
			invalidates: [
				// TODO: Add the playlist key
			]
		}
	});
}

export const usePlaylistItemDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			playlistId,
			playlistItemId,
			mediaId,
		} : {
			playlistId: number;
			playlistItemId: number;
			mediaId: number;
		}) => {
			const { error } = await supabase
				.from('playlist_items')
				.delete()
				.eq('id', playlistItemId)
			if (error) throw error;
			return { playlistId, playlistItemId, mediaId };
		},
		onSuccess: ({ playlistId, playlistItemId, mediaId }) => {
			queryClient.invalidateQueries({
				queryKey: playlistKeys.addTo({ mediaId }),
			});
			queryClient.invalidateQueries({
				queryKey: mediaKeys.playlists({
					id: mediaId,
				}),
			});
			queryClient.setQueryData(playlistKeys.detail(playlistId), (data: Playlist) => {
				if (!data) return null;
				return {
					...data,
					items_count: data.items_count - 1,
				};
			});
		},
		onError: (error) => {
			toast.error('Une erreur s\'est produite');
		}
	});
}

export const usePlaylistItemsMutation = ({
	playlistId
} : {
	playlistId: number;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			event,
			payload,
		} : {
			event: string;
			payload: {
				old: PlaylistItem;
				new: PlaylistItem;
			}
		}) => {
			const newPlaylistItems = [...queryClient.getQueryData<PlaylistItem[]>(playlistKeys.items(playlistId)) || []];
			if (!newPlaylistItems.length) throw new Error('playlist items is undefined');
			switch (event) {
			case 'INSERT':
				if (payload.new.playlist_id !== playlistId) throw new Error('Invalid playlist id');
				newPlaylistItems.forEach(item => {
					if (item.rank >= payload.new.rank) {
						item.rank++;
					}
				});
				newPlaylistItems.push(payload.new);
				break;
			case 'UPDATE':
				if (!payload.new.playlist_id) throw new Error('Invalid playlist id');
				const itemIndex = newPlaylistItems.findIndex((item) => item.id === payload.new.id);
				if (itemIndex === -1) throw new Error('Missing item');

				if (payload.old.rank !== payload.new.rank) {
				if (payload.old.rank < payload.new.rank) {
					newPlaylistItems.forEach(item => {
					if (item.rank > payload.old.rank && item.rank <= payload.new.rank) {
						item.rank--;
					}
					});
				}
				if (payload.old.rank > payload.new.rank) {
					newPlaylistItems.forEach(item => {
					if (item.rank < payload.old.rank && item.rank >= payload.new.rank) {
						item.rank++;
					}
					});
				}
				}
				newPlaylistItems[itemIndex] = payload.new;
				break;
			case 'DELETE':
				if (!payload.old.playlist_id) throw new Error('Invalid playlist id');
				const deleteIndex = newPlaylistItems.findIndex((item) => item.id === payload.old.id);
				if (deleteIndex === -1) throw new Error('Missing item');
				newPlaylistItems.splice(deleteIndex, 1);

				newPlaylistItems.forEach(item => {
					if (item.rank > payload.old.rank) {
						item.rank--;
					}
				});
				break;
			default:
				break;
			};
			newPlaylistItems.sort((a, b) => a.rank - b.rank);
			return newPlaylistItems;
		},
		onSuccess: (newPlaylistItems) => {
			newPlaylistItems && queryClient.setQueryData(playlistKeys.items(playlistId), [...newPlaylistItems]);
		},
		onError: (error) => {
			queryClient.invalidateQueries({
				queryKey: playlistKeys.items(playlistId),
			});
		}
	});
}

export const usePlaylistGuestUpdateMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			playlistId,
			edit,
		} : {
			id: number;
			playlistId: number;
			edit: boolean;
		}) => {
			const { data, error } = await supabase
				.from('playlist_guests')
				.update({
					edit,
				})
				.eq('id', id)
			if (error) throw error;
			return { id, playlistId, edit };
		},
		onSuccess: ({ id, playlistId, edit }) => {
			queryClient.setQueryData(playlistKeys.guests(playlistId), (data: PlaylistGuest[]) => {
				if (!data) return null;
				return data.map((guest) => {
					if (guest?.id === id) {
						return {
							...guest,
							edit,
						};
					}
					return guest;
				});
			});
		}
	});
}

export const usePlaylistGuestsDeleteMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			ids,
			playlistId,
		} : {
			ids: number[];
			playlistId: number;
		}) => {
			const { error } = await supabase
				.from('playlist_guests')
				.delete()
				.in('id', ids)
			if (error) throw error;
			return { ids, playlistId };
		},
		onSuccess: ({ ids, playlistId }) => {
			queryClient.setQueryData(playlistKeys.guests(playlistId), (data: PlaylistGuest[]) => {
				if (!data) return null;
				return data.filter((guest) => !ids.includes(guest?.id as number));
			});
		}
	});
}

export const usePlaylistGuestsInsertMutation = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			playlistId,
			userIds,
		} : {
			playlistId: number;
			userIds: string[];
		}) => {
			const { data, error } = await supabase
				.from('playlist_guests')
				.insert(
					userIds.map((userId) => ({
						playlist_id: playlistId,
						user_id: userId,
					}))
				)
				.select(`
					*,
					user(*)
				`)
			if (error) throw error;
			return { playlistId, data };
		},
		onSuccess: ({ playlistId, data }) => {
			queryClient.setQueryData(playlistKeys.guests(playlistId), (oldData: PlaylistGuest[]) => {
				return [...oldData, ...data];
			});
			// queryClient.invalidateQueries({
			// 	queryKey: playlistKeys.guests(playlistId),
			// });
		}
	});
}
