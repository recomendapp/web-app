import UserCard from "@/components/User/UserCard/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedActivity } from "./FeedActivity";
import MovieCard from "@/components/Movie/Card/MovieCard";
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
		className="flex items-start gap-4 bg-muted rounded-xl p-2 group"
	  >
		{/* <Link href={`/film/${activity.movie.id}`}> */}
			<MoviePoster
			className="w-[96px]"
			src={`https://image.tmdb.org/t/p/original/${activity.movie.poster_path}`}
			alt={activity.movie.title ?? ''}
			width={96}
			height={144}
			// sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
			/>
		{/* </Link> */}
		<div className="flex flex-col gap-2 w-full">
			<div className="flex justify-between">
				{/* USER */}
				<div className="flex gap-2">
					<UserCard user={activity.user} icon />
					<FeedActivity activity={activity} className="text-muted-foreground"/>
				</div>
				<div className='hidden md:block text-sm text-muted-foreground opacity-0 group-hover:opacity-100 duration-500'>
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
					<div className="text-xl space-x-1">
						<span className='font-bold '>{activity.movie.title}</span>
						{/* DATE */}
						<sup>
							<DateOnlyYearTooltip date={activity.movie.release_date ?? ''} className=' text-base font-medium'/>
						</sup>
					</div>
					{/* DESCRIPTION */}
					<p className="line-clamp-3 text-justify">{activity.movie.overview}</p>
				</Link>
			)}
		</div>
	  </div>
	);
};

export default FeedItem;