import * as React from "react"
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { UserReview } from "@/types/type.db";
import { getMediaUrl } from "@/hooks/get-media-details";
import { WithLink } from "../utils/WithLink";
import { CardUser } from "./CardUser";
import { useFormatter, useNow } from "next-intl";
import { JSONContent } from "@tiptap/react";
import ActionReviewLike from "../review/actions/ActionReviewLike";
import { IconMediaRating } from "../media/icons/IconMediaRating";

interface CardReviewProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default";
		review: UserReview;
		linked?: boolean;
	}

const CardReviewDefault = React.forwardRef<
	HTMLDivElement,
	Omit<CardReviewProps, "variant">
>(({ className, review, linked, children, ...props }, ref) => {
	const now = useNow({ updateInterval: 1000 * 10 });
	const format = useFormatter();
	return (
		<Card
			ref={ref}
			className={cn(
				"@container/review flex gap-2 p-1 hover:bg-muted-hover",
				className
			)}
			{...props}
		>
			<div className="flex flex-col items-center gap-1">
				<IconMediaRating
				rating={review?.rating}
				className="h-fit"
				/>
				<div className="bg-muted-hover h-full w-0.5 rounded-full"></div>
			</div>
			<div className="w-full flex flex-col gap-1">
				<div className="w-full flex justify-between items-center gap-2">
					<CardUser variant="inline" user={review?.user} />
					<div className='text-sm text-muted-foreground'>
					{format.relativeTime(new Date(review?.created_at ?? ''), now)}
					</div>
				</div>
				{review?.title ? (
					<p className="font-semibold line-clamp-1">
						{review?.title}
					</p>
				) : null}
				<Overview data={review?.body} />
				<div className="flex items-center justify-end m-1">
					<ActionReviewLike reviewId={review?.id} reviewLikesCount={review.likes_count} />
				</div>
			</div>
		</Card>
	);
});
CardReviewDefault.displayName = "CardReviewDefault";


const CardReview = React.forwardRef<
	HTMLDivElement,
	CardReviewProps
>(({ className, review, linked = true, variant = "default", ...props }, ref) => {
	const mediaUrl = (review?.media_id && review.media_type)
		? `${getMediaUrl({ id: review.media_id, type: review.media_type, slug: review.media?.slug })}/review/${review?.id}`
		: `/review/${review?.id}`;
	return (
	// <ContextMenuReview media={media}>
		<WithLink href={linked ? mediaUrl : undefined} withOnClick>
			{variant === "default" ? (
				<CardReviewDefault ref={ref} className={className} review={review} linked={linked} {...props} />
			) : null}
		</WithLink>
	// </ContextMenuReview>
	);
});
CardReview.displayName = "CardReview";

export {
	type CardReviewProps,
	CardReview,
	CardReviewDefault,
}

export function Overview({ data }: { data: JSONContent }) {
  const text = data?.content
	?.filter((paragraph) => paragraph?.content)
	?.flatMap(
	  (paragraph) => paragraph?.content?.map((item) => item.text).join('')
	)
	.join('\n');

  return (
	<div className=" whitespace-pre-line text-justify">
	  <p className="line-clamp-3">{text}</p>
	</div>
  );
}
