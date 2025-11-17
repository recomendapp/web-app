import * as React from "react"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/navigation";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/navigation';
import { cn } from "@/lib/utils";
import { useModal } from "@/context/modal-context";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { ModalPlaylistMovieAdd } from "../Modals/playlists/ModalPlaylistMovieAdd";

interface ButtonPlaylistMovieAddProps
	extends React.ComponentProps<typeof Button> {
		movieId: number;
		movieTitle?: string | null;
		stopPropagation?: boolean;
	}

const ButtonPlaylistMovieAdd = React.forwardRef<
	React.ComponentRef<typeof Button>,
	ButtonPlaylistMovieAddProps
>(({ movieId, stopPropagation = true, movieTitle, className, ...props }, ref) => {
	const { user } = useAuth();
	const t = useTranslations('common');
	const pathname = usePathname();
	const { openModal } = useModal();

	if (user === null) {
		return (
		  <TooltipBox tooltip={upperFirst(t('messages.please_login'))}>
			<Button
			ref={ref}
			size="icon"
			variant={'action'}
			className={cn("rounded-full", className)}
			asChild
			{...props}
			>
				<Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
					<Icons.addPlaylist />
				</Link>
			</Button>
		  </TooltipBox>
		);
	}

	return (
	<TooltipBox tooltip={upperFirst(t('messages.add_to_playlist'))}>
		<Button
		ref={ref}
		disabled={user === undefined}
		size="icon"
		variant={'action'}
		className={cn("rounded-full", className)}
		onClick={(e) => {
			stopPropagation && e.stopPropagation();
			openModal(ModalPlaylistMovieAdd, { movieId, movieTitle: movieTitle! })
		}}
		{...props}
		>
		{user === undefined ? <Icons.spinner className="animate-spin" /> : <Icons.addPlaylist />}
		</Button>
	</TooltipBox>
	);
});
ButtonPlaylistMovieAdd.displayName = 'ButtonPlaylistMovieAdd';

export default ButtonPlaylistMovieAdd;
