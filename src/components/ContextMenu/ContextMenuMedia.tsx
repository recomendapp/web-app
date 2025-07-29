"use client";
import { Media } from "@/types/type.db"
import { Icons } from "@/config/icons";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu";
import { WithLink } from "../utils/WithLink";
import { useModal } from "@/context/modal-context";
import { Fragment, useMemo } from "react";
import { ModalShare } from "../Modals/Share/ModalShare";
import { ModalRecoSend } from "../Modals/actions/ModalRecoSend";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { ModalPlaylistAdd } from "../Modals/actions/ModalPlaylistAdd";
import { useAuth } from "@/context/auth-context";
import { createShareController } from "../ShareController/ShareController";
import { ShareControllerMedia } from "../ShareController/ShareControllerMedia";

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
	additionalItemsTop = [],
	additionalItemsBottom = [],
}: {
	children: React.ReactNode,
	media: Media,
	additionalItemsTop?: Item[],
	additionalItemsBottom?: Item[],
}) => {
	const { session } = useAuth();
	const { openModal } = useModal();
	const common = useTranslations('common');
	const items: Item[][] = useMemo(() => {
		return [
		additionalItemsTop,
		[
			{
				icon: Icons.movie,
				href: media.url ?? '',
				label: media.media_type === 'movie'
					? upperFirst(common('messages.go_to_film'))
					: media.media_type === 'tv_series'
					? upperFirst(common('messages.go_to_serie'))
					: media.media_type === 'person'
					? upperFirst(common('messages.go_to_person'))
					: ''
			},
			...(session ? [
				{
					icon: Icons.addPlaylist,
					onClick: () => openModal(ModalPlaylistAdd, { mediaId: media.media_id!, mediaTitle: media.title }),
					label: 'Ajouter à une playlist',
				},
				{
					icon: Icons.send,
					onClick: () => openModal(ModalRecoSend, { mediaId: media.media_id!, mediaTitle: media.title }),
					label: upperFirst(common('messages.send_to_friend')),
				}
			] : []),
		],
		[
			{
				icon: Icons.share,
				onClick: () => openModal(ModalShare, {
					title: media.title,
					type: media.media_type,
					path: media.url ?? '',
					shareController: createShareController(ShareControllerMedia, {
						media: media,
					}),
				}),
				label: upperFirst(common('word.share')),
			},
			...additionalItemsBottom
		],
	]}, [media, session, common]);
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
						{(fragindex < items.length - 1 && items[fragindex].length > 0) && <ContextMenuSeparator />}
					</Fragment>
				))}
			</ContextMenuContent>
		</ContextMenu>
	)
}
  