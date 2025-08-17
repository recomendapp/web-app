"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedActivity } from "./FeedActivity";
import { Link } from "@/lib/i18n/routing";
import MediaPoster from "@/components/Media/MediaPoster";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import { useFormatter, useTranslations } from "next-intl";
import { MediaMovie, MediaTvSeries, UserActivity, UserActivityMovie, UserActivityTvSeries, UserReviewMovie, UserReviewTvSeries } from "@/types/type.db";
import { cn } from "@/lib/utils";
import { result, upperFirst } from "lodash";
import { CardUser } from "@/components/Card/CardUser";
import { CardReviewTvSeries } from "@/components/Card/CardReviewTvSeries";
import { CardReviewMovie } from "@/components/Card/CardReviewMovie";
import { useMemo } from "react";
import { getMediaDetails } from "@/utils/get-media-details";

const FeedItem = ({ activity }: { activity?: UserActivity }) => {
	const format = useFormatter();
	const common = useTranslations('common');

	const details = useMemo(() => {
		switch (activity?.type) {
			case 'movie':
				return getMediaDetails({ type: 'movie', media: activity.media as MediaMovie});
			case 'tv_series':
				return getMediaDetails({ type: 'tv_series', media: activity.media as MediaTvSeries });
			default:
				return null;
		}
	}, [activity]);
	const renderReview = () => {
		if (!activity?.review) return null;
		switch (activity?.type){
			case 'movie':
				return (
					<CardReviewMovie
						className="bg-background"
						review={activity.review as UserReviewMovie}
						activity={{
							...activity,
							movie_id: activity.media_id!,
						} as UserActivityMovie}
						author={activity.user!}
						url={`${activity.media.url}/review/${activity.review.id}`}
					/>
				);
			case 'tv_series':
				return (
					<CardReviewTvSeries
					className="bg-background"
					review={activity.review as UserReviewTvSeries}
					activity={{
						...activity,
						tv_series_id: activity.media_id!,
					} as UserActivityTvSeries}
					author={activity.user!}
					url={`${activity.media.url}/review/${activity.review.id}`}
					/>
				);
		}
	};

	if (!activity) {
	  return (
		<Skeleton className="flex bg-secondary h-full rounded-xl p-2 gap-2">
		  <Skeleton className="bg-background h-[25px] w-[25px] rounded-full" />
		  <Skeleton className="bg-background h-5 w-20" />
		  <Skeleton className="bg-background h-5 w-20 rounded-full" />
		</Skeleton>
	  );
	}

	return (
	  <div
		className="@container/feed-item flex gap-4 bg-muted rounded-xl p-2 group"
	  >
		<MediaPoster
		className="w-20 @md/feed-item:w-24"
		src={details?.imageUrl ?? ''}
		alt={details?.title ?? ''}
		width={96}
		height={144}
		classNameFallback="h-full"
		/>
		<div className="flex flex-col gap-4 w-full">
			<div className="flex justify-between">
				{/* USER */}
				<div className="flex items-center gap-1">
					{activity.user ? <CardUser user={activity.user} variant="icon" /> : null}
					<FeedActivity activity={activity} className="text-sm @md/feed-item:text-base text-muted-foreground"/>
				</div>
				{activity.watched_date && <div className='hidden @md/feed-item:block text-sm text-muted-foreground opacity-0 group-hover:opacity-100 duration-500'>
					{format.relativeTime(new Date(activity.watched_date), new Date())}
				</div>}
			</div>
			<Link href={activity.media?.url ?? ''} className="text-md @md/feed-item:text-xl space-x-1 line-clamp-2">
				<span className='font-bold'>{details?.title}</span>
				{/* DATE */}
				{details?.date && <sup>
					<DateOnlyYearTooltip date={details.date} className='text-xs @md/feed-item:text-sm font-medium'/>
				</sup>}
			</Link>
			{activity.review ? renderReview() : details?.description && (
				<p className={cn("text-xs @md/feed-item:text-sm line-clamp-3 text-justify", !details.description.length && 'text-muted-foreground')}>
					{details.description.length ? details.description : upperFirst(common('messages.no_overview'))}
				</p>
			)}
		</div>
	  </div>
	);
};

export default FeedItem;