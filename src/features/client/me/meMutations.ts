import { useSupabaseClient } from '@/context/supabase-context';
import { MediaType, User } from '@/types/type.db';
import { useMutation } from '@tanstack/react-query';
import { meKeys } from './meKeys';

/* -------------------------------------------------------------------------- */
/*                                     OLD                                    */
/* -------------------------------------------------------------------------- */

/**
 * Sends a movie to friends
 * @param movieId The movie id
 * @param senderId The sender id
 * @returns The mutation
 */
export const useSendMovie = ({
	movieId,
	senderId,
} : {
	movieId: number;
	senderId?: string;
}) => {
	const supabase = useSupabaseClient();
	return useMutation({
		mutationFn: async ({
			users,
			comment,
		} : {
			users: User[];
			comment: string;
		}) => {
			if (!senderId) throw Error('Vous devez être connecté pour effectuer cette action');
			if (!users || users.length === 0) throw Error('Vous devez sélectionner au moins un ami');
			const { error } = await supabase
				.rpc('user_movie_guidelist_insert', {
					movieid: movieId,
					receiver_user_ids: users.map((user) => String(user?.id)),
					sender_user_id: senderId,
					comment: comment,
				})
			if (error) throw error;
		},
		meta: {
			invalidates: [
				meKeys.sendMovie({ movieId: movieId }),
			]
		}
	});
}