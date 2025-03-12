'use client';
import { MediaPerson, UserReview } from "@/types/type.db";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n/routing";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import ReviewForm from "@/components/Review/ReviewForm";
import { useUserReviewQuery } from "@/features/client/user/userQueries";

export default function Review({
	reviewServer,
} : {
	reviewServer: UserReview;
}) {
	const {
		data: review
	} = useUserReviewQuery({
		reviewId: reviewServer.id,
		initialData: reviewServer,
	})

	if (!review) return null;
	
	return (
	<div className="@container/review">
		<div className="flex flex-col @3xl/review:flex-row gap-4 p-2">
			{/* MEDIA */}
			<Link href={review?.activity?.media?.url ?? ''} className="shrink-0">
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
						src={review?.activity?.media?.avatar_url ?? ''}
						alt={review?.activity?.media?.title ?? ''}
						fill
						className="object-cover"
						type={review?.activity?.media?.media_type}
						sizes={`
						(max-width: 640px) 96px,
						(max-width: 1024px) 120px,
						150px
						`}
						/>
					</div>
					<div className='px-2 py-1 space-y-1'>
						<h3 className='text-xl font-semibold line-clamp-2 break-words'>{review?.activity?.media?.title}</h3>
						{review?.activity?.media?.main_credit ? <Credits credits={review?.activity?.media.main_credit ?? []} /> : null}
					</div>
				</Card>
			</Link>
			<ReviewForm
			mediaId={review?.activity?.media_id!}
			media={review?.activity?.media!}
			review={review}
			activity={review.activity} 
			author={review.activity?.user}
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
  