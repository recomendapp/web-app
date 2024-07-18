'use client';

import { useLocale } from "next-intl";
import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

// COMPONENTS
import MovieCard from "@/components/Movie/Card/MovieCard";
import MovieReviewForm from "@/components/Review/form/MovieReviewForm";
import MovieReviewActions from "@/components/Review/actions/MovieReviewActions";
import MovieReviewComments from "./comments/MovieReviewComments";

export default function Review({
	reviewId,
} : {
	reviewId: string,
}) {
	
	const locale = useLocale();

	const {
		data: review
	} = useQuery({
		queryKey: ['user_movie_review', reviewId],
		queryFn: async () => {
			if (!reviewId) throw Error('Missing review id');
			const { data, error } = await supabase
				.from('user_movie_review')
				.select(`
					*,
					user(*),
					activity:user_movie_activity(
						*,
						user(*),
						movie:movies(*)
					)
				`)
				.eq('id', reviewId)
				.eq('activity.movie.language', locale)
				.single()
			if (error) throw error;
			return data;
		},
		enabled: !!reviewId,
	});

	if (!review) return null;
	
	return (
		<div className="flex flex-col lg:flex-row gap-4 p-4">
			<div className="bg-muted h-fit lg:w-[500px] p-4 rounded-md">
				{review?.activity?.movie && <MovieCard movie={review.activity?.movie} width={96} height={144} />}
			</div>
			<div className="w-full space-y-2">
				<div className="bg-muted h-fit p-4 rounded-md">
					<MovieReviewForm review={review} />
					<MovieReviewActions reviewId={review.id} />
				</div>
				<MovieReviewComments reviewId={review.id} />
			</div>
		</div>
	)
}