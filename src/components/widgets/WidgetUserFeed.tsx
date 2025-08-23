import { useAuth } from "@/context/auth-context"
import { useUserFeedInfiniteQuery } from "@/features/client/user/userQueries";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n/routing";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { FeedItemActivityMovie } from "@/app/[lang]/(app)/(privateroutes)/feed/_components/FeedItemActivityMovie";
import { FeedItemActivityTvSeries } from "@/app/[lang]/(app)/(privateroutes)/feed/_components/FeedItemActivityTvSeries";
import { FeedItemPlaylistLike } from "@/app/[lang]/(app)/(privateroutes)/feed/_components/FeedItemPlaylistLike";
import { FeedItemReviewMovieLike } from "@/app/[lang]/(app)/(privateroutes)/feed/_components/FeedItemReviewMovieLike";
import { FeedItemRevieTvSeriesLike } from "@/app/[lang]/(app)/(privateroutes)/feed/_components/FeedItemRevieTvSeriesLike";

const WIDGET_USER_FEED_LIMIT = 4;

export const WidgetUserFeed = ({
	className,
} : React.HTMLAttributes<HTMLDivElement>) => {
	const { session } = useAuth();
	const t = useTranslations('common');
	const {
		data: feed,
		isLoading,
	} = useUserFeedInfiniteQuery({
		userId: session?.user.id,
	})
	if (!session || !feed || !feed.pages[0]?.length) return null;

	return (
		<div className={cn('@container/widget-user-feed space-y-4', className)}>
			<Button variant={'link'} className="p-0 w-fit font-semibold text-xl" asChild>
				<Link href={'/feed'}>
				{upperFirst(t('messages.latest_activity', { count: 0 }))}
				</Link>
			</Button>
			<div className="grid gap-2 grid-cols-1 @5xl/widget-user-feed:grid-cols-2">
				{feed.pages[0].slice(0, WIDGET_USER_FEED_LIMIT).map((item, index) => (
					item.activity_type === 'activity_movie' ? (
						<FeedItemActivityMovie key={index} author={item.author} activity={item.content} />
					) : item.activity_type === 'activity_tv_series' ? (
						<FeedItemActivityTvSeries key={index} author={item.author} activity={item.content} />
					) : item.activity_type === 'playlist_like' ? (
						<FeedItemPlaylistLike key={index} author={item.author} playlistLike={item.content} />
					) : item.activity_type === 'review_movie_like' ? (
						<FeedItemReviewMovieLike key={index} author={item.author} reviewLike={item.content} />
					) : item.activity_type === 'review_tv_series_like' ? (
						<FeedItemRevieTvSeriesLike key={index} author={item.author} reviewLike={item.content} />
					) : null
				))}
			</div>
		</div>
	)
}