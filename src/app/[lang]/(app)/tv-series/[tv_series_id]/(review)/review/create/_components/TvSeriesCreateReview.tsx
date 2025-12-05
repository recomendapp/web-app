'use client';

import { Button } from '@/components/ui/button';
import { MediaPerson, MediaTvSeries } from '@recomendapp/types';
import { useAuth } from '@/context/auth-context';
import { Link, useRouter } from "@/lib/i18n/navigation";
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { useUserActivityTvSeriesQuery } from '@/features/client/user/userQueries';
import { useUserReviewTvSeriesUpsertMutation } from '@/features/client/user/userMutations';
import ReviewForm from '@/components/Review/ReviewForm';
import ButtonUserActivityTvSeriesRating from '@/components/buttons/ButtonUserActivityTvSeriesRating';
import { useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/features/client/user/userKeys';

export const TvSeriesCreateReview = ({
	tvSeries,
	slug,
}: {
	tvSeries: MediaTvSeries;
	slug: string;
}) => {
	const { session } = useAuth();
	const router = useRouter();
	const queryClient = useQueryClient();

	const {
		data: activity,
	} = useUserActivityTvSeriesQuery({
		tvSeriesId: tvSeries.id,
		userId: session?.user.id,
	});
	const upsertReview = useUserReviewTvSeriesUpsertMutation({
		userId: session?.user.id,
		tvSeriesId: tvSeries.id,
	});

	const handleSubmit = async (data: { title?: string; body: string }) => {
		if (!activity) return;
		await upsertReview.mutateAsync({
			activityId: activity.id,
			...data
		}, {
			onSuccess: (review) => {
				queryClient.invalidateQueries({
					queryKey: userKeys.review({
						id: activity.id,
						type: 'tv_series',
					})
				});
				router.replace(`/tv-series/${slug}/review/${review.id}`);
			},
			onError: (error) => {
				throw error;
			}
		});
	};

	return (
	<div className="@container/review">
		<div className="flex flex-col @3xl/review:flex-row gap-4 p-2">
			{/* MEDIA */}
			<Link className='shrink-0' href={tvSeries.url ?? ''}>
			<Card
			className={`
				flex items-center rounded-xl bg-muted hover:bg-muted-hover p-1 h-20
				@3xl/review:flex-col @3xl/review:items-start @3xl/review:h-fit
			`}
			>
				<div
				className={'relative h-full shrink-0 rounded-md overflow-hidden @3xl/review:w-56 aspect-[2/3]'}
				>
				<ImageWithFallback
				src={tvSeries.poster_url ?? ''}
				alt={tvSeries.name ?? ''}
				fill
				className="object-cover"
				type="tv_series"
				sizes={`
				(max-width: 640px) 96px,
				(max-width: 1024px) 120px,
				150px
				`}
				/>
				</div>
				<div className='px-2 py-1 space-y-1'>
				<h3 className='text-xl font-semibold line-clamp-2 break-words'>{tvSeries?.name}</h3>
				{tvSeries.created_by ? <Credits credits={tvSeries.created_by ?? []} /> : null}
				</div>
			</Card>
			</Link>
			<ReviewForm
			rating={activity?.rating || undefined}
			mediaAction={<ButtonUserActivityTvSeriesRating tvSeriesId={tvSeries.id} />}
			onCreate={handleSubmit}
			/>
		</div>
	</div>
  );
}

const Credits = ({
  credits,
  className,
}: {
  credits: MediaPerson[];
  className?: string;
}) => {
  if (!credits || credits.length === 0) return null;
  return (
    <p className={cn('line-clamp-2', className)}>
      {credits?.map((credit, index: number) => (
        <span key={index}>
          <Button
            variant={'link'}
            className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-yellow transition"
            asChild
          >
            <Link href={credit.url ?? ''}>
              {credit.name}
            </Link>
          </Button>
          {index !== credits.length - 1 && (
            <span className='text-muted-foreground'>, </span>
          )}
        </span>
      ))}
    </p>
  )
};
