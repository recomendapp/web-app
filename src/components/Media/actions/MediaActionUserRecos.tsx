import * as React from "react"
import { Button } from "@/components/ui/button";
import { MediaType } from "@/types/type.db";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/routing";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/routing';
import { cn } from "@/lib/utils";
import { useModal } from "@/context/modal-context";
import { ModalRecoSend } from "../../Modals/actions/ModalRecoSend";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";

interface MediaActionUserRecosProps
	extends React.ComponentProps<typeof Button> {
		mediaId: number;
		mediaTitle?: string | null;
		stopPropagation?: boolean;
	}

const MediaActionUserRecos = React.forwardRef<
	HTMLDivElement,
	MediaActionUserRecosProps
>(({ mediaId, stopPropagation = true, mediaTitle, className, ...props }, ref) => {
	const { user } = useAuth();
	const t = useTranslations('common');
	const pathname = usePathname();
	const { openModal } = useModal();

	if (user === null) {
		return (
		  <TooltipBox tooltip={upperFirst(t('messages.please_login'))}>
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
		<TooltipBox tooltip={upperFirst(t('messages.send_to_friend'))}>
		  <Button
			disabled={user === undefined}
			size="icon"
			variant={'action'}
			className={cn("rounded-full", className)}
			onClick={(e) => {
				stopPropagation && e.stopPropagation();
				openModal(ModalRecoSend, { mediaId, mediaTitle })
			}}
			{...props}
		  >
			{user === undefined ? <Icons.spinner className="animate-spin" /> : <Icons.send />}
		  </Button>
		</TooltipBox>
	  );
});
MediaActionUserRecos.displayName = 'MediaActionUserRecos';

export default MediaActionUserRecos;
