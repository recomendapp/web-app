'use client';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import { Dispatch, SetStateAction, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Playlist, PlaylistType } from '@/types/type.db';
import { Badge } from '@/components/ui/badge';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../Modal';
import { usePlaylistAddToPlaylistsMutation, usePlaylistCreateMutation } from '@/features/client/playlist/playlistMutations';
import { Icons } from '@/config/icons';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { useQueryClient } from '@tanstack/react-query';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { usePlaylistAddToQuery } from '@/features/client/playlist/playlistQueries';
import { playlistKeys } from '@/features/client/playlist/playlistKeys';

const COMMENT_MAX_LENGTH = 180;

interface ModalPlaylistAddProps extends ModalType {
	mediaId: number;
	mediaTitle?: string | null;
}

export function ModalPlaylistAdd({
	mediaId,
	mediaTitle,
	...props
} : ModalPlaylistAddProps) {
	const { user } = useAuth();
	const t = useTranslations();
	const queryClient = useQueryClient();
	const { closeModal } = useModal();
	const [selectedPlaylists, setSelectedPlaylists] = useState<Playlist[]>([]);
	const [comment, setComment] = useState<string>('');
	const [type, setType] = useState<PlaylistType>('personal');
	const [createPlaylist, setCreatePlaylist] = useState<boolean>(false);
	const [createPlaylistName, setCreatePlaylistName] = useState<string>('');
	const {
		data: playlists,
		isLoading,
	} = usePlaylistAddToQuery({
		mediaId: mediaId,
		userId: user?.id,
		type,
	});

	const addMovieToPlaylist = usePlaylistAddToPlaylistsMutation({
		mediaId: mediaId,
		userId: user?.id,
	});

	const createPlaylistMutation = usePlaylistCreateMutation({
		userId: user?.id,
	})

	function submit() {
		addMovieToPlaylist.mutate({
			playlists: selectedPlaylists,
			comment: comment,
		}, {
			onSuccess: () => {
				toast.success(upperFirst(t('common.messages.added', { gender: 'male', count: selectedPlaylists.length })));
				closeModal(props.id);
			},
			onError: () => {
				toast.error(upperFirst(t('common.errors.an_error_occurred')));
			}
		});
	}

	function handleCreatePlaylist() {
		if (!createPlaylistName || !createPlaylistName.length) return
		createPlaylistMutation.mutate({
			title: createPlaylistName,
		}, {
			onSuccess: (playlist) => {
				// Update the cache
				queryClient.setQueryData(playlistKeys.addToType({
					mediaId: mediaId,
					type: 'personal',
				}), (prev: { playlist: Playlist; already_added: boolean }[] | undefined) => {
					if (!prev) return [{ playlist, already_added: false }];
					return [
						{ playlist, already_added: false },
						...prev,
					];
				});
				setSelectedPlaylists((prev) => [...prev, playlist]);
				setCreatePlaylist(false);
				setCreatePlaylistName('');
			},
			onError: (error: any) => {
				toast.error(upperFirst(t('common.errors.an_error_occurred')));
			}
		});
	}

	return (
		<Modal
			open={props.open}
			onOpenChange={(open) => !open && closeModal(props.id)}
			className='gap-0 p-0 outline-none'
		>
			<ModalHeader className='px-4 pb-4 pt-5'>
				<ModalTitle>{upperFirst(t('common.messages.add_to_playlist'))}</ModalTitle>
				<ModalDescription>
					{t.rich('common.messages.add_to_one_or_more_playlists', {
						title: mediaTitle,
						strong: (chunks) => <strong>{chunks}</strong>,
					})}
				</ModalDescription>
			</ModalHeader>
			<ModalBody className='!p-0 overflow-hidden'>
				<Command className="overflow-hidden rounded-t-none border-t">
					<CommandInput placeholder={upperFirst(t('common.messages.search_playlist'))} />
					<Tabs onValueChange={setType as Dispatch<SetStateAction<string>>} defaultValue={type} className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="personal">{upperFirst(t('common.messages.my_playlist', { count: 2 }))}</TabsTrigger>
							<TabsTrigger value="shared">{upperFirst(t('common.word.saved', { gender: 'female', count: 2 }))}</TabsTrigger>
						</TabsList>
					</Tabs>
					<CommandList>
						<CommandGroup className="p-2">
							{/* QUICK CREATE PLAYLIST */}
							{type === 'personal' ? (
								<>
								{createPlaylist ? (
									<>
									<Label htmlFor="playlist" className="sr-only">{upperFirst(t('common.messages.playlist_name'))}</Label>
									<div className='relative'>
										<Input
											placeholder={upperFirst(t('common.messages.playlist_name'))}
											className="w-full pr-20"
											value={createPlaylistName}
											onChange={(e) => setCreatePlaylistName(e.target.value)}
										/>
										<div className='absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center gap-2'>
											<TooltipBox tooltip={upperFirst(t('common.word.create'))}>
												<Button
												variant={'ghost'}
												size={'icon'}
												className="text-muted-foreground hover:text-primary h-6 w-6"
												onClick={handleCreatePlaylist}
												>
													<Icons.check size={20} />
												</Button>
											</TooltipBox>
											<TooltipBox tooltip={upperFirst(t('common.word.cancel'))}>
												<Button
												variant={'ghost'}
												size={'icon'}
												className="text-muted-foreground hover:text-primary h-6 w-6"
												onClick={() => setCreatePlaylist(false)}
												>
													<Icons.close size={20} />
												</Button>
											</TooltipBox>
										</div>
									</div>
									</>
								) : (
								<Button
								variant={'ghost'}
								className=" w-full"
								onClick={() => setCreatePlaylist(true)}
								>
									<Icons.add size={20} className="mr-2" />
									{t('pages.playlist.actions.create')}
								</Button>
								)}
								<CommandSeparator className='my-1' />
							</>) : null}
							{playlists?.map(({playlist, already_added }) => (
								<CommandItem
									key={playlist.id}
									value={`${playlist.title} ${playlist.id}`}
									className="flex items-center justify-between px-2"
									onSelect={() => {
										if (selectedPlaylists.some((selectPlaylist) => selectPlaylist?.id === playlist.id)) {
											return setSelectedPlaylists((prev) => prev.filter(
												(selectPlaylist) => selectPlaylist?.id !== playlist.id
											))
										}
										return setSelectedPlaylists((prev) => [...prev, playlist]);
									}}
								>
									<div className="flex items-center">
										<div className={`w-[40px] shadow-2xl shrink-0`}>
											<AspectRatio ratio={1 / 1}>
												<ImageWithFallback
													src={playlist?.poster_url ?? ''}
													alt={playlist?.title ?? ''}
													fill
													className="rounded-md object-cover"
													type="playlist"
												/>
											</AspectRatio>
										</div>
										<div className="ml-2">
										<p className="text-sm font-medium leading-none line-clamp-1">
											{playlist.title}
										</p>
										<p className="text-sm text-muted-foreground line-clamp-1">
											{/* {playlist.items_count} film{playlist.items_count! > 1 && 's'} */}
										</p>
										</div>
									</div>
									<div className="flex items-center gap-2 shrink-0">
										{already_added && (
											<Badge variant="destructive">
												{upperFirst(t('common.messages.already_added', { count: 1, gender: 'male' }))}
											</Badge>
										)}
										<Check size={20} className={`text-primary ${!selectedPlaylists.some((selectedPlaylist) => selectedPlaylist?.id === playlist?.id) ? 'opacity-0' : ''}`} />
									</div>
								</CommandItem>
							))}
						</CommandGroup>
						{isLoading && (
							<div className="flex items-center justify-center p-4">
								<Icons.loader />
							</div>
						)}
						<CommandEmpty>{upperFirst(t('common.messages.no_playlists_found'))}</CommandEmpty>
					</CommandList>
				</Command>
			</ModalBody>
			<div className='px-2 pt-2'>
				<Label htmlFor="comment" className='sr-only'>{upperFirst(t('common.word.comment', { count: 1 }))}</Label>
				<Input
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder={upperFirst(t('common.messages.add_comment', { count: 1 }))}
				maxLength={COMMENT_MAX_LENGTH}
				/>
			</div>
			<ModalFooter className="flex items-center p-4 sm:justify-between">
				{selectedPlaylists.length > 0 ? (
				<div className="flex -space-x-2 overflow-hidden">
					{selectedPlaylists.map((playlist) => (
						<div
						key={playlist?.id}
						className={`w-[40px] shadow-2xl cursor-not-allowed`}
						onClick={() => setSelectedPlaylists((prev) => prev.filter(
							(selectPlaylist) => selectPlaylist?.id !== playlist?.id
						))}
						>
							<AspectRatio ratio={1 / 1}>
								<ImageWithFallback
									src={playlist?.poster_url ?? ''}
									alt={playlist?.title ?? ''}
									fill
									className="rounded-md object-cover"
									type="playlist"
								/>
							</AspectRatio>
						</div>
					))}
				</div>
				) : (
					<p className="text-sm text-muted-foreground">
						{}{upperFirst(t('common.messages.select_playlists_to_add_the_item'))}
					</p>
				)}
				<Button
				disabled={!selectedPlaylists.length || addMovieToPlaylist.isPending}
				onClick={submit}
				>
				{addMovieToPlaylist.isPending && <Icons.loader className="mr-2" />}
				{upperFirst(t('common.messages.add'))}
				</Button>
			</ModalFooter>
		</Modal>
	)
}
