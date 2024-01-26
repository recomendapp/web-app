'use client';

import { useLocale } from "next-intl";

// COMPONENTS
import MovieCard from "@/components/Movie/Card/MovieCard";

// GRAPHQL
import { useQuery } from "@apollo/client"
import { GetUserMovieReviewQuery } from "@/graphql/__generated__/graphql"
import MovieReviewForm from "@/components/Review/form/MovieReviewForm";
import GetUserMovieReview from "@/graphql/User/Movie/Review/queries/GetUserMovieReview";

export default function Review({
	reviewId,
} : {
	reviewId: string,
}) {
	
	const locale = useLocale();

	const { data: reviewQuery } = useQuery<GetUserMovieReviewQuery>(GetUserMovieReview, {
		variables: {
			filter: {
				id: { eq: reviewId },
			},
			locale: locale,
		},
		skip: !reviewId || !locale
	});
	const review = reviewQuery?.user_movie_reviewCollection?.edges[0].node;

	if (!review) return null;
	
	return (
		<div className="flex flex-col lg:flex-row gap-4 p-4">
			<div className="bg-muted h-fit lg:w-[500px] p-4 rounded-md">
				{review?.activity.movie && <MovieCard movie={review.activity?.movie} />}
			</div>
	    	<div className="w-full bg-muted h-fit p-4 rounded-md">
				<MovieReviewForm review={review} />
			</div>
		</div>
	)
}