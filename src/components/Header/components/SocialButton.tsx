import { useUI } from '@/context/ui-context';
import { Button } from '@/components/ui/button';
import { RightPanelSocial } from '@/components/sidebar/right-panel/RightPanelSocial';
import { Icons } from '@/config/icons';
import { cn } from '@/lib/utils';

/**
 * Social button
 * @description Open social in the right panel
 * @param {string} className - The class name of the element
 * @param {React.ComponentProps<typeof Button>} props - The props of the element
 */
export const SocialButton = ({
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
		onClick={() => toggleRightPanelContent(RightPanelSocial())}
		{...props}
		>
			<Icons.users className='w-4 h-4'/>
		</Button>
	);
}