import * as React from "react"
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { User, UserActivityTvSeries, UserReviewTvSeries,  } from "@/types/type.db";
import { WithLink } from "../utils/WithLink";
import { CardUser } from "./CardUser";
import { useFormatter, useNow } from "next-intl";
import { JSONContent } from "@tiptap/react";
import { IconMediaRating } from "@/components/Media/icons/IconMediaRating";
import ButtonUserReviewTvSeriesLike from "../buttons/ButtonUserReviewTvSeriesLike";

interface CardReviewTvSeriesProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default";
		review: UserReviewTvSeries;
		activity: UserActivityTvSeries;
		author: User;
		linked?: boolean;
		url: string;
	}

const CardReviewTvSeriesDefault = React.forwardRef<
	HTMLDivElement,
	Omit<CardReviewTvSeriesProps, "variant" | "url">
>(({ className, review, activity, author, linked, children, ...props }, ref) => {
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
				rating={activity?.rating}
				className="h-fit"
				/>
				<div className="bg-muted-hover h-full w-0.5 rounded-full"></div>
			</div>
			<div className="w-full flex flex-col gap-1">
				<div className="w-full flex justify-between items-center gap-2">
					<CardUser variant="inline" user={author} />
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
					<ButtonUserReviewTvSeriesLike reviewId={review?.id} reviewLikesCount={review.likes_count} />
				</div>
			</div>
		</Card>
	);
});
CardReviewTvSeriesDefault.displayName = "CardReviewTvSeriesDefault";


const CardReviewTvSeries = React.forwardRef<
	HTMLDivElement,
	CardReviewTvSeriesProps
>(({ className, review, linked = true, variant = "default", url, ...props }, ref) => {
	return (
	<WithLink href={linked ? url : undefined} withOnClick>
		{variant === "default" ? (
			<CardReviewTvSeriesDefault ref={ref} className={className} review={review} linked={linked} {...props} />
		) : null}
	</WithLink>
	);
});
CardReviewTvSeries.displayName = "CardReviewTvSeries";

export {
	type CardReviewTvSeriesProps,
	CardReviewTvSeries,
	CardReviewTvSeriesDefault,
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
