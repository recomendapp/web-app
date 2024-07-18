'use client';

import { useLocale } from "next-intl";

// COMPONENTS
import MovieCard from "@/components/Movie/Card/MovieCard";

import MovieReviewForm from "@/components/Review/form/MovieReviewForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { UserMovieActivity } from "@/types/type.db";

export default function ProfileMovieActivity({
	movieId,
	userId
} : {
	movieId: string,
	userId: string
}) {
	
	const locale = useLocale();

	const {
		data: activity,
	} = useQuery({
		queryKey: ['user', userId, 'activity', movieId],
		queryFn: async () => {
			if (!userId || !locale || !movieId) throw Error('Missing profile id or locale or movie id');
			const { data, error } = await supabase
				.from('user_movie_activity')
				.select(`
					*,
					user(*),
					review:user_movie_review(
						*,
						user(*)
					),
					movie:movies(*)
				`)
				.eq('user_id', userId)
				.eq('movie_id', movieId)
				.eq('movie.language', locale)
				.returns<UserMovieActivity[]>()
				.single()
			if (error) throw error;
			return data;
		},
		enabled: !!userId && !!locale,
	});

	return (
		<div className="flex flex-col lg:flex-row gap-4 p-4">
			<div className="bg-muted h-fit lg:w-[500px] p-4 rounded-md">
				{activity?.movie && <MovieCard movie={activity?.movie} width={96} height={144} />}
			</div>
	    	<div className="w-full bg-muted h-fit p-4 rounded-md">
				{activity?.review && <MovieReviewForm review={activity?.review} />}
			</div>
		</div>
	)
}