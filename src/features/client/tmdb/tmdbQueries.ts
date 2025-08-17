import { useInfiniteQuery } from "@tanstack/react-query";
import { tmdbKeys } from "./tmdbKeys";
import { tmdbSearchMovies } from "@/lib/tmdb/queries/tmdbSearchMovies";
import { tmdbSearchTvSeries } from "@/lib/tmdb/queries/tmdbSearchTvSeries";
import { tmdbSearchPersons } from "@/lib/tmdb/queries/tmdbSearchPersons";
import { SupportedLocale } from "@/translations/locales";

export const useTmdbSearchMoviesInfiniteQuery = ({
	query,
	locale,
	filters,
} : {
	query?: string | null;
	locale?: SupportedLocale;
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
};

export const useTmdbSearchTvSeriesInfiniteQuery = ({
	query,
	locale,
	filters,
} : {
	query?: string | null;
	locale?: SupportedLocale;
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
			const data = await tmdbSearchTvSeries(query, locale, pageParam);
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length === mergedFilters.resultsPerPage ? pages.length + 1 : undefined;
		},
		throwOnError: true,
		enabled: !!query && !!locale,
	});
};

export const useTmdbSearchPersonsInfiniteQuery = ({
	query,
	locale,
	filters,
} : {
	query?: string | null;
	locale?: SupportedLocale;
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
};