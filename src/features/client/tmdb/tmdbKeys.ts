export const tmdbKeys = {
	all: ['tmdb'] as const,

	search: ['search'] as const,
	
	searchMulti: (
		query: string,
		filter?: {
			resultsPerPage?: number;
		}
	) => filter ? [...tmdbKeys.all, ...tmdbKeys.search, "multi", query, filter] : [...tmdbKeys.all, ...tmdbKeys.search, "multi", query] as const,

	searchMovies: (
		query: string,
		filter?: {
			resultsPerPage?: number;
		}
	) => filter ? [...tmdbKeys.all, ...tmdbKeys.search, "movies", query, filter] : [...tmdbKeys.all, ...tmdbKeys.search, "movies", query] as const,

	searchSeries: (
		query: string,
		filter?: {
			resultsPerPage?: number;
		}
	) => filter ? [...tmdbKeys.all, ...tmdbKeys.search, "series", query, filter] : [...tmdbKeys.all, ...tmdbKeys.search, "series", query] as const,

	searchPersons: (
		query: string,
		filter?: {
			resultsPerPage?: number;
		}
	) => filter ? [...tmdbKeys.all, ...tmdbKeys.search, "persons", query, filter] : [...tmdbKeys.all, ...tmdbKeys.search, "persons", query] as const,

};
