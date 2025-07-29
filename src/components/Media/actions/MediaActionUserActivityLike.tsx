import * as React from "react"
import { Button } from "@/components/ui/button";
import { MediaType } from "@/types/type.db";
import { useUserActivityQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/routing";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/routing';
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserActivityInsertMutation, useUserActivityUpdateMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/features/client/user/userKeys";

interface MediaActionUserActivityLikeProps
	extends React.ComponentProps<typeof Button> {
		mediaId: number;
		stopPropagation?: boolean;
	}

const MediaActionUserActivityLike = React.forwardRef<
	HTMLDivElement,
	MediaActionUserActivityLikeProps
>(({ mediaId, stopPropagation = true, className, ...props }, ref) => {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const t = useTranslations('common');
	const pathname = usePathname();
	const {
		data: activity,
		isLoading,
		isError,
	} = useUserActivityQuery({
		userId: user?.id,
		mediaId: mediaId,
	});
	const insertActivity = useUserActivityInsertMutation();
	const updateActivity = useUserActivityUpdateMutation();

	const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
		stopPropagation && e.stopPropagation();
		if (!user?.id) return;
		if (activity) {
			await updateActivity.mutateAsync({
				activityId: activity.id,
				isLiked: true,
			}, {
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: userKeys.likes({ userId: user?.id as string })
					});
				},
				onError: () => {
					toast.error(upperFirst(t('errors.an_error_occurred')));
				}
			});
		} else {
			await insertActivity.mutateAsync({
				userId: user?.id,
				mediaId: mediaId,
				isLiked: true,
			}, {
				onSuccess: (data) => {
					queryClient.invalidateQueries({
						queryKey: userKeys.likes({ userId: user?.id as string })
					});
				},
				onError: () => {
					toast.error(upperFirst(t('errors.an_error_occurred')));
				}
			});
		}
	};
	const handleUnlike = async (e: React.MouseEvent<HTMLButtonElement>) => {
		stopPropagation && e.stopPropagation();
		if (!activity) return;
		await updateActivity.mutateAsync({
			activityId: activity.id,
			isLiked: false,
		}, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: userKeys.likes({ userId: user?.id as string })
				});
			},
			onError: () => {
				toast.error(upperFirst(t('errors.an_error_occurred')));
			}
		});
	};

	if (user == null) {
		return (
		<TooltipBox tooltip={upperFirst(t('messages.please_login'))}>
			<Button
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
		<TooltipBox tooltip={activity?.is_liked ? upperFirst(t('messages.remove_from_heart_picks')) : upperFirst(t('messages.add_to_heart_picks'))}>
			<Button
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
MediaActionUserActivityLike.displayName = 'MediaActionUserActivityLike';

export default MediaActionUserActivityLike;
