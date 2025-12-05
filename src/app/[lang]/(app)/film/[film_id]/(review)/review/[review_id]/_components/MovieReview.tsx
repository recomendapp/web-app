'use client';
import { MediaPerson, UserReviewMovie } from "@recomendapp/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n/navigation";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import ReviewForm from "@/components/Review/ReviewForm";
import { useUserReviewMovieQuery } from "@/features/client/user/userQueries";
import ButtonUserActivityMovieRating from "@/components/buttons/ButtonUserActivityMovieRating";
import { useUserReviewMovieUpsertMutation } from "@/features/client/user/userMutations";
import { useAuth } from "@/context/auth-context";
import ButtonUserReviewMovieLike from "@/components/buttons/ButtonUserReviewMovieLike";
import { ReviewMovieSettings } from "@/components/Review/ReviewMovieSettings";

export const MovieReview = ({
	reviewServer,
} : {
	reviewServer: UserReviewMovie;
}) => {
	const { session } = useAuth();
	const {
		data: review
	} = useUserReviewMovieQuery({
		reviewId: reviewServer.id,
		initialData: reviewServer,
	});
	const upsertReview = useUserReviewMovieUpsertMutation({
		userId: session?.user.id,
		movieId: review?.activity?.movie_id!,
	});

	const handleSubmit = async (data: { title?: string; body: string }) => {
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
			<Link href={review?.activity?.movie?.url ?? ''} className="shrink-0">
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
						src={review?.activity?.movie?.poster_url ?? ''}
						alt={review?.activity?.movie?.title ?? ''}
						fill
						className="object-cover"
						type={'movie'}
						sizes={`
						(max-width: 640px) 96px,
						(max-width: 1024px) 120px,
						150px
						`}
						/>
					</div>
					<div className='px-2 py-1 space-y-1'>
						<h3 className='text-xl font-semibold line-clamp-2 break-words'>{review?.activity?.movie?.title}</h3>
						{review?.activity?.movie?.directors ? <Credits credits={review?.activity?.movie.directors ?? []} /> : null}
					</div>
				</Card>
			</Link>
			<ReviewForm
			mediaAction={<ButtonUserActivityMovieRating movieId={review?.activity?.movie_id!} />}
			reviewActions={<ButtonUserReviewMovieLike reviewId={review?.id} reviewLikesCount={review.likes_count} />}
			review={review}
			rating={review.activity?.rating || undefined}
			author={review.activity?.user}
			onUpdate={handleSubmit}
			reviewSettings={(review.activity && review.activity.user && review.activity.movie) ? (
				<ReviewMovieSettings
				movieId={review.activity?.movie_id}
				movie={review?.activity?.movie}
				review={review}
				author={review.activity?.user}
				/>
			) : null}
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
}
  