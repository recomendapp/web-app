import * as React from "react"
import { Button } from "@/components/ui/button";
import { MediaType } from "@/types/type.db";
import { useUserPlaylistSavedQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/routing";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/routing';
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserPlaylistSavedDeleteMutation, useUserPlaylistSavedInsertMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";

interface PlaylistActionSaveProps
	extends React.ComponentProps<typeof Button> {
		playlistId: number;
		stopPropagation?: boolean;
	}

const PlaylistActionSave = React.forwardRef<
	HTMLDivElement,
	PlaylistActionSaveProps
>(({ playlistId, stopPropagation = true, className, ...props }, ref) => {
	const { user } = useAuth();
	const t = useTranslations();
	const pathname = usePathname();

	const {
		data: saved,
		isLoading,
		isError,
	} = useUserPlaylistSavedQuery({
		userId: user?.id,
		playlistId: playlistId,
	});
	const insertPlaylistSaved = useUserPlaylistSavedInsertMutation();
	const deletePlaylistSaved = useUserPlaylistSavedDeleteMutation();

	const handleWatchlist = async (e: React.MouseEvent) => {
		stopPropagation && e.stopPropagation();
		if (saved) return;
		if (!user || !playlistId) {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
			return;
		}
		await insertPlaylistSaved.mutateAsync({
		  	userId: user?.id,
			playlistId: playlistId,
		}, {
		  onError: () => {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
		  }
		});
	}
	const handleUnwatchlist = async (e: React.MouseEvent) => {
		stopPropagation && e.stopPropagation();
		if (!saved) return;
		if (!saved.id) {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
			return;
		}
		await deletePlaylistSaved.mutateAsync({
		  savedId: saved.id,
		}, {
		  onError: () => {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
		  }
		});
	  }

	if (user == null) {
		return (
		<TooltipBox tooltip={upperFirst(t('common.messages.please_login'))}>
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
		<TooltipBox tooltip={saved ? upperFirst(t('common.messages.delete')) : upperFirst(t('common.messages.save'))}>
			<Button
				onClick={async (e) => saved ? await handleUnwatchlist(e) : await handleWatchlist(e)}
				disabled={isLoading || isError || saved === undefined || insertPlaylistSaved.isPending || deletePlaylistSaved.isPending}
				size="icon"
				variant={'action'}
				className={`rounded-full`}
			>
				{(isLoading || saved === undefined)  ? (
				<Icons.spinner className="animate-spin" />
				) : isError ? (
				<AlertCircleIcon />
				) : (
				<Icons.watchlist className={`${saved && 'fill-foreground'}`} />
				)}
			</Button>
		</TooltipBox>
	);
});
PlaylistActionSave.displayName = 'PlaylistActionSave';

export default PlaylistActionSave;
