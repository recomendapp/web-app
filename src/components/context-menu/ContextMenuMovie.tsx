import { Movie } from "@/types/type.db"
import { Icons } from "@/config/icons";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu";
import { WithLink } from "../utils/WithLink";
import { useModal } from "@/context/modal-context";
import { MoviePlaylistModal } from "../Modals/Movie/Actions/MoviePlaylistModal";
import { MovieSendModal } from "../Modals/Movie/Actions/MovieSendModal";
import { ContextMenu as ContextMenuTest } from "./ContextMenu";
import { Fragment } from "react";
import { ModalShare } from "../Modals/Share/ModalShare";

export const ContextMenuMovie = ({
	children,
	movie,
}: {
	children: React.ReactNode,
	movie: Movie,
}) => {
	const { openModal } = useModal();
	const items = [
		[
			{
				icon: Icons.movie,
				href: `/film/${movie?.slug ?? movie?.id}`,
				label: 'Accéder au film',
			},
			{
				icon: Icons.user,
				href: movie?.directors && movie.directors.length === 1 ? `/person/${movie.directors[0].id}` : undefined,
				label: `Accéder ${movie?.directors && movie?.directors.length === 1 ? 'au réalisateur' : 'aux réalisateurs'}`,
				submenu: (movie?.directors && movie.directors.length > 1) ? movie?.directors?.map((director) => ({
					href: `/person/${director.id}`,
					label: director.name,
				})) : undefined,
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
		],
		[
			{
				icon: Icons.share,
				onClick: () => openModal(ModalShare, {
					contentId: movie?.id!,
					contentType: 'movie',
					path: `/film/${movie?.slug ?? movie?.id}`,
				}),
				label: 'Partager',
			},
		]
	];
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				{children}
			</ContextMenuTrigger>
			<ContextMenuContent>
				{items.map((group, fragindex) => (
					<Fragment key={fragindex}>
						{group.map((item, index) => (
							item.submenu ? (
								<ContextMenuSub key={index}>
									<ContextMenuSubTrigger className="gap-2">
										<item.icon className="h-4 w-4"/>
										{item.label}
									</ContextMenuSubTrigger>
									<ContextMenuSubContent>
										{item.submenu.map((subItem, subIndex) => (
											<ContextMenuItem
												key={subIndex}
												className="gap-2"
												asChild={!!subItem.href}
											>
												<WithLink href={subItem.href}>
													{subItem.label}
												</WithLink>
											</ContextMenuItem>
										))}
									</ContextMenuSubContent>
								</ContextMenuSub>
							) : (
								<ContextMenuItem
									key={index}
									className="gap-2"
									asChild={!!item.href}
									onClick={item.onClick}
								>
									<WithLink href={item.href}>
										<item.icon className="h-4 w-4"/>
										{item.label}
									</WithLink>
								</ContextMenuItem>
							)
						))}
						{fragindex < items.length - 1 && <ContextMenuSeparator />}
					</Fragment>
				))}
			</ContextMenuContent>
		</ContextMenu>
	)
}
  