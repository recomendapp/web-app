'use client'

import { MediaMovie } from '@recomendapp/types';
import { useAuth } from '@/context/auth-context';
import { useRouter } from "@/lib/i18n/navigation";
import { useUserActivityMovieQuery, useUserReviewMovieQuery } from '@/features/client/user/userQueries';
import ReviewForm from '@/components/Review/ReviewForm';
import { useUserReviewMovieUpsertMutation } from '@/features/client/user/userMutations';
import { Spinner } from '@/components/ui/spinner';
import { useCallback, useEffect } from 'react';

export const MovieEditReview = ({
	reviewId,
	movie,
}: {
	movie: MediaMovie;
	reviewId: number;
}) => {
	const { session } = useAuth();
	const router = useRouter();

	const {
		data: activity,
	} = useUserActivityMovieQuery({
		movieId: movie.id,
		userId: session?.user.id,
	});
	const {
		data: review,
		isLoading,
	} = useUserReviewMovieQuery({
		reviewId: reviewId,
	});
	const { mutateAsync: upsertReview } = useUserReviewMovieUpsertMutation({
		movieId: movie.id,
	});

	const handleSubmit = useCallback(async (data: { title?: string; body: string }) => {
		if (!review) return;
		await upsertReview(data, {
			onSuccess: (review) => {
				router.push(`/film/${movie.slug || movie.id}/review/${review.id}`);
			},
			onError: (error) => {
				throw error;
			}
		});
	}, [review, upsertReview, router, movie]);

	const handleCancel = useCallback(() => {
		if (!review) return;
		router.push(`/film/${movie.slug || movie.id}/review/${review.id}`);
	}, [review, router, movie]);

	useEffect(() => {
		if (
			review
			&& session
			&& review?.activity?.user_id !== session?.user.id
		) {
			router.replace(`/film/${movie.slug || movie.id}/review/${review.id}`);
		}
	}, [review, session, router, movie]);

	if (isLoading || !review) {
		return (
			<div className='flex items-center justify-center flex-1 p-4'>
				<Spinner />
			</div>
		);
	}
	
	return (
		<div className='@container/review p-4 flex flex-col items-center'>
			<ReviewForm
			review={review}
			rating={activity?.rating || undefined}
			type='movie'
			movie={movie}
			onUpdate={handleSubmit}
			onCancel={handleCancel}
			/>
		</div>
	);
}
