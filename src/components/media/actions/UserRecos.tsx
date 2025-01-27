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
import { ModalRecoSend } from "../../Modals/actions/ModalRecoSend";

interface UserRecosProps
	extends React.ComponentProps<typeof Button> {
		mediaId: number;
		mediaType: MediaType;
		mediaTitle?: string | null;
		stopPropagation?: boolean;
	}

const UserRecos = React.forwardRef<
	HTMLDivElement,
	UserRecosProps
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
				<Icons.send />
			  </Link>
			</Button>
		  </TooltipBox>
		);
	  }

	  return (
		<TooltipBox tooltip={'Envoyer à un(e) ami(e)'}>
		  <Button
			disabled={user === undefined}
			size="icon"
			variant={'action'}
			className={cn("rounded-full", className)}
			onClick={(e) => {
				stopPropagation && e.stopPropagation();
				openModal(ModalRecoSend, { mediaId, mediaType, mediaTitle })
			}}
			{...props}
		  >
			{user === undefined ? <Icons.spinner className="animate-spin" /> : <Icons.send />}
		  </Button>
		</TooltipBox>
	  );
});

export default UserRecos;
