'use client';
import { JSONContent, MediaPerson, UserReviewMovie, UserReviewTvSeries } from "@/types/type.db";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n/routing";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import ReviewForm from "@/components/Review/ReviewForm";
import { useUserReviewTvSeriesQuery } from "@/features/client/user/userQueries";
import ButtonUserActivityMovieRating from "@/components/buttons/ButtonUserActivityMovieRating";
import { useUserReviewTvSeriesUpsertMutation } from "@/features/client/user/userMutations";
import { useAuth } from "@/context/auth-context";
import ButtonUserReviewTvSeriesLike from "@/components/buttons/ButtonUserReviewTvSeriesLike";

export const TvSeriesReview = ({
	reviewServer,
} : {
	reviewServer: UserReviewTvSeries;
}) => {
	const { session } = useAuth();
	const {
		data: review
	} = useUserReviewTvSeriesQuery({
		reviewId: reviewServer.id,
		initialData: reviewServer,
	});
	const upsertReview = useUserReviewTvSeriesUpsertMutation({
		userId: session?.user.id,
		tvSeriesId: review?.activity?.tv_series_id!,
	});

	const handleSubmit = async (data: { title?: string; body: JSONContent }) => {
		await upsertReview.mutateAsync({
			activityId: review?.id,
			...data
		}, {
			onError: (error) => {
				throw error;
			}
		});
	};

	if (!review) return null;
	
	return (
	<div className="@container/review">
		<div className="flex flex-col @3xl/review:flex-row gap-4 p-2">
			{/* MEDIA */}
			<Link href={review?.activity?.tv_series?.url ?? ''} className="shrink-0">
				<Card
				className={`
					flex items-center rounded-xl bg-muted hover:bg-muted-hover p-1 h-20
					@3xl/review:flex-col @3xl/review:items-start @3xl/review:h-fit
				`}
				>
					<div
					className={cn('relative h-full shrink-0 rounded-md overflow-hidden @3xl/review:w-56 aspect-[2/3]')}
					>
						<ImageWithFallback
						src={review?.activity?.tv_series?.avatar_url ?? ''}
						alt={review?.activity?.tv_series?.title ?? ''}
						fill
						className="object-cover"
						type={review?.activity?.tv_series?.media_type}
						sizes={`
						(max-width: 640px) 96px,
						(max-width: 1024px) 120px,
						150px
						`}
						/>
					</div>
					<div className='px-2 py-1 space-y-1'>
						<h3 className='text-xl font-semibold line-clamp-2 break-words'>{review?.activity?.tv_series?.title}</h3>
						{review?.activity?.tv_series?.main_credit ? <Credits credits={review?.activity?.tv_series.main_credit ?? []} /> : null}
					</div>
				</Card>
			</Link>
			<ReviewForm
			mediaAction={<ButtonUserActivityMovieRating movieId={review?.activity?.tv_series_id!} />}
			reviewActions={<ButtonUserReviewTvSeriesLike reviewId={review?.id} reviewLikesCount={review.likes_count} />}
			review={review}
			rating={review?.activity?.rating || undefined}
			author={review.activity?.user}
			onUpdate={handleSubmit}
			/>
		</div>
	</div>
	)
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
				{credit.title}
			  </Link>
			</Button>
			{index !== credits.length - 1 && (
			  <span className='text-muted-foreground'>, </span>
			)}
		  </span>
		))}
	  </p>
	)
}
  