import { UserMovieWatchlist } from "@/types/type.db"
import { Icons } from "@/config/icons";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu";
import { useModal } from "@/context/modal-context";
import { Fragment } from "react";
import ModalMovieWatchlistComment from "../Modals/Movie/ModalMovieWatchlistComment";

export const ContextMenuMovieWatchlistAction = ({
	children,
	watchlistItem,
}: {
	children: React.ReactNode,
	watchlistItem: UserMovieWatchlist,
}) => {
	const { openModal } = useModal();
	const items = [
		[
			{
				icon: Icons.comment,
				onClick: () => openModal(ModalMovieWatchlistComment, { watchlistItem }),
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
  