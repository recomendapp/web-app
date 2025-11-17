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
import { ModalUserRecosTvSeriesSend } from "../Modals/recos/ModalUserRecosTvSeriesSend";

interface ButtonUserRecosTvSeriesSendProps
	extends React.ComponentProps<typeof Button> {
		tvSeriesId: number;
		tvSeriesTitle?: string | null;
		stopPropagation?: boolean;
	}

const ButtonUserRecosTvSeriesSend = React.forwardRef<
	HTMLDivElement,
	ButtonUserRecosTvSeriesSendProps
>(({ tvSeriesId, stopPropagation = true, tvSeriesTitle, className, ...props }, ref) => {
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
				openModal(ModalUserRecosTvSeriesSend, {
					tvSeriesId,
					tvSeriesTitle: tvSeriesTitle!,
				})
			}}
			{...props}
		  >
			{user === undefined ? <Icons.spinner className="animate-spin" /> : <Icons.send />}
		  </Button>
		</TooltipBox>
	  );
});
ButtonUserRecosTvSeriesSend.displayName = 'ButtonUserRecosTvSeriesSend';

export default ButtonUserRecosTvSeriesSend;
