export const playlistKeys = {
	all: ['playlist'],

	featured: () => [...playlistKeys.all, 'featured'],
};