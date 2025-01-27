import * as React from "react"
import { Button } from "@/components/ui/button";
import { MediaType } from "@/types/type.db";
import { useUserActivityQuery, useUserWatchlistItemQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import Link from "next/link";
import { Icons } from "@/config/icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserWatchlistDeleteMutation, useUserWatchlistInsertMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { ContextMenuWatchlistAction } from "../../context-menu/ContextMenuWatchlistAction";

interface UserWatchlistProps
	extends React.ComponentProps<typeof Button> {
		mediaId: number;
		mediaType: MediaType;
		stopPropagation?: boolean;
	}

const UserWatchlist = React.forwardRef<
	HTMLDivElement,
	UserWatchlistProps
>(({ mediaId, mediaType, stopPropagation = true, className, ...props }, ref) => {
	const { user } = useAuth();
	const common = useTranslations('common');
	const pathname = usePathname();

	const {
		data: activity,
	} = useUserActivityQuery({
		userId: user?.id,
		mediaId: mediaId,
		mediaType: mediaType,
	});

	const {
		data: watchlist,
		isLoading,
		isError,
	} = useUserWatchlistItemQuery({
		userId: user?.id,
		mediaId: mediaId,
		mediaType: mediaType,
	});
	const insertWatchlist = useUserWatchlistInsertMutation({
		userId: user?.id,
	});
	const deleteWatchlist = useUserWatchlistDeleteMutation();

	const handleWatchlist = async (e: React.MouseEvent) => {
		stopPropagation && e.stopPropagation();
		if (watchlist) return;
		if (!user || !mediaId || !mediaType) {
			toast.error(upperFirst(common('errors.an_error_occurred')));
			return;
		}
		await insertWatchlist.mutateAsync({
		  	userId: user?.id,
			mediaId: mediaId,
			mediaType: mediaType,
		}, {
		  onError: () => {
			toast.error(upperFirst(common('errors.an_error_occurred')));
		  }
		});
	}
	const handleUnwatchlist = async (e: React.MouseEvent) => {
		stopPropagation && e.stopPropagation();
		if (!watchlist) return;
		if (!watchlist.id) {
			toast.error(upperFirst(common('errors.an_error_occurred')));
			return;
		}
		await deleteWatchlist.mutateAsync({
		  watchlistId: watchlist.id,
		}, {
		  onError: () => {
			toast.error(upperFirst(common('errors.an_error_occurred')));
		  }
		});
	  }

	if (user == null) {
		return (
		<TooltipBox tooltip={'Connectez-vous'}>
			<Button
			size={'icon'}
			variant={'action'}
			className={cn("rounded-full", className)}
			asChild
			{...props}
			>
			<Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
				<Icons.watchlist />
			</Link>
			</Button>
		</TooltipBox>
		)
	}

	return (
		<ContextMenuWatchlistAction watchlistItem={watchlist}>
			<TooltipBox tooltip={
			activity ? (
				watchlist ? (
				'Supprimer des films à revoir'
				) : (
				'Envie de le revoir'
				)
			) : watchlist ? (
				'Supprimer des films à voir'
			) : (
				'Envie de le voir'
			)
			}>
				<Button
					onClick={async (e) => watchlist ? await handleUnwatchlist(e) : await handleWatchlist(e)}
					disabled={isLoading || isError || activity === undefined || watchlist === undefined || insertWatchlist.isPending || deleteWatchlist.isPending}
					size="icon"
					variant={'action'}
					className={`rounded-full`}
				>
					{(isLoading || watchlist === undefined)  ? (
					<Icons.spinner className="animate-spin" />
					) : isError ? (
					<AlertCircleIcon />
					) : (
					<Icons.watchlist className={`${watchlist && 'fill-foreground'}`} />
					)}
				</Button>
			</TooltipBox>
		</ContextMenuWatchlistAction>
	);
});

export default UserWatchlist;
