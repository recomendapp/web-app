import UserCard from "@/components/User/UserCard/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedActivity } from "./FeedActivity";
import Link from "next/link";
import MoviePoster from "@/components/Movie/MoviePoster";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import MovieReviewOverview from "@/components/Review/MovieReviewOverview";
import { useFormatter } from "next-intl";

const FeedItem = ({ activity }: { activity?: any }) => {
	const format = useFormatter();

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
		{/* <Link href={`/film/${activity.movie.id}`}> */}
			<MoviePoster
			className="w-20 @md/feed-item:w-24"
			src={`https://image.tmdb.org/t/p/original/${activity.movie.poster_path}`}
			alt={activity.movie.title ?? ''}
			width={96}
			height={144}
			classNameFallback="h-full"
			// sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
			/>
		{/* </Link> */}
		<div className="flex flex-col gap-4 w-full">
			<div className="flex justify-between">
				{/* USER */}
				<div className="flex gap-2">
					<UserCard user={activity.user} icon />
					<FeedActivity activity={activity} className="text-sm @md/feed-item:text-base text-muted-foreground"/>
				</div>
				<div className='hidden @md/feed-item:block text-sm text-muted-foreground opacity-0 group-hover:opacity-100 duration-500'>
					{format.relativeTime(new Date(activity.created_at), new Date())}
				</div>
			</div>
			{activity.review ? (
				<MovieReviewOverview
				className="bg-background"
				activity={activity}
				review={activity.review}
				/>
			) : (
				<Link href={`/film/${activity.movie.id}`} className="space-y-2">
					{/* TITLE */}
					<div className="text-md @md/feed-item:text-xl space-x-1 line-clamp-2">
						<span className='font-bold'>{activity.movie.title}</span>
						{/* DATE */}
						<sup>
							<DateOnlyYearTooltip date={activity.movie.release_date ?? ''} className='text-xs @md/feed-item:text-sm font-medium'/>
						</sup>
					</div>
					{/* DESCRIPTION */}
					<p
						className={`
							text-xs @md/feed-item:text-sm line-clamp-3 text-justify
							${!activity.movie.overview.length && 'text-muted-foreground'}
						`}
					>
						{activity.movie.overview.length ? activity.movie.overview : 'Aucune description'}
					</p>
				</Link>
			)}
		</div>
	  </div>
	);
};

export default FeedItem;