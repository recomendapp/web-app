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
import { Movie, Playlist, PlaylistType } from '@/types/type.db';
import { Badge } from '@/components/ui/badge';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../../Modal';
import { useAddMovieToPlaylists, useCreatePlaylist } from '@/features/playlist/playlistMutations';
import { Icons } from '@/config/icons';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { useMeAddMovieToPlaylist } from '@/features/me/meQueries';
import { useQueryClient } from '@tanstack/react-query';
import { meKeys } from '@/features/me/meKeys';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { useTranslations } from 'next-intl';

const COMMENT_MAX_LENGTH = 180;

interface ModalMoviePlaylistProps extends ModalType {
	movieId: number;
	movie?: Movie
}

export function ModalMoviePlaylist({
	movieId,
	movie,
	...props
} : ModalMoviePlaylistProps) {
	const { user } = useAuth();
	const common = useTranslations('common');
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
	} = useMeAddMovieToPlaylist({
		movieId,
		userId: user?.id,
		type,
	});

	const addMovieToPlaylist = useAddMovieToPlaylists({
		movieId,
		userId: user?.id,
	});

	const createPlaylistMutation = useCreatePlaylist({
		userId: user?.id,
	})

	function submit() {
		addMovieToPlaylist.mutate({
			playlists: selectedPlaylists,
			comment: comment,
		}, {
			onSuccess: () => {
				toast.success('Ajouté');
				closeModal(props.id);
			},
			onError: () => {
				toast.error("Une erreur s\'est produite");
			}
		});
	}

	function handleCreatePlaylist() {
		createPlaylistMutation.mutate({
			title: createPlaylistName,
		}, {
			onSuccess: (playlist) => {
				// Update the cache
				queryClient.setQueryData(meKeys.addMovieToPlaylistType({
					movieId: movieId,
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
				toast.error("Une erreur s\'est produite");
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
				<ModalTitle>Ajouter à une playlist</ModalTitle>
				<ModalDescription>
					Ajouter {movie?.title ? (<strong>{movie?.title}</strong>) : 'ce film'} à une ou plusieurs de vos playlists.
				</ModalDescription>
			</ModalHeader>
			<ModalBody className='!p-0 overflow-hidden'>
				<Command className="overflow-hidden rounded-t-none border-t">
					<CommandInput placeholder="Search playlist..." />
					<Tabs onValueChange={setType as Dispatch<SetStateAction<string>>} defaultValue={type} className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="personal">Mes playlists</TabsTrigger>
							<TabsTrigger value="shared">Enregistrées</TabsTrigger>
						</TabsList>
					</Tabs>
					<CommandList>
						<CommandGroup className="p-2">
							{/* QUICK CREATE PLAYLIST */}
							{type === 'personal' ? (
								<>
								{createPlaylist ? (
									<>
									<Label htmlFor="playlist" className="sr-only">Playlist Name</Label>
									<div className='relative'>
										<Input
											placeholder="Nom de la playlist"
											className="w-full pr-20"
											value={createPlaylistName}
											onChange={(e) => setCreatePlaylistName(e.target.value)}
										/>
										<div className='absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center gap-2'>
											<TooltipBox tooltip='Créer'>
												<Button
												variant={'ghost'}
												size={'icon'}
												className="text-muted-foreground hover:text-primary h-6 w-6"
												onClick={handleCreatePlaylist}
												>
													<Icons.check size={20} />
												</Button>
											</TooltipBox>
											<TooltipBox tooltip='Annuler'>
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
									{common('playlist.actions.create')}
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
											{playlist.items_count} film{playlist.items_count! > 1 && 's'}
										</p>
										</div>
									</div>
									<div className="flex items-center gap-2 shrink-0">
										{already_added && (
											<Badge variant="destructive">
												Déjà ajouté
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
						<CommandEmpty>No playlists found.</CommandEmpty>
					</CommandList>
				</Command>
			</ModalBody>
			<div className='px-2 pt-2'>
				<Label htmlFor="comment" className='sr-only'>Commentaire</Label>
				<Input
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder='Écrire un commentaire...'
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
						Select a playlist to add the movie
					</p>
				)}
				<Button
				disabled={!selectedPlaylists.length || addMovieToPlaylist.isPending}
				onClick={submit}
				>
				{addMovieToPlaylist.isPending && <Icons.loader className="mr-2" />}
				Ajouter
				</Button>
			</ModalFooter>
		</Modal>
	)
}
