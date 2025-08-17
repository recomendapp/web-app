import * as React from "react"
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { MediaMovie, MediaTvSeries, UserActivity } from "@/types/type.db";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { Link } from "@/lib/i18n/routing";
import { DateOnlyYearTooltip } from "../utils/Date";
import { UserAvatar } from "../User/UserAvatar";
import { FeedActivity } from "@/app/[lang]/(app)/(privateroutes)/feed/_components/FeedActivity";
import { useFormatter, useNow, useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { getMediaDetails } from "@/utils/get-media-details";

interface CardUserActivityProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default";
		activity: UserActivity;
	}

const CardUserActivityDefault = React.forwardRef<
	HTMLDivElement,
	Omit<CardUserActivityProps, "variant">
>(({ className, activity, children, ...props }, ref) => {
	const format = useFormatter();
	const now = useNow({ updateInterval: 1000 * 10 });
	const common = useTranslations('common');
	const details = React.useMemo(() => {
		switch (activity.type) {
			case 'movie':
				return getMediaDetails({ type: 'movie', media: activity.media as MediaMovie });
			case 'tv_series':
				return getMediaDetails({ type: 'tv_series', media: activity.media as MediaTvSeries });
			default:
				return null;
		}
	}, [activity]);
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
					src={details?.imageUrl ?? ''}
					alt={details?.title ?? ''}
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
						{activity.user?.username ? <UserAvatar avatarUrl={activity?.user?.avatar_url} username={activity?.user?.username} className="w-6 h-6" /> : null}
						<FeedActivity activity={activity} className="text-sm @md/feed-item:text-base text-muted-foreground"/>
					</div>
					<div className='text-sm text-muted-foreground opacity-0 group-hover:opacity-100 duration-500'>
						{format.relativeTime(new Date(activity?.watched_date ?? ''), now)}
					</div>
				</div>
				{activity.media && <Link href={activity.media?.url ?? ''} className="space-y-2">
					{/* TITLE */}
					<div className="text-md @md/feed-item:text-xl space-x-1 line-clamp-2">
						<span className='font-bold'>{details?.title}</span>
						{/* DATE */}
						{details?.date && <sup>
							<DateOnlyYearTooltip date={details?.date ?? ''} className='text-xs @md/feed-item:text-sm font-medium'/>
						</sup>}
					</div>
					{/* DESCRIPTION */}
					<p
					className={`
						text-xs line-clamp-2 text-justify
						${details?.description && details?.description.length ? '' : 'text-muted-foreground'}
					`}
					>
						{details?.description && details?.description.length ? details.description : upperFirst(common('messages.no_overview'))}
					</p>
				</Link>}
			</div>
		</Card>
	);
});
CardUserActivityDefault.displayName = "CardUserActivityDefault";

const CardUserActivity = React.forwardRef<
	HTMLDivElement,
	CardUserActivityProps
>(({ className, activity, variant = "default", ...props }, ref) => {
	const t = useTranslations('common');
	return (
		variant === "default" ? (
			<CardUserActivityDefault ref={ref} className={className} activity={activity} {...props} />
		) : null
	)
});
CardUserActivity.displayName = "CardUserActivity";

export {
	type CardUserActivityProps,
	CardUserActivity,
	CardUserActivityDefault,
}