import { useAuth } from "@/context/auth-context";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSupabaseClient } from '@/context/supabase-context';

export default function MovieReviewComments({
	reviewId,
}: {
	reviewId: number;
}) {
	const supabase = useSupabaseClient();
	const { user } = useAuth();
	const { ref, inView } = useInView();

	const numberOfResult = 8;

	const {
		data: comments,
		isLoading: loading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['user_movie_review', reviewId, 'comments'],
		queryFn: async ({ pageParam = 1 }) => {
		if (!reviewId) return null;
		let from = (pageParam - 1) * numberOfResult;
		let to = from - 1 + numberOfResult;

		const { data } = await supabase
			.from('user_movie_review_comment')
			.select('*')
			.eq('review_id', reviewId)
			.is('parent_comment_id', null)
			.order('likes_count', { ascending: false})
			.range(from, to)
			return (data);
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!reviewId
	});

	useEffect(() => {
		if (inView && hasNextPage) {
		  fetchNextPage();
		}
	}, [inView, hasNextPage, comments, fetchNextPage]);

	return (
		<div className="space-y-2">
			Comments
			{/* INPUT */}
			{user &&
				<div>
					ajouter un commentaire
				</div>
			}
			{/* COMMENTS */}
			<div>
				{(!loading && !comments?.pages[0]?.length) ? (
					<div>Aucun commentaires.</div>
				) : (
					<div>

					</div>
				)}
			</div>
		</div>
	);
}