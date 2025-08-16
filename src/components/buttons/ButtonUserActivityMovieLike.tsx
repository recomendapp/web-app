import * as React from "react"
import { Button } from "@/components/ui/button";
import { useUserActivityMovieQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/routing";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/routing';
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserActivityMovieInsertMutation, useUserActivityMovieUpdateMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/features/client/user/userKeys";

interface ButtonUserActivityMovieLikeProps
	extends React.ComponentProps<typeof Button> {
		movieId: number;
		stopPropagation?: boolean;
	}

const ButtonUserActivityMovieLike = React.forwardRef<
	React.ComponentRef<typeof Button>,
	ButtonUserActivityMovieLikeProps
>(({ movieId, stopPropagation = true, className, ...props }, ref) => {
	const { session } = useAuth();
	const t = useTranslations();
	const pathname = usePathname();
	const queryClient = useQueryClient();

	const {
		data: activity,
		isLoading,
		isError,
	} = useUserActivityMovieQuery({
		userId: session?.user.id,
		movieId: movieId,
	});

	const insertActivity = useUserActivityMovieInsertMutation();
	const updateActivity = useUserActivityMovieUpdateMutation();

	const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
		stopPropagation && e.stopPropagation();
		if (!session?.user.id) return;
		if (activity) {
			await updateActivity.mutateAsync({
				activityId: activity.id,
				isLiked: true,
			}, {
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: userKeys.heartPicks({ userId: session.user.id, type: 'movie' })
					});
				},
				onError: () => {
					toast.error(upperFirst(t('common.messages.an_error_occurred')));
				}
			});
		} else {
			await insertActivity.mutateAsync({
				userId: session?.user.id,
				movieId: movieId,
				isLiked: true,
			}, {
				onSuccess: (data) => {
					queryClient.invalidateQueries({
						queryKey: userKeys.heartPicks({ userId: session.user.id, type: 'movie' })
					});
				},
				onError: () => {
					toast.error(upperFirst(t('common.messages.an_error_occurred')));
				}
			});
		}
	};
	const handleUnlike = async (e: React.MouseEvent<HTMLButtonElement>) => {
		stopPropagation && e.stopPropagation();
		if (!session?.user.id) return;
		if (!activity) return;
		await updateActivity.mutateAsync({
			activityId: activity.id,
			isLiked: false,
		}, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: userKeys.heartPicks({ userId: session.user.id, type: 'movie' })
				});
			},
			onError: () => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')));
			}
		});
	};

	if (session == null) {
		return (
		<TooltipBox tooltip={upperFirst(t('common.messages.please_login'))}>
			<Button
			ref={ref}
			size={'icon'}
			variant={'action'}
			className={cn("rounded-full", className)}
			asChild
			{...props}
			>
			<Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
				<Icons.like className={`transition hover:text-accent-pink`} />
			</Link>
			</Button>
		</TooltipBox>
		)
	}

	return (
		<TooltipBox tooltip={activity?.is_liked ? upperFirst(t('common.messages.remove_from_heart_picks')) : upperFirst(t('common.messages.add_to_heart_picks'))}>
			<Button
			ref={ref}
			onClick={(e) => activity?.is_liked ? handleUnlike(e) : handleLike(e)}
			disabled={isLoading || isError || activity === undefined || insertActivity.isPending || updateActivity.isPending}
			size="icon"
			variant={'action'}
			className={cn("rounded-full", className)}
			{...props}
			>
				{(isLoading || activity === undefined) ? (
				<Icons.spinner className="animate-spin" />
				) : isError ? (
				<AlertCircleIcon />
				) : (
				<Icons.like
				className={`
				transition hover:text-accent-pink
				${activity?.is_liked && 'text-accent-pink fill-accent-pink'}
				`}
				/>
				)}
			</Button>
		</TooltipBox>
	);
});
ButtonUserActivityMovieLike.displayName = 'ButtonUserActivityMovieLike';

export default ButtonUserActivityMovieLike;
