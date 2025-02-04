import { Media } from "@/types/type.db"
import { Icons } from "@/config/icons";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu";
import { WithLink } from "../utils/WithLink";
import { useModal } from "@/context/modal-context";
import { Fragment } from "react";
import { ModalShare } from "../Modals/Share/ModalShare";
import { getMediaDetails } from "@/hooks/get-media-details";
import { ModalRecoSend } from "../Modals/actions/ModalRecoSend";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { ModalPlaylistAdd } from "../Modals/actions/ModalPlaylistAdd";

interface Item {
	icon: React.ElementType;
	href?: string;
	label: string;
	submenu?: Item[];
	onClick?: () => void;
}

export const ContextMenuMedia = ({
	children,
	media,
}: {
	children: React.ReactNode,
	media: Media,
}) => {
	const { openModal } = useModal();
	const common = useTranslations('common');
	const mediaDetails = getMediaDetails(media);
	const items: Item[][] = [
		[
			{
				icon: Icons.movie,
				href: media.url ?? '',
				label: 'Accéder au film',
			},
			// {
			// 	icon: Icons.user,
			// 	href: movie?.directors && movie.directors.length === 1 ? `/person/${movie.directors[0].slug ?? movie.directors[0].id}` : undefined,
			// 	label: `Accéder ${movie?.directors && movie?.directors.length === 1 ? 'au réalisateur' : 'aux réalisateurs'}`,
			// 	submenu: (movie?.directors && movie.directors.length > 1) ? movie?.directors?.map((director) => ({
			// 		href: `/person/${director.slug ?? director.id}`,
			// 		label: director.name,
			// 	})) : undefined,
			// },
			{
				icon: Icons.addPlaylist,
				onClick: () => openModal(ModalPlaylistAdd, { mediaId: media.media_id!, mediaTitle: mediaDetails.title }),
				label: 'Ajouter à une playlist',
			},
			{
				icon: Icons.send,
				onClick: () => openModal(ModalRecoSend, { mediaId: media.media_id!, mediaTitle: mediaDetails.title }),
				label: upperFirst(common('messages.send_to_friend')),
			}
		],
		[
			{
				icon: Icons.share,
				onClick: () => openModal(ModalShare, {
					title: media.title,
					type: media.media_type,
					path: media.url ?? '',
				}),
				label: upperFirst(common('word.share')),
			},
		]
	];
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				{children}
			</ContextMenuTrigger>
			<ContextMenuContent className="w-56">
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
												asChild
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
									onClick={item.onClick}
									asChild
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
  