export const userKeys = {
	base: ['user'] as const,

	details: ({
		userId,
	} : {
		userId: string;
	}) => [...userKeys.base, userId] as const,

	/* ---------------------------------- FEED ---------------------------------- */
	myFeed: ({
		filters,
	} : {
		filters?: {
			sortBy?: 'created_at';
			sortOrder?: 'asc' | 'desc';
			perPage?: number;
		}
	}) => filters ? [...userKeys.base, 'my_feed', filters] as const : [...userKeys.base, 'my_feed'] as const,
	feed: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: {
			sortBy?: 'created_at';
			sortOrder?: 'asc' | 'desc';
			perPage?: number;
		}
	}) => filters ? [...userKeys.details({ userId }), 'feed', filters] as const : [...userKeys.details({ userId }), 'feed'] as const,
	/* -------------------------------------------------------------------------- */

	/* ------------------------------- Activities ------------------------------- */
	activities: ({
		userId,
		type,
	} : {
		userId: string;
		type: 'movie' | 'tv_series';
	}) => [...userKeys.details({ userId }), 'activities', type] as const,

	movieActivities: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: {
			sortBy?: 'watched_date' | 'rating';
			sortOrder?: 'asc' | 'desc';
			perPage?: number;
		}
	}) => filters ? [...userKeys.activities({ userId, type: 'movie' }), filters] as const : userKeys.activities({ userId, type: 'movie' }),

	tvSeriesActivities: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: {
			sortBy?: 'watched_date' | 'rating';
			sortOrder?: 'asc' | 'desc';
			perPage?: number;
		}
	}) => filters ? [...userKeys.activities({ userId, type: 'tv_series' }), filters] as const : userKeys.activities({ userId, type: 'tv_series' }),
	/* -------------------------------------------------------------------------- */

	/* -------------------------------- Playlists ------------------------------- */
	playlists: ({
		userId,
		filters,
	} : {
		userId: string;
		filters?: {
			sortBy?: 'updated_at';
			sortOrder?: 'asc' | 'desc';
			perPage?: number;
		}
	}) => filters ? [...userKeys.details({ userId }), 'playlists', filters] as const : [...userKeys.details({ userId }), 'playlists'] as const,
	/* -------------------------------------------------------------------------- */
}