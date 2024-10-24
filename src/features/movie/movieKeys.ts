export const movieKeys = {
	all: ['movie'] as const,
	details: () => [...movieKeys.all, 'details'] as const,
	detail: (movieId: number) => [...movieKeys.details(), movieId] as const,

	mostRecommended: ({
		filters,
	} : {
		filters?: {
			order?: 'asc' | 'desc',
			limit?: number,
		}
	}) => filters ? [...movieKeys.all, 'mostRecommended', filters] : [...movieKeys.all, 'mostRecommended'] as const,
};