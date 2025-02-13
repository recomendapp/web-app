"use client";

import UserCard from "@/components/User/UserCard/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedActivity } from "./FeedActivity";
import { Link } from "@/lib/i18n/routing";
import MoviePoster from "@/components/Movie/MoviePoster";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import { useFormatter } from "next-intl";
import { UserActivity } from "@/types/type.db";
import { getMediaDetails } from "@/hooks/get-media-details";
import { CardReview } from "@/components/Card/CardReview";
import { cn } from "@/lib/utils";

const FeedItem = ({ activity }: { activity?: UserActivity }) => {
	const format = useFormatter();
	// const mediaDetails = getMediaDetails(activity?.media);

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
		<MoviePoster
		className="w-20 @md/feed-item:w-24"
		src={activity.media?.avatar_url ?? ''}
		alt={activity.media?.title ?? ''}
		width={96}
		height={144}
		classNameFallback="h-full"
		/>
		<div className="flex flex-col gap-4 w-full">
			<div className="flex justify-between">
				{/* USER */}
				<div className="flex items-center gap-2">
					{activity.user ? <UserCard user={activity.user} icon /> : null}
					<FeedActivity activity={activity} className="text-sm @md/feed-item:text-base text-muted-foreground"/>
				</div>
				<div className='hidden @md/feed-item:block text-sm text-muted-foreground opacity-0 group-hover:opacity-100 duration-500'>
					{format.relativeTime(new Date(activity.watched_date), new Date())}
				</div>
			</div>
			<Link href={activity.media?.url ?? ''} className="text-md @md/feed-item:text-xl space-x-1 line-clamp-2">
				<span className='font-bold'>{activity.media?.title}</span>
				{/* DATE */}
				<sup>
					<DateOnlyYearTooltip date={activity.media?.date ?? ''} className='text-xs @md/feed-item:text-sm font-medium'/>
				</sup>
			</Link>
			{activity.review ? (
				activity.user ? <CardReview
					className="bg-background"
					review={activity.review}
					activity={activity}
					author={activity.user}
				/> : null
			) : (
				<>
				{(activity.media?.media_type === 'movie' || activity.media?.media_type === 'tv_series') ? (
					<>
					<p className={cn("text-xs @md/feed-item:text-sm line-clamp-3 text-justify", !activity.media?.extra_data.overview?.length && 'text-muted-foreground')}>
						{activity.media?.extra_data.overview?.length ? activity.media.extra_data.overview : 'Aucune description'}
					</p>
					</>
				) : null}
				</>
			)}
		</div>
	  </div>
	);
};

export default FeedItem;