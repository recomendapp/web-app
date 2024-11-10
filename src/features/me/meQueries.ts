import { useQuery } from "@tanstack/react-query"
import { useSupabaseClient } from '@/context/supabase-context';
import { PlaylistType, UserFriend } from "@/types/type.db";
import { meKeys } from "./meKeys";

/**
 * Fetches the user playlists to add a movie
 * @param userId The user id
 * @param movieId The movie id
 * @returns The user playlists
 */
export const useMeAddMovieToPlaylist = ({
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
		queryKey: meKeys.addMovieToPlaylistType({ movieId: movieId as number, type: type }),
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
 * Fetches the user friends to send a movie
 * @param userId The user id
 * @param movieId The movie id
 * @returns The user friends
 */
export const useMeSendMovie = ({
	userId,
	movieId,
} : {
	userId?: string;
	movieId?: number;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: meKeys.sendMovie({ movieId: movieId as number }),
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