import * as React from "react"
import { Button } from "@/components/ui/button";
import { MediaType } from "@/types/type.db";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import Link from "next/link";
import { Icons } from "@/config/icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useModal } from "@/context/modal-context";
import { ModalPlaylistAdd } from "@/components/Modals/actions/ModalPlaylistAdd";

interface MediaActionPlaylistAddProps
	extends React.ComponentProps<typeof Button> {
		mediaId: number;
		mediaType: MediaType;
		mediaTitle?: string | null;
		stopPropagation?: boolean;
	}

const MediaActionPlaylistAdd = React.forwardRef<
	HTMLDivElement,
	MediaActionPlaylistAddProps
>(({ mediaId, mediaType, stopPropagation = true, mediaTitle, className, ...props }, ref) => {
	const { user } = useAuth();
	const pathname = usePathname();
	const { openModal } = useModal();

	if (user === null) {
		return (
		  <TooltipBox tooltip={'Connectez-vous'}>
			<Button
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
		<TooltipBox tooltip={'Ajouter à une playlist'}>
		  <Button
			disabled={user === undefined}
			size="icon"
			variant={'action'}
			className={cn("rounded-full", className)}
			onClick={(e) => {
				stopPropagation && e.stopPropagation();
				openModal(ModalPlaylistAdd, { mediaId, mediaType, mediaTitle })
			}}
			{...props}
		  >
			{user === undefined ? <Icons.spinner className="animate-spin" /> : <Icons.addPlaylist />}
		  </Button>
		</TooltipBox>
	  );
});

export default MediaActionPlaylistAdd;
