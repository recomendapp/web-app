import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserActivity } from "@/types/type.db";
import { Icons } from "@/config/icons";
import { IconMediaRating } from "@/components/Media/icons/IconMediaRating";
  
export function FeedActivity({
activity,
className,
}: {
activity: UserActivity;
className?: string;
}) {
	const t = useTranslations('feed');
  
	return (
	  <div className={cn("space-x-2", className)}>
		{activity?.review ? (
		  <>
			<span>
			  {t.rich('user_movie_activity.reviewed', {
				name: () => (
				  <Link href={`/@${activity.user?.username}`} className="text-foreground hover:underline">
					{activity.user?.username}
				  </Link>
				),
				movie: () => (
					<></>
				//   <MovieHoverCard movie={activity.movie} />
				),
			  })}
			</span>
		  </>
		) : (
		  <>
			{activity?.is_liked && activity?.rating ? (
			  <span>
				{t.rich('user_movie_activity.rated_liked', {
				  name: () => (
					<Link href={`/@${activity.user?.username}`} className="text-foreground hover:underline">
					  {activity.user?.username}
					</Link>
				  ),
				})}
			  </span>
			) : activity?.is_liked && !activity?.rating ? (
			  <span>
				{t.rich('user_movie_activity.liked', {
				  name: () => (
					<Link href={`/@${activity.user?.username}`} className="text-foreground hover:underline">
					  {activity.user?.username}
					</Link>
				  ),
				})}
			  </span>
			) : !activity?.is_liked && activity?.rating ? (
			  <span>
				{t.rich('user_movie_activity.rated', {
				  name: () => (
					<Link href={`/@${activity.user?.username}`} className="text-foreground hover:underline">
					  {activity.user?.username}
					</Link>
				  ),
				})}
			  </span>
			) : (
			  <span>
				{t.rich('user_movie_activity.watched', {
				  name: () => (
					<Link href={`/@${activity?.user?.username}`} className="text-foreground hover:underline">
					  {activity?.user?.username}
					</Link>
				  ),
				})}
			  </span>
			)}
		  	{activity?.rating && (
				<IconMediaRating
				rating={activity.rating}
				className="inline-flex"
				/>
			)}
			{activity?.is_liked && (
				<Icons.like
					size={24}
					className="text-background fill-accent-pink inline-flex"
				/>
			)}
		  </>
		)}
	  </div>
	);
}