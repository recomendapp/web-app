import { PlaylistType } from "@/types/type.db"

export const userKeys = {
	all: ['user'] as const,
	details: () => [...userKeys.all, 'details'] as const,
	/**
	 * Fetches details of a user
	 * @param userId The user id
	 * @returns The user details
	 */
	detail: (userId: string) => [...userKeys.details(), userId] as const,
	/**
	 * Fetches friends of a user
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns List of friends
	 */
	friends: (
		userId: string,
		filters?: {
			search?: string | null
		}
	) => filters ? [...userKeys.detail(userId), 'friends', filters] : [...userKeys.detail(userId), 'friends'] as const,
	/**
	 * Fetches friends of a user to send a movie
	 * @param userId The user id
	 * @param movieId The movie id
	 * @returns List of friends
	 */
	sendMovie: (
		userId: string,
		movieId: number,
	) => [...userKeys.detail(userId), 'friends', 'send', movieId] as const,
	/**
	 * Fetches playlists to add a movie
	 * @param userId The user id
	 * @param movieId The movie id
	 * @returns List of playlists
	 */
	addMovieToPlaylist: (
		userId: string,
		movieId: number,
	) => [...userKeys.detail(userId), 'playlists', 'add', movieId] as const,
	/**
	 * Fetches playlists to add a movie with a type
	 * @param userId The user id
	 * @param movieId The movie id
	 * @param type The playlist type
	 * @returns List of playlists
	 */
	addMovieToPlaylistType: (
		userId: string,
		movieId: number,
		type: PlaylistType,
	) => [...userKeys.addMovieToPlaylist(userId, movieId), type] as const,
	/**
	 * Fetches followers of a user
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns List of followers
	 */
	followers: (
		userId: string,
		filters?: {
			search?: string | null
		}
	) => filters ? [...userKeys.detail(userId), 'followers', filters] : [...userKeys.detail(userId), 'followers'] as const,
	/**
	 * Fetches followees of a user
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns List of followees
	 */
	followees: (
		userId: string,
		filters?: {
			search?: string | null
		}
	) => filters ? [...userKeys.detail(userId), 'followees', filters] : [...userKeys.detail(userId), 'followees'] as const,

	movies: (userId: string) => [...userKeys.detail(userId), 'movies'] as const,
	movie: (userId: string, movieId: string) => [...userKeys.movies(userId), movieId] as const,
	movieActivity: (userId: string, movieId: string) => [...userKeys.movie(userId, movieId), 'activity'] as const,
	/**
	 * Fetches the user's guidelist
	 * @param userId The user id
	 * @returns The user's guidelist
	 */
	guidelist: (
		userId: string,
		filters?: {
			order?: 'created_at-desc' | 'created_at-asc' | 'random';
			limit?: number;
		}
	) => filters ? [...userKeys.detail(userId), 'guidelist', filters] : [...userKeys.detail(userId), 'guidelist'] as const,

	/**
	 * Fetches the user's watchlist
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns The user's watchlist
	 */
	watchlist: (
		userId: string,
		filters?: {
			order?: 'created_at-desc' | 'created_at-asc' | 'random';
			limit?: number;
		}
	) => filters ? [...userKeys.detail(userId), 'watchlist', filters] : [...userKeys.detail(userId), 'watchlist'] as const,
	/**
	 * Fetches the user's playlists
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns The user's playlists
	 */
	playlists: (
		userId: string,
		filters?: {
			order?: 'updated_at-desc' | 'updated_at-asc'
		}
	) => filters ? [...userKeys.detail(userId), 'playlists', filters] : [...userKeys.detail(userId), 'playlists'] as const,

	/**
	 * Fetches the user's feed
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns The user's feed
	 */
	feed: (
		userId: string,
		filters?: any
		// filters?: {
		// 	limit?: number;
		// }
	) => filters ? [...userKeys.detail(userId), 'feed', filters] : [...userKeys.detail(userId), 'feed'] as const,

	/**
	 * Fetches playlists of friends
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns The playlists of friends
	 */
	playlistsFriends: (
		userId: string,
		filters?: any
	) => filters ? [...userKeys.detail(userId), 'playlists-friends', filters] : [...userKeys.detail(userId), 'playlists-friends'] as const,
};
