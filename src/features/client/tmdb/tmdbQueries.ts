import { useInfiniteQuery } from "@tanstack/react-query";
import { tmdbKeys } from "./tmdbKeys";
import { tmdbSearchMovies } from "@/lib/tmdb/queries/tmdbSearchMovies";
import { tmdbSearchMulti } from "@/lib/tmdb/queries/tmdbSearchMulti";
import { tmdbSearchSeries } from "@/lib/tmdb/queries/tmdbSearchSeries";
import { tmdbSearchPersons } from "@/lib/tmdb/queries/tmdbSearchPersons";

export const useTmdbSearchMultiInfinite = ({
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
		queryKey: tmdbKeys.searchMulti(query as string, mergedFilters),
		queryFn: async ({ pageParam = 1 }) => {
			if (!query) throw Error('You must provide a query');
			if (!locale) throw Error('You must provide a locale');
			const data = await tmdbSearchMulti(query, locale, pageParam);
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.total_results === mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
		throwOnError: true,
		enabled: !!query && !!locale,
	});
}

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
			const data = await tmdbSearchMovies(query, locale, pageParam);
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

export const useTmdbSearchSeriesInfinite = ({
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
		queryKey: tmdbKeys.searchSeries(query as string, mergedFilters),
		queryFn: async ({ pageParam = 1 }) => {
			if (!query) throw Error('You must provide a query');
			if (!locale) throw Error('You must provide a locale');
			const data = await tmdbSearchSeries(query, locale, pageParam);
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

export const useTmdbSearchPersonsInfinite = ({
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
		queryKey: tmdbKeys.searchPersons(query as string, mergedFilters),
		queryFn: async ({ pageParam = 1 }) => {
			if (!query) throw Error('You must provide a query');
			if (!locale) throw Error('You must provide a locale');
			const data = await tmdbSearchPersons(query, locale, pageParam);
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