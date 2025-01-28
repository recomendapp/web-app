import { MediaType, PlaylistType } from "@/types/type.db";

export const meKeys = {
	all: ['me'] as const,

	notifications: () => [...meKeys.all, 'notifications'] as const,

	playlists: () => [...meKeys.all, 'playlists'] as const,


	/**
	 * Fetches friends of a user to send a recommendation
	 * @param mediaId The media id
	 * @param mediaType The media type
	 * @returns List of friends
	 */
	// sendReco: ({
	// 	mediaId,
	// 	mediaType,
	// } : {
	// 	mediaId: number;
	// 	mediaType: MediaType;
	// }) => [...meKeys.all, 'friends', 'send', mediaType, mediaId] as const,



	/* -------------------------------------------------------------------------- */
	/*                                     OLD                                    */
	/* -------------------------------------------------------------------------- */

	/**
	 * Fetches friends of a user to send a movie
	 * @param movieId The movie id
	 * @returns List of friends
	 */
	sendMovie: ({
		movieId,
	} : {
		movieId: number;
	}) => [...meKeys.all, 'friends', 'send', movieId] as const,
		

	/**
	 * Fetches playlists to add a movie
	 * @param userId The user id
	 * @param movieId The movie id
	 * @returns List of playlists
	 */
	addMediaToPlaylist: ({
		mediaId,
		mediaType,
	} : {
		mediaId: number;
		mediaType: MediaType;
	}) => [...meKeys.playlists(), 'add', mediaType, mediaId] as const,

	/**
	 * Fetches playlists to add a movie with a type
	 * @param movieId The movie id
	 * @param type The playlist type
	 * @returns List of playlists
	 */
	addMediaToPlaylistType: ({
		mediaId,
		mediaType,
		type,
	} : {
		mediaId: number;
		mediaType: MediaType;
		type: PlaylistType;
	}) => [...meKeys.addMediaToPlaylist({ mediaId, mediaType }), type] as const,
}