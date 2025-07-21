export const searchKeys = {
	all: () => ['search'],
	query: (query: string) => [...searchKeys.all(), query],

	/* ---------------------------------- USERS --------------------------------- */
	users: ({
		query,
		filters,
	}: {
		query: string;
		filters?: any;
	}) => filters ? [...searchKeys.query(query), 'users', filters] : [...searchKeys.query(query), 'users'],
	/* -------------------------------------------------------------------------- */


	/* -------------------------------- PLAYLISTS ------------------------------- */
	playlists: ({
		query,
		filters
	}: {
		query: string
		filters?: any
	}) => filters ? [...searchKeys.query(query), 'playlists', filters] : [...searchKeys.query(query), 'playlists'],
	/* -------------------------------------------------------------------------- */
}