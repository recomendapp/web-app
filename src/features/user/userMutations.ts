import { useSupabaseClient } from '@/context/supabase-context';
import { UserFollower } from '@/types/type.db';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from './userKeys';

/**
 * Accepts a follower request
 * @returns The mutation
 */
export const useUserAcceptFollowerRequest = ({
	userId,
} : {
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			requestId,
		} : {
			requestId: number;
		}) => {
			const { error } = await supabase
				.from('user_follower')
				.update({
					is_pending: false,
				})
				.eq('id', requestId)
			if (error) throw error;
			return requestId;
		},
		onSuccess: (requestId) => {
			// Delete the request from the cache
			queryClient.setQueryData(userKeys.followersRequests(userId as string), (oldData: UserFollower[] | undefined) => {
				if (!oldData) return [];
				return oldData.filter((request) => request.id !== requestId);
			});
		},
	});
}

/**
 * Declines a follower request
 * @returns The mutation
 */
export const useUserDeclineFollowerRequest = ({
	userId,
} : {
	userId?: string;
}) => {
	const supabase = useSupabaseClient();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			requestId,
		} : {
			requestId: number;
		}) => {
			const { error } = await supabase
				.from('user_follower')
				.delete()
				.eq('id', requestId)
			if (error) throw error;
			return requestId;
		},
		onSuccess: (requestId) => {
			// Delete the request from the cache
			queryClient.setQueryData(userKeys.followersRequests(userId as string), (oldData: UserFollower[] | undefined) => {
				if (!oldData) return [];
				return oldData.filter((request) => request.id !== requestId);
			});
		},
	});
}