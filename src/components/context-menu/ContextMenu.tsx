import { LucideProps } from "lucide-react";
import { ContextMenu as ContextMenuPrimitive, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu"
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface ContextMenuProps extends React.ComponentProps<typeof ContextMenuPrimitive> {
	className?: string;
	items: {
	  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | ((props: LucideProps) => JSX.Element);
	  href?: string;
	  label: string;
	  shortcut?: string;
	  submenu?: any[];
	}[];
  }

export const ContextMenu = ({
	items,
	children,
	className,
	...props
} : ContextMenuProps) => {
	return (
		<ContextMenuPrimitive>
			<ContextMenuTrigger>
				{children}
			</ContextMenuTrigger>
			<ContextMenuContent>
			{items.map((item, index) => (
				<ContextMenuItem key={index}>
					{item.label}
					{/* <WithLink href={item.href}>
						{item.label}okoko
					</WithLink> */}
				</ContextMenuItem>
			))}
			</ContextMenuContent>
		</ContextMenuPrimitive>
	)
}
  