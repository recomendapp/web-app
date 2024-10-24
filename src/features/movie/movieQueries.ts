import { useSupabaseClient } from "@/context/supabase-context"
import { movieKeys } from "./movieKeys";
import { useQuery } from "@tanstack/react-query";


/**
 * Fetches the most recommended movies (10 by default)
 * @param filters - Filters to apply to the query
 * @returns Query result
 */
export const useMovieMostRecommended = ({
	filters,
} : {
	filters?: {
		order?: 'asc' | 'desc';
		limit?: number;
	}
} = {}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: movieKeys.mostRecommended({ filters }),
		queryFn: async () => {
			let query = supabase
				.from('movies_recommended')
				.select('*,movie(*)')
				.limit(10);
			
			if (filters) {
				if (filters.order) {
					query = query.order('recommendation_count', { ascending: filters.order === 'asc' });
				}
				if (filters.limit) {
					query = query.limit(filters.limit);
				}
			}
			const { data, error } = await query;
			if (error) throw error;
			return data;
		},
	});
};