import * as React from "react"
import { Button } from "@/components/ui/button";
import { useUserActivityMovieQuery, useUserWatchlistMovieItemQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/navigation";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/navigation';
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserWatchlistMovieDeleteMutation, useUserWatchlistMovieInsertMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { ContextMenuWatchlistMovie } from "../ContextMenu/ContextMenuWatchlistMovie";

interface ButtonUserWatchlistMovieProps
	extends React.ComponentProps<typeof Button> {
		movieId: number;
		stopPropagation?: boolean;
	}

const ButtonUserWatchlistMovie = React.forwardRef<
	React.ComponentRef<typeof Button>,
	ButtonUserWatchlistMovieProps
>(({ movieId, stopPropagation = true, className, ...props }, ref) => {
	const { session } = useAuth();
	const t = useTranslations();
	const pathname = usePathname();

	const {
		data: activity,
	} = useUserActivityMovieQuery({
		userId: session?.user.id,
		movieId: movieId,
	});

	const {
		data: watchlist,
		isLoading,
		isError,
	} = useUserWatchlistMovieItemQuery({
		movieId: movieId,
		userId: session?.user.id,
	});

	const insertWatchlist = useUserWatchlistMovieInsertMutation();
	const deleteWatchlist = useUserWatchlistMovieDeleteMutation();

	const handleWatchlist = async (e: React.MouseEvent) => {
		stopPropagation && e.stopPropagation();
		if (watchlist) return;
		if (!session || !movieId) {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
			return;
		}
		await insertWatchlist.mutateAsync({
		  	userId: session.user.id,
			movieId: movieId,
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
		<ContextMenuWatchlistMovie watchlistItem={watchlist}>
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
		</ContextMenuWatchlistMovie>
	);
});
ButtonUserWatchlistMovie.displayName = 'ButtonUserWatchlistMovie';

export default ButtonUserWatchlistMovie;
