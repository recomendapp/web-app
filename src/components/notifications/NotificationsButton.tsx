import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Icons } from "@/config/icons"
import { useUI } from "@/context/ui-context";
import { RightPanelNotifications } from "../sidebar/right-panel/RightPanelNotifications";
import { useCounts } from "@novu/react";
import { useAuth } from "@/context/auth-context";
import { CircleIcon } from "lucide-react";

export const NotificationsButton = ({
	onClick,
	className,
	...props
} : React.ComponentProps<typeof Button>) => {
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
			{counts && counts[0].count > 0 && (
				<CircleIcon size={8} className='absolute top-0 left-2/3 text-accent-1 fill-accent-1'/>
			)}
		</Button>
	)
}