import { useSupabaseClient } from '@/context/supabase-context';
import { Playlist, PlaylistType, User } from '@/types/type.db';
import { matchQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './userKeys';
import { playlistKeys } from '../playlist/playlistKeys';

/**
 * Sends a movie to friends
 * @param movieId The movie id
 * @param senderId The sender id
 * @returns The mutation
 */
export const useSendMovie = ({
	movieId,
	senderId,
} : {
	movieId: number;
	senderId?: string;
}) => {
	const supabase = useSupabaseClient();
	return useMutation({
		mutationFn: async ({
			users,
			comment,
		} : {
			users: User[];
			comment: string;
		}) => {
			if (!senderId) throw Error('Vous devez être connecté pour effectuer cette action');
			if (!users || users.length === 0) throw Error('Vous devez sélectionner au moins un ami');
			const { error } = await supabase
				.rpc('user_movie_guidelist_insert', {
					movieid: movieId,
					receiver_user_ids: users.map((user) => String(user?.id)),
					sender_user_id: senderId,
					comment: comment,
				})
			if (error) throw error;
		},
		meta: {
			invalidates: [
				userKeys.sendMovie(senderId as string, movieId),
			]
		}
	});
}

/**
 * Adds a movie to a playlist
 * @param movieId The movie id
 * @param userId The user id
 * @returns The mutation
 */
export const useAddMovieToPlaylist = ({
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
			comment: string;
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
		},
		onSuccess: (playlists) => {
			queryClient.invalidateQueries({
				predicate: (query) => playlists.some((playlist) => matchQuery({ queryKey: playlistKeys.detail(playlist?.id as number) }, query)) ?? false,
			});
		},
		meta: {
			invalidates: [
				userKeys.addMovieToPlaylist(userId as string, movieId),
			]
		}
	});
}