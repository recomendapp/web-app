import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
  } from '@/components/ui/tooltip';
import { TooltipContentProps, TooltipTriggerProps } from '@radix-ui/react-tooltip';

interface TooltipBoxProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	tooltip?: string;
	tooltipTrigger?: TooltipTriggerProps;
	tooltipContent?: TooltipContentProps;
}
  
export const TooltipBox: React.FC<TooltipBoxProps> = ({
	children,
	tooltip,
	tooltipTrigger,
	tooltipContent,
}) => {
	if (!tooltip) return children as JSX.Element;

	return (
		<Tooltip>
			<TooltipTrigger
				asChild
				{...tooltipTrigger}
			>
				{children}
			</TooltipTrigger>
			<TooltipContent
				side="bottom"
				{...tooltipContent}
			>
				{tooltip}
			</TooltipContent>
		</Tooltip>
	);
  }