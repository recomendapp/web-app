import * as React from "react"
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserMovieActivity } from "@/types/type.db";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import Link from "next/link";
import { DateOnlyYearTooltip } from "../utils/Date";
import UserCard from "../User/UserCard/UserCard";
import { UserAvatar } from "../User/UserAvatar/UserAvatar";
import { FeedActivity } from "@/app/[lang]/(app)/(privateroutes)/feed/_components/FeedActivity";
import { useFormatter } from "next-intl";

interface CardUserMovieActivityProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default";
		activity: UserMovieActivity;
	}

const CardUserMovieActivityDefault = React.forwardRef<
	HTMLDivElement,
	Omit<CardUserMovieActivityProps, "variant">
>(({ className, activity, children, ...props }, ref) => {
	const format = useFormatter();
	return (
		<Card
			ref={ref}
			className={cn(
				"group flex rounded-xl bg-muted hover:bg-muted-hover p-1 gap-2",
				className
			)}
			{...props}
		>
			<div className='w-20 relative h-full shrink-0 rounded-md overflow-hidden' style={{ aspectRatio: '2 / 3' }}>
				<ImageWithFallback
					src={activity?.movie?.poster_path ? `https://image.tmdb.org/t/p/original/${activity.movie.poster_path}` : ''}
					alt={activity?.movie?.title ?? ''}
					fill
					className="object-cover"
					type="movie"
					sizes={`
					(max-width: 640px) 96px,
					(max-width: 1024px) 120px,
					150px
					`}
				/>
			</div>
			<div className='flex flex-col gap-2 p-2 w-full'>
				<div className="flex justify-between">
					<div className="flex items-center gap-2">
						<UserAvatar avatar_url={activity?.user?.avatar_url} username={activity?.user?.username} className="w-6 h-6" />
						<FeedActivity activity={activity} className="text-sm @md/feed-item:text-base text-muted-foreground"/>
					</div>
					<div className='text-sm text-muted-foreground opacity-0 group-hover:opacity-100 duration-500'>
						{format.relativeTime(new Date(activity?.date ?? ''), new Date())}
					</div>
				</div>
				<Link href={`/film/${activity?.movie?.slug ?? activity?.movie_id}`} className="space-y-2">
					{/* TITLE */}
					<div className="text-md @md/feed-item:text-xl space-x-1 line-clamp-2">
						<span className='font-bold'>{activity?.movie?.title}</span>
						{/* DATE */}
						<sup>
							<DateOnlyYearTooltip date={activity?.movie?.release_date ?? ''} className='text-xs @md/feed-item:text-sm font-medium'/>
						</sup>
					</div>
					{/* DESCRIPTION */}
					<p
					className={`
						text-xs line-clamp-2 text-justify
						${(!activity?.movie?.overview || !activity?.movie?.overview.length) && 'text-muted-foreground'}
					`}
					>
						{(activity?.movie?.overview && activity?.movie?.overview.length) ? activity?.movie?.overview : 'Aucune description'}
					</p>
				</Link>
			</div>
		</Card>
	);
});
CardUserMovieActivityDefault.displayName = "CardUserMovieActivityDefault";

const CardUserMovieActivity = React.forwardRef<
	HTMLDivElement,
	CardUserMovieActivityProps
>(({ className, activity, variant = "default", ...props }, ref) => {
	return (
		<>
			{variant === "default" ? (
				<CardUserMovieActivityDefault ref={ref} className={className} activity={activity} {...props} />
			) : null}
		</>
		// <Link href={`/film/${activity?.movie?.slug ?? activity?.movie_id}`}>
		// </Link>
	)
});
CardUserMovieActivity.displayName = "CardUserMovieActivity";

export {
	type CardUserMovieActivityProps,
	CardUserMovieActivity,
	CardUserMovieActivityDefault,
}