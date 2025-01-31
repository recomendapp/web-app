import { UserWatchlist } from "@/types/type.db"
import { Icons } from "@/config/icons";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu";
import { useModal } from "@/context/modal-context";
import { Fragment } from "react";
import { ModalWatchlistComment } from "../Modals/watchlist/ModalWatchlistComment";

export const ContextMenuWatchlistAction = ({
	children,
	watchlistItem,
}: {
	children: React.ReactNode,
	watchlistItem?: UserWatchlist | null,
}) => {
	const { openModal } = useModal();
	const items = [
		[
			{
				icon: Icons.comment,
				onClick: () => watchlistItem && openModal(ModalWatchlistComment, { watchlistItem }),
				label: watchlistItem?.comment ? 'Modifier le commentaire' : 'Ajouter un commentaire',
			}
		]
	];
	if (!watchlistItem) return children;
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				{children}
			</ContextMenuTrigger>
			<ContextMenuContent>
				{items.map((group, fragindex) => (
					<Fragment key={fragindex}>
						{group.map((item, index) => (
							<ContextMenuItem
								key={index}
								className="gap-2"
								onClick={item.onClick}
							>
								<item.icon className="h-4 w-4"/>
								{item.label}
							</ContextMenuItem>
						))}
						{fragindex < items.length - 1 && <ContextMenuSeparator />}
					</Fragment>
				))}
			</ContextMenuContent>
		</ContextMenu>
	)
}
  