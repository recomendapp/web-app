import { useAuth } from "@/context/auth-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// COMPONENTS
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
  } from '@/components/ui/tooltip';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircleIcon, HeartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useSupabaseClient } from '@/context/supabase-context';
import { Icons } from "@/config/icons";

export default function UserMovieReviewLike({
	reviewId,
	classNames,
}: {
	reviewId: number;
	classNames?: string;
}) {
	const supabase = useSupabaseClient();
	const { user } = useAuth();
	const pathname = usePathname();
	const queryClient = useQueryClient();

	const {
		data: isLiked,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['user', user?.id, 'movie_review_like', reviewId],
		queryFn: async () => {
			if (!user?.id || !reviewId) throw Error('Missing profile id or review id');
			const { data, error } = await supabase
				.from('user_movie_review_like')
				.select(`*`)
				.eq('user_id', user.id)
				.eq('review_id', reviewId)
				.maybeSingle()
			if (error) throw error;
			return data ? true : false;
		},
		enabled: !!user?.id && !!reviewId,
	});

	const { mutateAsync: insertWatchlistMutation } = useMutation({
		mutationFn: async () => {
			if (!user?.id || !reviewId) throw Error('Missing profile id or review id');
		  const { error } = await supabase
			.from('user_movie_review_like')
			.insert({
			  user_id: user.id,
			  review_id: reviewId,
			})
		  if (error) throw error;
		  return true;
		},
		onSuccess: (data) => {
		  queryClient.setQueryData(['user', user?.id, 'movie_review_like', reviewId], data);
		},
		onError: (error) => {
		  if ('code' in error && error.code === "23505") { // Duplicate key value violates unique constraint
			queryClient.setQueryData(['user', user?.id, 'movie_review_like', reviewId], true)
		  } else {
			toast.error('Une erreur s\'est produite');
		  }
		},
	  });

	const { mutateAsync: unlikeMutation } = useMutation({
		mutationFn: async () => {
			if (!user?.id || !reviewId) throw Error('Missing profile id or review id');
			const { error } = await supabase
				.from('user_movie_review_like')
				.delete()
				.eq('user_id', user.id)
				.eq('review_id', reviewId)
			if (error) throw error;
			return false;
		},
		onSuccess: (data) => {
		  queryClient.setQueryData(['user', user?.id, 'movie_review_like', reviewId], data);
		},
		onError: () => {
		  toast.error('Une erreur s\'est produite');
		},
	  });

	if (user === null) {
		return (
		  <Tooltip>
			<TooltipTrigger asChild>
			  <Button
				size="icon"
				variant={'action'}
				className={`rounded-full`}
				asChild
			  >
				<Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
				  <HeartIcon />
				</Link>
			  </Button>
			</TooltipTrigger>
			<TooltipContent side="bottom">
			  <p>Connectez-vous</p>
			</TooltipContent>
		  </Tooltip>
		);
	  }

	return (
		<Tooltip>
			<TooltipTrigger asChild>
			<Button
				onClick={async (e) => {
					// e.preventDefault();
					// e.stopPropagation();
					isLiked ? await unlikeMutation() : await insertWatchlistMutation()
				}}
				disabled={isLoading || isError}
				size="icon"
				variant={'action'}
				className={`rounded-full`}
			>
				{(isLoading || isLiked === undefined)  ? (
				<Icons.loader />
				) : isError ? (
				<AlertCircleIcon />
				) : (
				<HeartIcon className={`${isLiked && 'fill-foreground'}`} />
				)}
			</Button>
			</TooltipTrigger>
			<TooltipContent side="bottom">
			{!isLiked ? (
				<p>Aimer</p>
			) : (
				<p>Ne plus aimer</p>
			)}
			</TooltipContent>
		</Tooltip>
	);
}