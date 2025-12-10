'use client'

import { MediaTvSeries } from '@recomendapp/types';
import { useAuth } from '@/context/auth-context';
import { useRouter } from "@/lib/i18n/navigation";
import { useUserActivityTvSeriesQuery } from '@/features/client/user/userQueries';
import { useUserReviewTvSeriesUpsertMutation } from '@/features/client/user/userMutations';
import ReviewForm from '@/components/Review/ReviewForm';
import { useCallback, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';

export const TvSeriesCreateReview = ({
	tvSeries,
	slug,
}: {
	tvSeries: MediaTvSeries;
	slug: string;
}) => {
	const { session } = useAuth();
	const router = useRouter();

	const {
		data: activity,
		isLoading,
	} = useUserActivityTvSeriesQuery({
		tvSeriesId: tvSeries.id,
		userId: session?.user.id,
	});
	const upsertReview = useUserReviewTvSeriesUpsertMutation({
		tvSeriesId: tvSeries.id,
	});

	const handleSubmit = useCallback(async (data: { title?: string; body: string }) => {
		if (!activity) return;
		await upsertReview.mutateAsync(data, {
			onSuccess: (review) => {
				router.replace(`/tv-series/${slug}/review/${review.id}`);
			},
			onError: (error) => {
				throw error;
			}
		});
	}, [activity, upsertReview, router, slug]);
	
	useEffect(() => {
		if (activity?.review) {
			router.replace(`/tv-series/${slug}/review/${activity.review.id}`);
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
			type='tv_series'
			tvSeries={tvSeries}
			onCreate={handleSubmit}
			/>
		</div>
	);
}