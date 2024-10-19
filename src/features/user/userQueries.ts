import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { userKeys } from "./userKeys"
// import { supabase } from "@/lib/supabase/client";
import { useSupabaseClient } from "@/lib/supabase/hook";

/**
 * Fetches the user details
 * @param userId The user id
 * @returns The user details
*/
export const useUserDetails = ({
	userId,
} : {
	userId: string | undefined
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.detail(userId as string),
		queryFn: async () => {
			if (!userId) return null;
			const { data, error } = await supabase
				.from('user')
				.select('*')
				.eq('id', userId)
				.single();
			if (error) throw error;
			return data;	
		},
		enabled: !!userId,
	});
};

/**
 * Fetches the user followers
 * @param userId The user id
 * @param filters The filters
 * @param numPerPage The number of items per page
 * @returns The user followers
*/
export const useInfiniteUserFollowers = ({
	userId,
	filters,
	numPerPage = 20,
} : {
	userId: string | undefined;
	filters?: {
		search?: string | null;
	};
	numPerPage?: number;
}) => {
	const supabase = useSupabaseClient();
	console.log('supabase useInfiniteUserFollowers', supabase);
	return useInfiniteQuery({
		queryKey: userKeys.followers(userId as string, filters),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) throw Error('Missing user id');
			let from = (pageParam - 1) * numPerPage;
			let to = from - 1 + numPerPage;

			let query = supabase
				.from('user_follower')
				.select('id, follower:user_id!inner(*)')
				.eq('followee_id', userId)
				.eq('is_pending', false)
				.range(from, to)
			
			if (filters) {
				if (filters.search) {
					query = query
						.ilike(`follower.username`, `${filters.search}%`)
				}
			}
			const { data, error } = await query;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	});
};

/**
 * Fetches the user followees
 * @param userId The user id
 * @param filters The filters
 * @param numPerPage The number of items per page
 * @returns The user followees
*/
export const useInfiniteUserFollowees = ({
	userId,
	filters,
	numPerPage = 20,
} : {
	userId: string | undefined;
	filters?: {
		search?: string | null;
	};
	numPerPage?: number;
}) => {
	const supabase = useSupabaseClient();
	return useInfiniteQuery({
		queryKey: userKeys.followees(userId as string, filters),
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) throw Error('Missing user id');
			let from = (pageParam - 1) * numPerPage;
			let to = from - 1 + numPerPage;

			let query = supabase
				.from('user_follower')
				.select('id, followee:followee_id!inner(*)')
				.eq('user_id', userId)
				.eq('is_pending', false)
				.range(from, to)
			
			if (filters) {
				if (filters.search) {
					query = query
						.ilike(`followee.username`, `${filters.search}%`)
				}
			}
			const { data, error } = await query;
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numPerPage ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	});
};

export const useUserGuidelist = ({
	userId,
	locale,
} : {
	userId: string | undefined;
	locale: string;
}) => {
	const supabase = useSupabaseClient();
	return useQuery({
		queryKey: userKeys.guidelist(userId as string),
		queryFn: async () => {
			if (!userId) throw Error('Missing user id');
			if (!locale) throw Error('Missing locale');
			const { data, error } = await supabase
				.from('guidelist')
				.select('*, movie(*)')
				.eq('status', 'active')
				.eq('movie.language', locale)
			if (error) throw error;
			return data;
		},
		enabled: !!userId && !!locale,
	});
}
