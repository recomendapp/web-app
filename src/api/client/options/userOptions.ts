import { infiniteQueryOptions } from "@tanstack/react-query";
import { userKeys } from "../keys/userKeys";
import { useSupabaseClient } from "@/context/supabase-context";

/* ---------------------------------- FEED ---------------------------------- */
export const useUserMyFeedInfiniteOptions = ({
	filters,
} : {
	filters?: {
		sortBy?: 'created_at';
		sortOrder?: 'asc' | 'desc';
		perPage?: number;
	}
} = {}) => {
	const supabase = useSupabaseClient();
	const mergeFilters = {
		sortBy: 'created_at',
		sortOrder: 'desc',
		perPage: 20,
		...filters,
	};
	return infiniteQueryOptions({
		queryKey: userKeys.myFeed({
			filters: filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * mergeFilters.perPage;
			let request = supabase
				.rpc('get_feed', {
					page_limit: mergeFilters.perPage,
					page_offset: from,
				});
			
			if (mergeFilters) {
				if (mergeFilters.sortBy && mergeFilters.sortOrder) {
					switch (mergeFilters.sortBy) {
						case 'created_at':
							request = request.order('created_at', { ascending: mergeFilters.sortOrder === 'asc' });
							break;
					}
				}
			}

			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergeFilters.perPage ? pages.length + 1 : undefined;
		},
	})
};
export const useUserFeedInfiniteOptions = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		sortBy?: 'created_at';
		sortOrder?: 'asc' | 'desc';
		perPage?: number;
	}
}) => {
	const supabase = useSupabaseClient();
	const mergeFilters = {
		sortBy: 'created_at',
		sortOrder: 'desc',
		perPage: 20,
		...filters,
	};
	return infiniteQueryOptions({
		queryKey: userKeys.feed({
			userId: userId!,
			filters: filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) throw new Error('User ID is required');
			let from = (pageParam - 1) * mergeFilters.perPage;
			let request = supabase
				.rpc('get_feed', {
					page_limit: mergeFilters.perPage,
					page_offset: from,
					target_user_ids: [userId],
				});
			
			if (mergeFilters) {
				if (mergeFilters.sortBy && mergeFilters.sortOrder) {
					switch (mergeFilters.sortBy) {
						case 'created_at':
							request = request.order('created_at', { ascending: mergeFilters.sortOrder === 'asc' });
							break;
					}
				}
			}

			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergeFilters.perPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	})
};
/* -------------------------------------------------------------------------- */

/* ------------------------------- Activities ------------------------------- */
export const useUserActivitiesMovieInfiniteOptions = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		sortBy?: 'watched_date' | 'rating';
		sortOrder?: 'asc' | 'desc';
		perPage?: number;
	}
}) => {
	const supabase = useSupabaseClient();
	const mergeFilters = {
		sortBy: 'watched_date',
		sortOrder: 'desc',
		perPage: 20,
		...filters,
	};
	return infiniteQueryOptions({
		queryKey: userKeys.movieActivities({
			userId: userId!,
			filters: filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) return null;
			
			let from = (pageParam - 1) * mergeFilters.perPage;
			let to = from + mergeFilters.perPage - 1;

			let request = supabase
				.from('user_activities_movie')
				.select('*, movie:media_movie(*)')
				.eq('user_id', userId)
				.range(from, to);
			
			if (mergeFilters) {
				if (mergeFilters.sortBy && mergeFilters.sortOrder) {
					switch (mergeFilters.sortBy) {
						case 'watched_date':
							request = request.order('watched_date', { ascending: mergeFilters.sortOrder === 'asc' });
							break;
						case 'rating':
							request = request
								.not('rating', 'is', null)
								.order('rating', { ascending: mergeFilters.sortOrder === 'asc' });
							break;
					}
				}
			}

			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergeFilters.perPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	})
};

export const useUserActivitiesTvSeriesInfiniteOptions = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		sortBy?: 'watched_date' | 'rating';
		sortOrder?: 'asc' | 'desc';
		perPage?: number;
	}
}) => {
	const supabase = useSupabaseClient();
	const mergeFilters = {
		sortBy: 'watched_date',
		sortOrder: 'desc',
		perPage: 20,
		...filters,
	};
	return infiniteQueryOptions({
		queryKey: userKeys.tvSeriesActivities({
			userId: userId!,
			filters: filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) return null;
			
			let from = (pageParam - 1) * mergeFilters.perPage;
			let to = from + mergeFilters.perPage - 1;

			let request = supabase
				.from('user_activities_tv_series')
				.select('*, tv_series:media_tv_series(*)')
				.eq('user_id', userId)
				.range(from, to);
			
			if (mergeFilters) {
				if (mergeFilters.sortBy && mergeFilters.sortOrder) {
					switch (mergeFilters.sortBy) {
						case 'watched_date':
							request = request.order('watched_date', { ascending: mergeFilters.sortOrder === 'asc' });
							break;
						case 'rating':
							request = request
								.not('rating', 'is', null)
								.order('rating', { ascending: mergeFilters.sortOrder === 'asc' });
							break;
					}
				}
			}

			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergeFilters.perPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	})
};
/* -------------------------------------------------------------------------- */

/* ------------------------------- Playlists ------------------------------- */
export const useUserPlaylistsInfiniteOptions = ({
	userId,
	filters,
} : {
	userId?: string;
	filters?: {
		sortBy?: 'updated_at';
		sortOrder?: 'asc' | 'desc';
		perPage?: number;
	}
}) => {
	const supabase = useSupabaseClient();
	const mergeFilters = {
		sortBy: 'updated_at',
		sortOrder: 'desc',
		perPage: 20,
		...filters,
	};
	return infiniteQueryOptions({
		queryKey: userKeys.playlists({
			userId: userId!,
			filters: filters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) return null;
			
			let from = (pageParam - 1) * mergeFilters.perPage;
			let to = from + mergeFilters.perPage - 1;

			let request = supabase
				.from('playlists')
				.select('*')
				.eq('user_id', userId)
				.range(from, to);
			
			if (mergeFilters) {
				if (mergeFilters.sortBy && mergeFilters.sortOrder) {
					switch (mergeFilters.sortBy) {
						case 'updated_at':
							request = request.order('updated_at', { ascending: mergeFilters.sortOrder === 'asc' });
							break;
					}
				}
			}

			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length == mergeFilters.perPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	})
};
/* -------------------------------------------------------------------------- */