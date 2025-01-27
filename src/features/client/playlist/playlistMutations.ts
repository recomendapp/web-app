import { useSupabaseClient } from '@/context/supabase-context';
import { Movie, Playlist, PlaylistGuest, PlaylistItem } from '@/types/type.db';
import { matchQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistKeys } from './playlistKeys';
import { userKeys } from '../user/userKeys';
import { meKeys } from '../me/meKeys';
import toast from 'react-hot-toast';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';


/**
 * Creates a new playlist
 * @param userId The user id
 * @returns The mutation
 */
export const useCreatePlaylist = ({
	userId,
} : {
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			title,
			description,
			private: isPrivate,
			poster_url,
		} : {
			title: string;
			description?: string;
			private?: boolean;
			poster_url?: string;
		}) => {
			if (!userId) throw Error('User id is missing');
			const { data, error } = await supabase
				.from('playlist')
				.insert({
					title,
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
					userId: userId as string,
				}),
			});
			// Maybe update cache manually to avoid a new query
		}
	});
}

/**
 * Deletes a playlist
 * @param userId The user id
 * @returns The mutation
 */
export const useDeletePlaylist = ({
	userId,
} : {
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			playlistId,
		} : {
			playlistId: number;
		}) => {
			if (!userId) throw Error('User id is missing');
			const { error } = await supabase
				.from('playlist')
				.delete()
				.eq('id', playlistId)
			if (error) throw error;
			return playlistId;
		},
		onSuccess: (playlistId) => {
			queryClient.invalidateQueries({
				queryKey: userKeys.playlists({
					userId: userId as string,
				}),
			});
		}
	});
}


/**
 * Adds a movie to a playlist
 * @param movieId The movie id
 * @param userId The user id
 * @returns The mutation
 */
export const useAddMovieToPlaylists = ({
	movieId,
	userId,
} : {
	movieId: number;
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			playlists,
			comment,
		} : {
			playlists: Playlist[];
			comment?: string;
		}) => {
			if (!userId) throw Error('Vous devez être connecté pour effectuer cette action');
			if (!playlists || playlists.length === 0) throw Error('Vous devez sélectionner au moins une playlist');
			const { error } = await supabase
				.from('playlist_item')
				.insert(
					playlists
						.map((playlist) => ({
							playlist_id: playlist?.id!,
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
			return updatedPlaylists;
			// return playlists;
		},
		onSuccess: (playlists) => {
			queryClient.invalidateQueries({
				predicate: (query) => playlists.some((playlist) => matchQuery({ queryKey: playlistKeys.items(playlist?.id as number) }, query)) ?? false,
			});
		},
		meta: {
			invalidates: [
				// userKeys.addMovieToPlaylist(userId as string, movieId),
				meKeys.addMovieToPlaylist({ movieId: movieId }),
			]
		}
	});
}

/**
 * Adds movies to a playlist
 * @param userId The user id
 * @param playlist The playlist
 * @returns The mutation
 */
export const useAddMoviesToPlaylist = ({
	userId,
	playlist,
} : {
	userId?: string;
	playlist: Playlist;
}) => {
	const supabase = useSupabaseClient();
	return useMutation({
		mutationFn: async ({
			movies,
			comment,
		} : {
			movies: Movie[];
			comment?: string;
		}) => {
			if (!userId) throw Error('Vous devez être connecté pour effectuer cette action');
			if (!playlist?.id) throw Error('Missing playlist id');
			if (!movies || movies.length === 0) throw Error('Missing movie ids');
			const { error } = await supabase
				.from('playlist_item')
				.insert(
					movies
						.map((movieId) => ({
							playlist_id: playlist.id,
							movie_id: movieId?.id!,
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

export const useDeletePlaylistItem = () => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			playlistItemId,
			movieId,
		} : {
			playlistItemId: number;
			movieId: number;
		}) => {
			const { error } = await supabase
				.from('playlist_item')
				.delete()
				.eq('id', playlistItemId)
			if (error) throw error;
			return { movieId };
		},
		onSuccess: ({ movieId }) => {
			queryClient.invalidateQueries({
				queryKey: meKeys.addMovieToPlaylist({ movieId: movieId }),
			});
		},
		onError: (error) => {
			toast.error('Une erreur s\'est produite');
		}
	});
}

export const useUpdatePlaylistItemChanges = ({
	playlistId
} : {
	playlistId: number;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			events,
		} : {
			events: RealtimePostgresChangesPayload<{
				[key: string]: any;
			}>[] | null;
		}) => {
			if (!events) return null;
			const newPlaylistItems = queryClient.getQueryData<PlaylistItem[]>(playlistKeys.items(playlistId));
			if (!newPlaylistItems) throw Error('Missing playlist items');
			for (const payload of events) {
				switch (payload.eventType) {
				  /*
				  * INSERT:
				  *  - Check if the new item rank is n + 1 from the last item rank => if not, return false
				  *  - If everything is ok, ask supabase for the new item and add it to the playlist.items
				  */
				  case 'INSERT':
					if (payload.new.rank !== newPlaylistItems.length + 1) throw Error('Invalid rank');
					const { error: insertError, data: insertData } = await supabase
					  .from('playlist_item')
					  .select(`
						*,
						movie(*)
					  `)
					  .eq('id', payload.new.id)
					  .single();
					if (insertError || !insertData) throw insertError;
					newPlaylistItems.push(insertData);
					break;
				  /*
				  * UPDATE:
				  *  - Check if the item exists in the playlist.items => if not, return false
				  *  - If everything is ok, update the item from payload.new and re-order the playlist.items
				  */
				  case 'UPDATE':
					const itemIndex = newPlaylistItems.findIndex(item => item?.id === payload.new.id);
					if (itemIndex === -1) throw Error('Missing item');
					newPlaylistItems[itemIndex] = { ...newPlaylistItems[itemIndex], ...payload.new } as PlaylistItem;
					break;
				  /*
				  * DELETE:
				  *  - Check if the item exists in the playlist.items => if not, return false
				  */
				  case 'DELETE':
					const deleteIndex = newPlaylistItems.findIndex(item => item?.id === payload.old.id);
					if (deleteIndex === -1) throw Error('Missing item');
					newPlaylistItems.splice(deleteIndex, 1);
					break;
				  default:
					break;
				}
			  }
		  
			  newPlaylistItems.sort((a, b) => a!.rank - b!.rank);

			  return newPlaylistItems;
		},
		onSuccess: (newPlaylistItems) => {
			newPlaylistItems && queryClient.setQueryData(playlistKeys.items(playlistId), [...newPlaylistItems]);
		},
		onError: (error) => {
			toast.error('Une erreur s\'est produite');
			queryClient.invalidateQueries({
				queryKey: playlistKeys.items(playlistId),
			});
		}
	});
}

export const useUpdatePlaylistGuest = () => {
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
				.from('playlist_guest')
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

export const useDeletePlaylistGuests = () => {
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
				.from('playlist_guest')
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

export const useAddPlaylistGuests = () => {
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
				.from('playlist_guest')
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
