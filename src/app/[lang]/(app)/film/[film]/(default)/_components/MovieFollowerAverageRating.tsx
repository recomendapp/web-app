import ActivityIcon from '@/components/Review/ActivityIcon';
import { useAuth } from '@/context/auth-context';
import { supabase } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export function MovieFollowerAverageRating({
	movieId,
	className,
} : {
	movieId: number;
	className?: string;
}) {
	const { user } = useAuth();
	
	const {
		data: averageRating,
	} = useQuery({
		queryKey: ['movie', movieId, 'followerAverageRating'],
		queryFn: async () => {
			if (!user || !movieId) throw new Error('Invalid movieId or user');
			const { data, error} = await supabase
				.rpc('user_movie_follower_average_rating', {
					userid: user.id,
					movieid: movieId,
				});
			if (error) throw error;
			return data;
		},
		enabled: !!movieId && !!user,
	});

	if (!averageRating) return null;

	return (
		<ActivityIcon
			movieId={movieId}
			rating={averageRating}
			variant="follower"
			className={cn("", className)}
			tooltip='Note followers'
		/>
	)
}