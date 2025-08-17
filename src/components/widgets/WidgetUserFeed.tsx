import { useAuth } from "@/context/auth-context"
import { useUserFeedInfiniteQuery } from "@/features/client/user/userQueries";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n/routing";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { CardUserActivity } from "../Card/CardUserActivity";
import { upperFirst } from "lodash";

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
				<CardUserActivity key={index} activity={item} />
				))}
			</div>
		</div>
	)
}