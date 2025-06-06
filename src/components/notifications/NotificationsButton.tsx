import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Icons } from "@/config/icons"
import { useUI } from "@/context/ui-context";
import { RightPanelNotifications } from "../sidebar/right-panel/RightPanelNotifications";
import { useCounts } from "@novu/react";
import { CircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";

export const NotificationsButton = ({
	onClick,
	className,
	...props
} : React.ComponentProps<typeof Button>) => {
	const common = useTranslations('common');
	const { counts } = useCounts({ filters: [{ read: false }] });
	const {
		toggleRightPanelContent,
	} = useUI();
	const defaultOnClick = () => {
		toggleRightPanelContent(RightPanelNotifications())
	}
	return (
		<Button
		variant="ghost"
		size={'icon'}
		className={cn("relative rounded-full w-8 h-8", className)}
		onClick={onClick || defaultOnClick}
		{...props}
		>
			<Icons.bell className='w-4 h-4'/>
			<span className="sr-only">{upperFirst(common('messages.see_notifications'))}</span>
			{counts && counts[0].count > 0 && (
				<CircleIcon size={8} className='absolute top-0 left-2/3 text-accent-yellow fill-accent-yellow'/>
			)}
		</Button>
	)
}