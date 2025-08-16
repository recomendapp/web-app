import { UserActivityType, UserRecosType, UserReviewType, UserWatchlistType } from "@/types/type.db"

export const userKeys = {
	all: ['user'] as const,
	search: (filters?: {
		search?: string | null;
	}) => filters ? [...userKeys.all, 'search', filters] as const : [...userKeys.all, 'search'] as const,
	details: () => [...userKeys.all, 'details'] as const,
	/**
	 * Fetches details of a user
	 * @param userId The user id
	 * @returns The user details
	 */
	detail: (userId: string) => [...userKeys.all, userId] as const,
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
	) => filters ? [...userKeys.detail(userId), 'followers', filters] as const : [...userKeys.detail(userId), 'followers'] as const,

	/**
	 * Fetches followers requests of a user
	 * @param userId The user id
	 * @returns List of followers requests
	 */
	followersRequests: (
		userId: string,
	) => [...userKeys.detail(userId), 'followers-requests'] as const,

	/**
	 * Fetches followees of a user
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns List of followees
	 */
	followees: (
		userId: string,
		filters?: {
			infinite?: boolean;
			search?: string | null
		},
	) => filters ? [...userKeys.detail(userId), 'followees', filters] as const : [...userKeys.detail(userId), 'followees'] as const,
	followProfile: (userId: string, profileId: string) => [...userKeys.detail(userId), 'follow', profileId] as const,
	followPerson: (userId: string, personId: number) => [...userKeys.detail(userId), 'follow-person', personId] as const,


	/* -------------------------------- ACTIVITY -------------------------------- */
	// activities: ({
	// 	userId,
	// 	filters,
	// } : {
	// 	userId: string;
	// 	filters?: any;
	// }) => filters ? [...userKeys.detail(userId), 'activities', filters] as const : [...userKeys.detail(userId), 'activities'] as const,
	activities: ({
		userId,
		type,
		filters,
	} : {
		userId: string;
		type?: UserActivityType;
		filters?: any;
	}) => {
		const sub = [...(type ? [type] : []), ...(filters ? [filters] : [])]
		return [...userKeys.detail(userId), 'activities', ...sub] as const
	},

	activity: ({
		id,
		type,
		userId,
	} : {
		id: number;
		type: UserActivityType;
		userId: string;
	}) => {
		return [...userKeys.activities({ userId, type }), id] as const
	},

	// activity: ({
	// 	userId,
	// 	mediaId,
	// } : {
	// 	userId: string;
	// 	mediaId: number;
	// }) => [...userKeys.detail(userId), 'activity', mediaId] as const,

	followersRating: ({
		userId,
		mediaId,
	} : {
		userId: string;
		mediaId: number;
	}) => [...userKeys.detail(userId), 'followers-rating', mediaId] as const,
	/* -------------------------------------------------------------------------- */

	/* --------------------------------- REVIEW --------------------------------- */
	reviews: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: any;
	}) => filters ? [...userKeys.detail(userId), 'reviews', filters] as const : [...userKeys.detail(userId), 'reviews'] as const,

	review: ({
		id,
		type,
	} : {
		id: number;
		type: UserReviewType;
	}) => [...userKeys.all, 'review', type, id] as const,

	reviewLike: ({
		reviewId,
		type,
		userId,
	} : {
		reviewId: number;
		type: UserReviewType;
		userId: string;
	}) => [...userKeys.detail(userId), 'review-like', type, reviewId] as const,
	/* -------------------------------------------------------------------------- */

	/* ---------------------------------- RECOS --------------------------------- */
	recos: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: any;
	}) => filters ? [...userKeys.detail(userId), 'recos', filters] as const : [...userKeys.detail(userId), 'recos'] as const,

	recosSend: ({
		id,
		type,
	} : {
		id: number;
		type: UserRecosType;
	}) => [...userKeys.all, 'recos-send', type, id] as const,
	/* -------------------------------------------------------------------------- */

	/* -------------------------------- WATCHLIST ------------------------------- */
	watchlist: ({
		userId,
		type,
		filters,
	} : {
		userId: string;
		type?: UserWatchlistType;
		filters?: any;
	}) => {
		const sub = [...(type ? [type] : []), ...(filters ? [filters] : [])]
		return [...userKeys.detail(userId), 'watchlist', ...sub] as const
	},

	watchlistItem: ({
		id,
		type,
		userId,
	} : {
		id: number;
		type: UserWatchlistType;
		userId: string;
	}) => {
		const sub = [type, id]
		return [...userKeys.detail(userId), 'watchlist-item', ...sub] as const
	},

	/* -------------------------------------------------------------------------- */

	/* ---------------------------------- LIKES --------------------------------- */
	likes: ({
		userId,
		type,
		filters,
	} : {
		userId: string;
		type?: UserActivityType;
		filters?: any;
	}) => {
		const sub = [...(type ? [type] : []), ...(filters ? [filters] : [])]
		return [...userKeys.detail(userId), 'heart-pick', ...sub] as const
	},
	/* -------------------------------------------------------------------------- */

	/* ---------------------------------- FEED ---------------------------------- */
	/**
	 * Fetches the user's feed
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns The user's feed
	 */
	feed: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: any;
	}) => filters ? [...userKeys.detail(userId), 'feed', filters] as const : [...userKeys.detail(userId), 'feed'] as const,

	feedCastCrew: (
		userId: string,
		filters?: any
	) => filters ? [...userKeys.detail(userId), 'feed-cast-crew', filters] as const : [...userKeys.detail(userId), 'feed-cast-crew'] as const,
	/* -------------------------------------------------------------------------- */

	/* -------------------------------- PLAYLIST -------------------------------- */
	/**
	 * Fetches the user's playlists
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns The user's playlists
	 */
	playlists: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: any;
	}) => filters ? [...userKeys.detail(userId), 'playlists', filters] as const : [...userKeys.detail(userId), 'playlists'] as const,

	playlistSaved: ({
		userId,
		playlistId,
	} : {
		userId: string;
		playlistId: number;
	}) => [...userKeys.detail(userId), 'playlist-saved', playlistId] as const,

	playlistsSaved: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: any;
	}) => filters ? [...userKeys.detail(userId), 'playlists-saved', filters] as const : [...userKeys.detail(userId), 'playlists-saved'] as const,

	/**
	 * Fetches playlists of friends
	 * @param userId The user id
	 * @param filters The filters (optional)
	 * @returns The playlists of friends
	 */
	playlistsFriends: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: any;
	}) => filters ? [...userKeys.detail(userId), 'playlists-friends', filters] as const : [...userKeys.detail(userId), 'playlists-friends'] as const,

	/* -------------------------------------------------------------------------- */

	/* ------------------------------ SUBSCRIPTION ------------------------------ */
	subscriptions: ({
		userId,
	} : {
		userId: string;
	}) => [...userKeys.detail(userId), 'subscriptions'] as const,
	/* -------------------------------------------------------------------------- */

	/* --------------------------------- ACCOUNT -------------------------------- */
	deleteRequest: ({
		userId,
	} : {
		userId: string;
	}) => [...userKeys.detail(userId), 'delete-request'] as const,
	/* -------------------------------------------------------------------------- */


	/* --------------------------------- OTHERS --------------------------------- */
	/**
	 * Discover users
	 * @param filters The filters (optional)
	 * @returns The discovered users
	 */
	discovery: ({
		filters,
	} : {
		filters?: any
	}) => filters ? [...userKeys.all, 'discovery', filters] as const : [...userKeys.all, 'discovery'] as const,
	/* -------------------------------------------------------------------------- */
};
