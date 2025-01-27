'use client';
import { UserReview } from "@/types/type.db";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getMediaDetails } from "@/hooks/get-media-details";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import ReviewForm from "@/components/review/ReviewForm";
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
	const media = getMediaDetails(review?.media);

	if (!review) return null;
	
	return (
	<div className="@container/review">
		<div className="flex flex-col @3xl/review:flex-row gap-4 p-2">
			{/* MEDIA */}
			<Link href={media.url ?? ''} className="shrink-0">
				<Card
				className={`
					flex items-center rounded-xl bg-muted hover:bg-muted-hover p-1 h-20
					@3xl/review:flex-col @3xl/review:items-start @3xl/review:h-fit
				`}
				>
					<div
					className={cn('relative h-full shrink-0 rounded-md overflow-hidden @3xl/review:w-56', media.poster_className)}
					>
						<ImageWithFallback
						src={media?.poster_path ? `https://image.tmdb.org/t/p/original/${media.poster_path}` : ''}
						alt={media?.title ?? ''}
						fill
						className="object-cover"
						type="playlist"
						sizes={`
						(max-width: 640px) 96px,
						(max-width: 1024px) 120px,
						150px
						`}
						/>
					</div>
					<div className='px-2 py-1 space-y-1'>
						<h3 className='text-xl font-semibold line-clamp-2 break-words'>{media?.title}</h3>
						{media.mainCredits ? <Credits credits={media.mainCredits ?? []} /> : null}
					</div>
				</Card>
			</Link>
			<ReviewForm review={review} mediaId={review.media_id!} mediaType={review.media_type!} />
		</div>
	</div>
	)
}

const Credits = ({
	credits,
	className,
  }: {
	credits: any[];
	className?: string;
  }) => {
	if (!credits || credits.length === 0) return null;
	return (
	  <p className={cn('line-clamp-1', className)}>
		{credits?.map((credit: any, index: number) => (
		  <span key={credit.id}>
			<Button
			  variant={'link'}
			  className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition"
			  asChild
			>
			  <Link href={`/person/${credit.id}`}>
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