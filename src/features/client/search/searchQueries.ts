import { useInfiniteQuery } from "@tanstack/react-query";
import { searchKeys } from "./searchKeys";
import { useSupabaseClient } from "@/context/supabase-context";

export const useSearchPlaylistsInfinite = ({
	query,
	filters,
}: {
	query?: string;
	filters?: any;
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: searchKeys.playlists({
			query: query as string,
			filters: mergedFilters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			const from = (pageParam - 1) * mergedFilters.resultsPerPage;
			const to = from - 1 + mergedFilters.resultsPerPage;

			let request = supabase
				.from("playlists")
				.select("*, user(*)")
				.ilike("title", `${query}%`)
				.range(from, to)
				.order("updated_at", { ascending: false });
			const { data } = await request;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length === mergedFilters.resultsPerPage
				? pages.length + 1
				: undefined;
		},
		enabled: !!query,
	});
};

export const useSearchUsersInfinite = ({
	query,
	filters,
}: {
	query?: string;
	filters?: any;
}) => {
	const mergedFilters = {
		resultsPerPage: 20,
		...filters,
	};
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: searchKeys.users({
			query: query as string,
			filters: mergedFilters,
		}),
		queryFn: async ({ pageParam = 1 }) => {
			if (!query) return null;
			let from = (pageParam - 1) * mergedFilters.resultsPerPage;
			let to = from - 1 + mergedFilters.resultsPerPage;

			const { data } = await supabase
				.from("user")
				.select("*")
				.range(from, to)
				.ilike("username", `${query}%`);
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length === mergedFilters.resultsPerPage
				? pages.length + 1
				: undefined;
		},
		enabled: !!query,
	});
};