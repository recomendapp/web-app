import { MediaType, PlaylistType } from "@/types/type.db";

export const meKeys = {
	all: ['me'] as const,

	notifications: () => [...meKeys.all, 'notifications'] as const,

	playlists: () => [...meKeys.all, 'playlists'] as const,

	/* -------------------------------------------------------------------------- */
	/*                                     OLD                                    */
	/* -------------------------------------------------------------------------- */
		

	/**
	 * Fetches playlists to add a movie
	 * @param userId The user id
	 * @param movieId The movie id
	 * @returns List of playlists
	 */
	addMediaToPlaylist: ({
		mediaId,
	} : {
		mediaId: number;
	}) => [...meKeys.playlists(), 'add', mediaId] as const,

	/**
	 * Fetches playlists to add a movie with a type
	 * @param movieId The movie id
	 * @param type The playlist type
	 * @returns List of playlists
	 */
	addMediaToPlaylistType: ({
		mediaId,
		type,
	} : {
		mediaId: number;
		type: PlaylistType;
	}) => [...meKeys.addMediaToPlaylist({ mediaId }), type] as const,
}