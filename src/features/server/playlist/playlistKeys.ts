export const playlistKeys = {
	all: ['playlist'],

	featured: ({
		filters,
	} : {
		filters: any;
	}) => [...playlistKeys.all, 'featured', JSON.stringify(filters)],
};