import * as React from "react"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n/routing";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { useFormatter, useTranslations } from "next-intl";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import { UserAvatar } from "@/components/User/UserAvatar";
import { ContextMenuMedia } from "@/components/ContextMenu/ContextMenuMedia";
import { UserFeedCastCrew } from "@/types/type.db";
import { upperFirst } from "lodash";

interface FeedCastCrewItemProps
	extends React.ComponentProps<typeof Card> {
		activity: UserFeedCastCrew;
	}

const FeedCastCrewItemDefault = React.forwardRef<
	HTMLDivElement,
	FeedCastCrewItemProps
>(({ className, activity, ...props }, ref) => {
	const format = useFormatter();
	const t = useTranslations();
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
			href={activity?.media?.url ?? ''}
			className="w-20 @md/feed-item:w-24 relative h-full shrink-0 rounded-md overflow-hidden aspect-[2/3]"
			>
				<ImageWithFallback
					src={activity?.media?.avatar_url ??''}
					alt={activity?.media?.title ?? ''}
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
						<Link href={activity?.person?.url ?? ''} className="shrink-0">
							{activity?.person?.title ? <UserAvatar className="w-8 h-8 rounded-md" avatarUrl={activity?.person?.avatar_url ?? ''} username={activity?.person?.title} /> : null}
						</Link>
						<p className="text-muted-foreground line-clamp-2">
							{t.rich('pages.feed.cast_and_crew.new_activity', {
								name: activity?.person?.title!,
								roles: activity?.jobs?.length ? activity.jobs.join(', ').toLowerCase() : t('common.messages.unknown'),
								film: activity?.media?.title!,
								linkPerson: (chunk) => <Link href={activity?.person?.url ?? ''} className="text-foreground hover:underline underline-offset-2 hover:text-accent-pink">{chunk}</Link>,
								linkFilm: (chunk) => <Link href={activity?.media?.url ?? ''} className="text-foreground hover:underline underline-offset-2 hover:text-accent-pink">{chunk}</Link>,
								important: (chunk) => <span className="text-foreground">{chunk}</span>
							})}
						</p>
					</div>
					{activity?.media?.date ? <div className='hidden @md/feed-item:block text-sm text-muted-foreground'>
						{format.relativeTime(new Date(activity?.media.date ?? ''), new Date())}
					</div> : null}
				</div>
				{activity.media && <Link href={activity?.media?.url ?? ''} className="space-y-2">
					<div className="text-md @md/feed-item:text-xl space-x-1 line-clamp-2">
						<span className='font-bold'>{activity?.media?.title}</span>
						<sup>
							<DateOnlyYearTooltip date={activity?.media?.date ?? ''} className='text-xs @md/feed-item:text-sm font-medium'/>
						</sup>
					</div>
					<p
						className={`
							text-xs @md/feed-item:text-sm line-clamp-3 text-justify
							${"overview" in activity.media.extra_data && activity.media?.extra_data.overview?.length ? '' : 'text-muted-foreground'}
						`}
					>
						{"overview" in activity.media.extra_data && activity.media?.extra_data.overview?.length ? activity.media.extra_data.overview : upperFirst(t('common.messages.no_overview'))}
					</p>
				</Link>}
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
		<ContextMenuMedia media={activity?.media!}>
			<FeedCastCrewItemDefault ref={ref} className={className} activity={activity} {...props} />
		</ContextMenuMedia>
	)
});
FeedCastCrewItem.displayName = "FeedCastCrewItem";

export {
	type FeedCastCrewItemProps,
	FeedCastCrewItem,
	FeedCastCrewItemDefault
}