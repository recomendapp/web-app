import { useAuth } from "@/context/auth-context"
import { useUserFeedInfinite } from "@/features/user/userQueries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CardUserMovieActivity } from "@/components/card/CardUserMovieActivity";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";

export const WidgetUserFeed = ({
	className,
} : React.HTMLAttributes<HTMLDivElement>) => {
	const { user } = useAuth();
	const {
		data: feed,
		isLoading,
	} = useUserFeedInfinite({
		userId: user?.id,
	})
	if (!user || !feed || !feed.pages[0]?.length) return null;

	return (
	<div className={cn('flex flex-col gap-4 overflow-hidden', className)}>
		<Button variant={'link'} className="p-0 w-fit font-semibold text-xl" asChild>
			<Link href={'/feed'}>
				Feed
			</Link>
		</Button>
		<ScrollArea className='h-full gap-2'>
			<div className="grid gap-2 h-full">
				{feed.pages[0].map((item, index) => (
				<CardUserMovieActivity key={index} activity={item} />
				))}
				<Button variant={'muted'} asChild>
					<Link href={'/feed'}>
					Voir plus
					</Link>
				</Button>
			</div>
		</ScrollArea>	
	</div>
	)
}