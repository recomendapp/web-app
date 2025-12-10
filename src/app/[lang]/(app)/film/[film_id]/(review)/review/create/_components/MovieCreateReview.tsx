'use client'

import { MediaMovie } from '@recomendapp/types';
import { useAuth } from '@/context/auth-context';
import { useRouter } from "@/lib/i18n/navigation";
import { useUserActivityMovieQuery } from '@/features/client/user/userQueries';
import ReviewForm from '@/components/Review/ReviewForm';
import { useUserReviewMovieUpsertMutation } from '@/features/client/user/userMutations';
import { userKeys } from '@/features/client/user/userKeys';
import { Spinner } from '@/components/ui/spinner';
import { useCallback, useEffect } from 'react';

export const MovieCreateReview = ({
	movie,
	slug,
}: {
	movie: MediaMovie;
	slug: string;
}) => {
	const { session } = useAuth();
	const router = useRouter();

	const {
		data: activity,
		isLoading,
	} = useUserActivityMovieQuery({
		movieId: movie.id,
		userId: session?.user.id,
	});
	const { mutateAsync: upsertReview } = useUserReviewMovieUpsertMutation({
		movieId: movie.id,
	});

	const handleSubmit = useCallback(async (data: { title?: string; body: string }) => {
		if (!activity) return;
		await upsertReview(data, {
			onSuccess: (review) => {
				router.replace(`/film/${slug}/review/${review.id}`);
			},
			onError: (error) => {
				throw error;
			}
		});
	}, [activity, upsertReview, router, slug]);

	useEffect(() => {
		if (activity?.review) {
			router.replace(`/film/${slug}/review/${activity.review.id}`);
		}
	}, [activity, router, slug]);

	if (isLoading ||activity?.review) {
		return (
			<div className='flex items-center justify-center flex-1 p-4'>
				<Spinner />
			</div>
		);
	}
	
	return (
		<div className='@container/review p-4 flex flex-col items-center'>
			<ReviewForm
			rating={activity?.rating || undefined}
			type='movie'
			movie={movie}
			onCreate={handleSubmit}
			/>
		</div>
	);
}
