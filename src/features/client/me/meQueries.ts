import { useQuery } from "@tanstack/react-query"
import { useSupabaseClient } from '@/context/supabase-context';
import { UserRecosAggregated, PlaylistType, UserFriend } from "@/types/type.db";
import { meKeys } from "./meKeys";

/**
 * Fetches the user playlists to add a movie
 * @param userId The user id
 * @param movieId The movie id
 * @returns The user playlists
 */
export const useMeAddMediaToPlaylist = ({
	mediaId,
	userId,
	type = 'personal',
} : {
	mediaId: number;
	userId?: string;
	type: PlaylistType;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: meKeys.addMediaToPlaylistType({ mediaId: mediaId, type: type }),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			if (!type) throw Error('Missing type');
			if (type === 'personal') { // personal
				const { data, error } = await supabase
					.from('playlists')
					.select('*, playlist_items(count)')
					.match({
						'user_id': userId,
						'playlist_items.media_id': mediaId,
					})
					.order('updated_at', { ascending: false })
				if (error) throw error;
				const output = data?.map(({ playlist_items, ...playlist }) => ({
					playlist: playlist,
					already_added: playlist_items[0]?.count > 0,
				}));
				return output;
			} else { // shared
				const { data, error } = await supabase
					.from('playlists_saved')
					.select(`
						id,
						playlist:playlists!inner(
							*,
							playlist_guests!inner(*),
							user!inner(*),
							playlist_items(count)
						)
					`)
					.match({
						'user_id': userId,
						'playlist.playlist_guests.user_id': userId,
						'playlist.playlist_guests.edit': true,
						'playlist.user.premium': true,
						'playlist.playlist_items.media_id': mediaId,
					})
					.order('updated_at', {
						referencedTable: 'playlist',
						ascending: false 
					})
				if (error) throw error;
				const output = data?.map(({ playlist: { playlist_items, playlist_guests, user, ...playlist }, ...playlists_saved }) => ({
					playlist: playlist,
					already_added: playlist_items[0]?.count > 0,
				}));
				return output;
			}
		},
		enabled: !!userId && !!mediaId,
	});
}