import { useSupabaseClient } from "@/context/supabase-context";
import { useQuery } from "@tanstack/react-query";
import { widgetKeys } from "./widgetKeys";

export const useWidgetMostRecommendedQuery = ({
	filters,
} : {
	filters?: {
		sortBy?: 'recommendation_count',
		sortOrder?: 'asc' | 'desc',
		limit?: number,
	}
} = {}) => {
	const mergedFilters = {
		sortBy: 'recommendation_count',
		sortOrder: 'desc',
		limit: 10,
		...filters
	} as typeof filters;
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: widgetKeys.widget({
			name: 'most-recommended',
			filters,
		}),
		queryFn: async () => {
			let request = supabase
				.rpc('get_widget_most_recommended')
				.select('*')
				.limit(10);
			
			if (mergedFilters) {
				if (mergedFilters) {
					// switch (mergedFilters.sortBy) {
					// 	case 'recommendation_count':
					// 		request = request.order('recommendation_count', { ascending: mergedFilters.sortOrder === 'asc' });
					// 		break;
					// 	default:
					// 		break;
					// }
				}
				if (mergedFilters.limit) {
					request = request.limit(mergedFilters.limit);
				}
			}
			const { data, error } = await request;
			if (error) throw error;
			return data;
		},
	});
}