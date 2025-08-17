import * as React from "react"
import { Button } from "@/components/ui/button";
import { useUserActivityTvSeriesQuery, useUserWatchlistTvSeriesItemQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/routing";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/routing';
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserWatchlistTvSeriesDeleteMutation, useUserWatchlistTvSeriesInsertMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { ContextMenuWatchlistTvSeries } from "../ContextMenu/ContextMenuWatchlistTvSeries";

interface ButtonUserWatchlistTvSeriesProps
	extends React.ComponentProps<typeof Button> {
		tvSeriesId: number;
		stopPropagation?: boolean;
	}

const ButtonUserWatchlistTvSeries = React.forwardRef<
	React.ComponentRef<typeof Button>,
	ButtonUserWatchlistTvSeriesProps
>(({ tvSeriesId, stopPropagation = true, className, ...props }, ref) => {
	const { session } = useAuth();
	const t = useTranslations();
	const pathname = usePathname();

	const {
		data: activity,
	} = useUserActivityTvSeriesQuery({
		userId: session?.user.id,
		tvSeriesId: tvSeriesId,
	});

	const {
		data: watchlist,
		isLoading,
		isError,
	} = useUserWatchlistTvSeriesItemQuery({
		tvSeriesId: tvSeriesId,
		userId: session?.user.id,
	});
	const insertWatchlist = useUserWatchlistTvSeriesInsertMutation();
	const deleteWatchlist = useUserWatchlistTvSeriesDeleteMutation();

	const handleWatchlist = async (e: React.MouseEvent) => {
		stopPropagation && e.stopPropagation();
		if (watchlist) return;
		if (!session || !tvSeriesId) {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
			return;
		}
		await insertWatchlist.mutateAsync({
			tvSeriesId: tvSeriesId,
		  	userId: session.user.id,
		}, {
		  onError: () => {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
		  }
		});
	}
	const handleUnwatchlist = async (e: React.MouseEvent) => {
		stopPropagation && e.stopPropagation();
		if (!watchlist) return;
		if (!watchlist.id) {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
			return;
		}
		await deleteWatchlist.mutateAsync({
		  watchlistId: watchlist.id,
		}, {
		  onError: () => {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
		  }
		});
	  }

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
				<Icons.watchlist />
			</Link>
			</Button>
		</TooltipBox>
		)
	}

	return (
		<ContextMenuWatchlistTvSeries watchlistItem={watchlist}>
			<TooltipBox tooltip={watchlist ? upperFirst(t('common.messages.remove_from_watchlist')) : upperFirst(t('common.messages.add_to_watchlist'))}>
				<Button
					ref={ref}
					onClick={async (e) => watchlist ? await handleUnwatchlist(e) : await handleWatchlist(e)}
					disabled={isLoading || isError || watchlist === undefined || insertWatchlist.isPending || deleteWatchlist.isPending}
					size="icon"
					variant={'action'}
					className={`rounded-full`}
					{...props}
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
		</ContextMenuWatchlistTvSeries>
	);
});
ButtonUserWatchlistTvSeries.displayName = 'ButtonUserWatchlistTvSeries';

export default ButtonUserWatchlistTvSeries;
