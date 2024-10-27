import { useInfiniteQuery } from "@tanstack/react-query";
import { tmdbKeys } from "./tmdbKeys";
import { tmdbSearchMovies } from "@/lib/tmdb/queries/tmdbSearchMovies";

export const useTmdbSearchMoviesInfinite = ({
	query,
	locale,
	filters,
} : {
	query?: string | null;
	locale?: string;
	filters?: {
		resultsPerPage?: number;
	}
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		...filters,
	};
	return useInfiniteQuery({
		queryKey: tmdbKeys.searchMovies(query as string, mergedFilters),
		queryFn: async ({ pageParam = 1 }) => {
			if (!query) throw Error('You must provide a query');
			if (!locale) throw Error('You must provide a locale');
			const { data, error } = await tmdbSearchMovies(query, locale, pageParam);
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length === mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
		throwOnError: true,
		enabled: !!query && !!locale,
	});
}