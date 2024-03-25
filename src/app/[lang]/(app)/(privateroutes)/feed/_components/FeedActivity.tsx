import { useTranslations } from "next-intl";
import Link from "next/link";
import MovieHoverCard from "./MovieHoverCard";
import MovieReviewOverview from "@/components/Review/MovieReviewOverview";
import Rating from '@/components/Review/ActivityIcon';
  
export function FeedActivity({
activity,
}: {
activity: any;
}) {
	const t = useTranslations('feed');
  
	return (
	  <div className="w-full flex flex-col gap-2">
		{activity.review ? (
		  <>
			<span>
			  {t.rich('user_movie_activity.reviewed', {
				name: () => (
				  <Link href={`/@${activity.user.username}`}>
					{activity.user.username}
				  </Link>
				),
				movie: () => (
				  <MovieHoverCard movie={activity.movie} />
				),
			  })}
			</span>
			<MovieReviewOverview
			  className="bg-background"
			  activity={activity}
			  review={activity.review}
			/>
		  </>
		) : (
		  <>
			{activity.is_liked && activity.rating ? (
			  <span>
				{t.rich('user_movie_activity.rated_liked', {
				  name: () => (
					<Link href={`/@${activity.user.username}`}>
					  {activity.user.username}
					</Link>
				  ),
				  movie: () => (
					<MovieHoverCard movie={activity.movie} />
				  ),
				  rating: () => <Rating movieId={activity.movie_id} rating={activity.rating} className="inline-flex"/>,
				})}
			  </span>
			) : activity.is_liked && !activity.rating ? (
			  <span>
				{t.rich('user_movie_activity.liked', {
				  name: () => (
					<Link href={`/@${activity.user.username}`}>
					  {activity.user.username}
					</Link>
				  ),
				  movie: () => (
					<MovieHoverCard movie={activity.movie} />
				  ),
				})}
			  </span>
			) : !activity.is_liked && activity.rating ? (
			  <span>
				{t.rich('user_movie_activity.rated', {
				  name: () => (
					<Link href={`/@${activity.user.username}`}>
					  {activity.user.username}
					</Link>
				  ),
				  movie: () => (
					<MovieHoverCard movie={activity.movie} />
				  ),
				  rating: () => <Rating movieId={activity.movie_id} rating={activity.rating} className="inline-flex"/>,
				})}
			  </span>
			) : (
			  <span>
				{t.rich('user_movie_activity.watched', {
				  name: () => (
					<Link href={`/@${activity.user.username}`}>
					  {activity.user.username}
					</Link>
				  ),
				  movie: () => (
					<MovieHoverCard movie={activity.movie} />
				  ),
				})}
			  </span>
			)}
		  </>
		)}
	  </div>
	);
}