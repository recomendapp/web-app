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
	 * Fetches followers of a user
	 * @param userId The user id
	 * @param filters The filters
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
	 * @param filters The filters
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

	/**
	 * Fetches the user's guidelist
	 * @param userId The user id
	 * @returns The user's guidelist
	 */
	guidelist: (userId: string) => [...userKeys.detail(userId), 'guidelist'] as const,
};
