import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase/client";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// COMPONENTS
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
  } from '@/components/ui/tooltip';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircleIcon, HeartIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieReviewComments({
	reviewId,
}: {
	reviewId: number;
}) {
	const { user } = useAuth();
	const { ref, inView } = useInView();
	const queryClient = useQueryClient();

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