import { useUI } from '@/context/ui-context';
import { Button } from '@/components/ui/button';
import { Icons } from '@/config/icons';
import { cn } from '@/lib/utils';
import { RightPanelNotifications } from '@/components/sidebar/right-panel/RightPanelNotifications';

/**
 * Notifications button
 * @description Open notifications in the right panel
 * @param {string} className - The class name of the element
 * @param {React.ComponentProps<typeof Button>} props - The props of the element
 */
export const NotificationsButton = ({
	className,
	...props
} : React.ComponentProps<typeof Button>) => {
	const {
		toggleRightPanelContent,
	} = useUI();
	return (
		<Button
		variant="ghost"
		size={'icon'}
		className={cn("rounded-full w-8 h-8", className)}
		onClick={() => toggleRightPanelContent(RightPanelNotifications())}
		{...props}
		>
			<Icons.bell className='w-4 h-4'/>
		</Button>
	);
}