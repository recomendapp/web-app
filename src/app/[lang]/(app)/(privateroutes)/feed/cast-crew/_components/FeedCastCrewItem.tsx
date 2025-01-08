import * as React from "react"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ContextMenuMovie } from "@/components/context-menu/ContextMenuMovie";
import Link from "next/link";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { useFormatter, useTranslations } from "next-intl";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import { UserAvatar } from "@/components/User/UserAvatar/UserAvatar";
import { FeedCastCrew } from "@/types/type.db";

interface FeedCastCrewItemProps
	extends React.ComponentProps<typeof Card> {
		activity: FeedCastCrew;
	}

const FeedCastCrewItemDefault = React.forwardRef<
	HTMLDivElement,
	FeedCastCrewItemProps
>(({ className, activity, ...props }, ref) => {
	const format = useFormatter();
	const common = useTranslations('common');
	return (
		<Card
		ref={ref}
		className={cn(
			"@container/feed-item flex gap-4 p-2",
			className
		)}
		{...props}
		>
			<Link
			href={`/film/${activity?.movie?.slug ?? activity?.movie_id}`}
			className="w-20 @md/feed-item:w-24 relative h-full shrink-0 rounded-md overflow-hidden aspect-[2/3]"
			>
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
			</Link>
			<div className="flex flex-col gap-4 w-full">
				<div className="flex justify-between gap-2">
					{/* PERSON */}
					<div className="flex gap-2">
						<Link href={`/person/${activity?.person?.slug ?? activity?.person?.id}`} className="shrink-0">
							<UserAvatar className="w-8 h-8 rounded-md" avatar_url={activity?.person?.profile_path ? `https://image.tmdb.org/t/p/original/${activity?.person?.profile_path}` : ''} username={activity?.person?.name} />
						</Link>
						<p className="text-muted-foreground line-clamp-2">
							{common.rich('feed.persons.new_activity', {
								name: activity?.person?.name,
								roles: activity?.jobs?.length ? activity.jobs.join(', ').toLowerCase() : common('word.unknown'),
								film: activity?.movie?.title,
								linkPerson: (chunk) => <Link href={`/person/${activity?.person?.slug ?? activity?.person?.id}`} className="text-foreground hover:underline underline-offset-2 hover:text-accent-pink">{chunk}</Link>,
								linkFilm: (chunk) => <Link href={`/film/${activity?.movie?.slug ?? activity?.movie_id}`} className="text-foreground hover:underline underline-offset-2 hover:text-accent-pink">{chunk}</Link>,
								important: (chunk) => <span className="text-foreground">{chunk}</span>
							})}
						</p>
					</div>
					<div className='hidden @md/feed-item:block text-sm text-muted-foreground'>
						{format.relativeTime(new Date(activity?.release_date ?? ''), new Date())}
					</div>
				</div>
				<Link href={`/film/${activity?.movie?.slug ?? activity?.movie_id}`} className="space-y-2">
					<div className="text-md @md/feed-item:text-xl space-x-1 line-clamp-2">
						<span className='font-bold'>{activity?.movie?.title}</span>
						<sup>
							<DateOnlyYearTooltip date={activity?.movie?.release_date ?? ''} className='text-xs @md/feed-item:text-sm font-medium'/>
						</sup>
					</div>
					<p
						className={`
							text-xs @md/feed-item:text-sm line-clamp-3 text-justify
							${!activity?.movie?.overview?.length && 'text-muted-foreground'}
						`}
					>
						{activity?.movie?.overview?.length ? activity.movie.overview : 'Aucune description'}
					</p>
				</Link>
			</div>

		</Card>
	  );
});
FeedCastCrewItemDefault.displayName = "FeedCastCrewItem";

const FeedCastCrewItem = React.forwardRef<
	HTMLDivElement,
	FeedCastCrewItemProps
>(({ className, activity, ...props }, ref) => {
	return (
		<ContextMenuMovie movie={activity?.movie}>
			<FeedCastCrewItemDefault ref={ref} className={className} activity={activity} {...props} />
		</ContextMenuMovie>
	)
});
FeedCastCrewItem.displayName = "FeedCastCrewItem";

export {
	type FeedCastCrewItemProps,
	FeedCastCrewItem,
	FeedCastCrewItemDefault
}