import { PlaylistType } from "@/types/type.db";

export const meKeys = {
	all: ['me'] as const,

	playlists: () => [...meKeys.all, 'playlists'] as const,

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
	addMovieToPlaylist: ({
		movieId,
	} : {
		movieId: number;
	}) => [...meKeys.playlists(), 'add', movieId] as const,

	/**
	 * Fetches playlists to add a movie with a type
	 * @param movieId The movie id
	 * @param type The playlist type
	 * @returns List of playlists
	 */
	addMovieToPlaylistType: ({
		movieId,
		type,
	} : {
		movieId: number;
		type: PlaylistType;
	}) => [...meKeys.addMovieToPlaylist({ movieId }), type] as const,
}