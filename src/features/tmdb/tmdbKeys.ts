export const tmdbKeys = {
	all: ['tmdb'] as const,
	details: () => [...tmdbKeys.all, 'details'] as const,
	
	searchMovies: (
		query: string,
		filter?: {
			resultsPerPage?: number;
		}
	) => filter ? [...tmdbKeys.all, 'search', query, filter] : [...tmdbKeys.all, 'search', query] as const,
};
