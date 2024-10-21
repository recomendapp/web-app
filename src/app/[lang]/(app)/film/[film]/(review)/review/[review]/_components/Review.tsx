'use client';

import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";

// COMPONENTS
import MovieCard from "@/components/Movie/Card/MovieCard";
import MovieReviewForm from "@/components/Review/form/MovieReviewForm";
import MovieReviewActions from "@/components/Review/actions/MovieReviewActions";
import MovieReviewComments from "./comments/MovieReviewComments";
import { UserMovieReviewView } from "@/types/type.db";

export default function Review({
	reviewServer,
} : {
	reviewServer: UserMovieReviewView;
}) {
	const {
		data: review
	} = useQuery({
		queryKey: ['user_movie_review', reviewServer!.id],
		queryFn: async () => {
			return reviewServer;
		},
		enabled: !!reviewServer,
	});

	if (!review) return null;
	
	return (
		<div className="flex flex-col lg:flex-row gap-4 p-4">
			<div className="bg-muted h-fit lg:w-[500px] p-4 rounded-md">
				{review?.movie && <MovieCard movie={review?.movie} width={96} height={144} />}
			</div>
			<div className="w-full space-y-2">
				<div className="bg-muted h-fit p-4 rounded-md">
					<MovieReviewForm review={review} />
					<MovieReviewActions reviewId={review.id!} />
				</div>
				{/* <MovieReviewComments reviewId={review.id} /> */}
			</div>
		</div>
	)
}