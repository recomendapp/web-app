import { Movie } from "@/types/type.db"
import { Icons } from "@/config/icons";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "../ui/context-menu";
import { WithLink } from "../utils/WithLink";
import { useModal } from "@/context/modal-context";
import { MoviePlaylistModal } from "../Modals/Movie/Actions/MoviePlaylistModal";
import { MovieSendModal } from "../Modals/Movie/Actions/MovieSendModal";

export const ContextMenuMovie = ({
	children,
	movie,
}: {
	children: React.ReactNode,
	movie: Movie,
}) => {
	const { openModal } = useModal();
	const menuItems = [
		{
			icon: Icons.eye,
			href: `/film/${movie?.slug ?? movie?.id}`,
			label: 'Voir le film',
		},
		{
			icon: Icons.addPlaylist,
			onClick: () => openModal(MoviePlaylistModal, { movieId: movie?.id! }),
			label: 'Ajouter à une playlist',
		},
		{
			icon: Icons.send,
			onClick: () => openModal(MovieSendModal, { movieId: movie?.id! }),
			label: 'Envoyer à un ami',
		}
	];
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				{children}
			</ContextMenuTrigger>
			<ContextMenuContent>
			{menuItems.map((item, index) => (
				<ContextMenuItem
				key={index}
				className="gap-2"
				asChild={!!item.href}
				onClick={item.onClick}
				>
					<WithLink href={item.href}>
						<item.icon className="h-4 w-4"/>
						{item.label}
						{/* {item.shortcut ? (
						<ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
						) : null} */}
					</WithLink>
				</ContextMenuItem>
			))}
			</ContextMenuContent>
		</ContextMenu>
		// <ContextMenu items={menuItems}>
		// 	{children}
		// </ContextMenu>
	)
}
  