'use client';

import { useLocale } from "next-intl";

// COMPONENTS
import MovieCard from "@/components/Movie/Card/MovieCard";

// GRAPHQL
import { useQuery } from "@apollo/client"
import { GetUserMovieActivityQuery } from "@/graphql/__generated__/graphql"
import GET_USER_MOVIE_ACTIVITY from "@/graphql/User/Movie/Activity/queries/GetUserMovieActivity"
import MovieReviewForm from "@/components/Review/form/MovieReviewForm";

export default function ProfileMovieActivity({
	movieId,
	userId
} : {
	movieId: string,
	userId: string
}) {
	
	const locale = useLocale();

	const { data: activityQuery } = useQuery<GetUserMovieActivityQuery>(GET_USER_MOVIE_ACTIVITY, {
		variables: {
			filter: {
				movie_id: { eq: movieId },
				user_id: { eq: userId },
			},
			locale: locale,
		},
		skip: !userId || !locale
	});
	const activity = activityQuery?.user_movie_activityCollection?.edges[0].node;

	return (
		<div className="flex flex-col lg:flex-row gap-4 p-4">
			<div className="bg-muted h-fit lg:w-[500px] p-4 rounded-md">
				{activity?.movie && <MovieCard movie={activity?.movie} />}
			</div>
	    	<div className="w-full bg-muted h-fit p-4 rounded-md">
				{activity?.review && <MovieReviewForm review={activity?.review} />}
			</div>
		</div>
	)
}