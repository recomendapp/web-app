import { Playlist } from "@/types/type.db"
import { Icons } from "@/config/icons";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "../ui/context-menu";
import { WithLink } from "../utils/WithLink";
import { useModal } from "@/context/modal-context";
import { Fragment, useMemo } from "react";
import { ModalShare } from "../Modals/Share/ModalShare";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { useAuth } from "@/context/auth-context";
import { PlaylistModal } from "../Modals/Playlist/PlaylistModal";
import { ModalPlaylistGuest } from "../Modals/Playlist/ModalPlaylistGuest/ModalPlaylistGuest";
import { usePlaylistDeleteMutation } from "@/features/client/playlist/playlistMutations";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "@/lib/i18n/routing";

interface Item {
	icon: React.ElementType;
	href?: string;
	label: string;
	submenu?: Item[];
	onClick?: () => void;
}

export const ContextMenuPlaylist = ({
	children,
	playlist,
}: {
	children: React.ReactNode,
	playlist: Playlist,
}) => {
	const { session } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const { openModal, createConfirmModal } = useModal();
	const playlistDeleteMutation = usePlaylistDeleteMutation({
		userId: session?.user.id,
	})
	const t = useTranslations();
	const items: Item[][] = useMemo(() => {
		return [
		[
			{
				icon: Icons.playlist,
				href: `/playlist/${playlist.id}`,
				label: upperFirst(t('common.messages.go_to_playlist')),
			},
			{
				icon: Icons.user,
				href: `/@${playlist.user?.username}`,
				label: upperFirst(t('common.messages.go_to_user')),
			},
			...(session?.user.id === playlist.user_id ? [
				{
					icon: Icons.edit,
					onClick: () => {
						openModal(PlaylistModal, {
							playlist: playlist,
						})
					},
					label: upperFirst(t('common.messages.edit')),
				},
				{
					icon: Icons.users,
					onClick: () => openModal(ModalPlaylistGuest, {
						playlistId: playlist.id,
					}),
					label: upperFirst(t('common.messages.guest', { gender: 'male', count: 2 })),
				},
			] : []),
		],
		[
			{
				icon: Icons.share,
				onClick: () => openModal(ModalShare, {
					title: playlist.title,
					type: 'playlist',
					path: `/playlist/${playlist.id}`,
				}),
				label: upperFirst(t('common.messages.share')),
			},
			...(session?.user.id === playlist.user_id ? [
				{
					icon: Icons.delete,
					onClick: () => {
						createConfirmModal({
							title: upperFirst(t('common.messages.are_u_sure')),
							description: t.rich('pages.playlist.actions.delete.description', {
								title: playlist.title,
								important: (chunk) => <b>{chunk}</b>,
							}),
							onConfirm: async () => {
								await playlistDeleteMutation.mutateAsync(
									{ playlistId: playlist.id },
									{
										onSuccess: async () => {
											toast.success(upperFirst(t('common.messages.deleted')));
											if (pathname.startsWith(`/playlist/${playlist.id}`)) {
												router.replace('/collection');
											}
										},
										onError: () => {
											toast.error(upperFirst(t('common.messages.an_error_occurred')));
										},
									}
								);
							},
						});
					},
					label: upperFirst(t('common.messages.delete')),
				}
			] : []),
		],
	]}, [playlist, session, t]);
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
  