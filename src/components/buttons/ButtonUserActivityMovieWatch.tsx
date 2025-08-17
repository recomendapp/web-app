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
import { useUserActivityMovieDeleteMutation, useUserActivityMovieInsertMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { useModal } from "@/context/modal-context";

interface ButtonUserActivityMovieWatchProps
	extends React.ComponentProps<typeof Button> {
		movieId: number;
    stopPropagation?: boolean;
	}

const ButtonUserActivityMovieWatch = React.forwardRef<
	React.ComponentRef<typeof Button>,
	ButtonUserActivityMovieWatchProps
>(({ movieId, stopPropagation = true, className, ...props }, ref) => {
	const { session } = useAuth();
  	const { createConfirmModal } = useModal();
	const t = useTranslations();
	const pathname = usePathname();
	const {
		data: activity,
		isLoading,
		isError,
	} = useUserActivityMovieQuery({
		userId: session?.user.id,
		movieId: movieId,
	});
	const insertActivity = useUserActivityMovieInsertMutation();
	const deleteActivity = useUserActivityMovieDeleteMutation();

	const handleInsertActivity = async (e?: React.MouseEvent<HTMLButtonElement>) => {
		stopPropagation && e?.stopPropagation();
		if (activity || !session?.user.id) return;
		await insertActivity.mutateAsync({
		userId: session?.user.id,
		movieId: movieId,
		}), {
		onError: () => {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
		}
		};
	};

	const handleDeleteActivity = async (e?: React.MouseEvent<HTMLButtonElement>) => {
		stopPropagation && e?.stopPropagation();
		if (!activity) return;
		await deleteActivity.mutateAsync({
			activityId: activity.id,
		}), {
			onError: () => {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
			}
		};
	};

	if (session === null) {
		return (
		<TooltipBox tooltip={upperFirst(t('common.messages.please_login'))}>
			<Button
			ref={ref}
			size="icon"
			variant={'action'}
			className={cn(`rounded-full hover:text-foreground`, className)}
			asChild
			{...props}
			>
			<Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
				<div
				className={`transition border-2 rounded-full p-[0.5px] border-foreground hover:border-accent-blue hover:text-accent-blue`}
				>
				<Icons.check />
				</div>
			</Link>
			</Button>
		</TooltipBox>
		);
	}

	return (
		<TooltipBox tooltip={activity ? upperFirst(t('common.messages.remove_from_watched')) : upperFirst(t('common.messages.mark_as_watched'))}>
			<Button
			ref={ref}
			onClick={(e) => {
				e.stopPropagation();
				activity
				? createConfirmModal({
				title: upperFirst(t('common.messages.remove_from_watched')),
				description: t('components.media.actions.watch.remove_from_watched.description'),
				onConfirm: () => handleDeleteActivity(),
				})
				: handleInsertActivity()
			}}
			disabled={isLoading || isError || activity === undefined || insertActivity.isPending || deleteActivity.isPending}
			size="icon"
			variant={'action'}
			className={cn('rounded-full', className)}
			{...props}
			>
				{(isLoading || activity === undefined) ? (
				<Icons.spinner className="animate-spin" />
				) : isError ? (
				<AlertCircleIcon />
				) : (
				<div
				className={`
					transition border-2 rounded-full p-[0.5px] hover:border-accent-blue
					${activity ? 'bg-accent-blue border-accent-blue' : 'text-foreground border-foreground hover:text-accent-blue'}
				`}
				>
					<Icons.check />
				</div>
				)}
			</Button>
		</TooltipBox>
	);
});
ButtonUserActivityMovieWatch.displayName = 'ButtonUserActivityMovieWatch';

export default ButtonUserActivityMovieWatch;
