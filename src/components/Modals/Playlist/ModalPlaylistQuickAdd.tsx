'use client';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Movie, Playlist } from '@/types/type.db';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../../Modals/Modal';
import { useAddMoviesToPlaylist } from '@/features/client/playlist/playlistMutations';
import { Icons } from '@/config/icons';
import { Label } from '@/components/ui/label';
import useDebounce from '@/hooks/use-debounce';
import { useTmdbSearchMoviesInfinite } from '@/features/client/tmdb/tmdbQueries';
import { useLocale } from 'next-intl';
import { InputSearch } from '@/components/ui/input-search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInView } from 'react-intersection-observer';

const COMMENT_MAX_LENGTH = 180;

interface ModalPlaylistQuickAddProps extends ModalType {
	playlist: Playlist;
}

export function ModalPlaylistQuickAdd({
	playlist,
	...props
} : ModalPlaylistQuickAddProps) {
	const { user } = useAuth();
	const locale = useLocale();
	const { closeModal } = useModal();
	const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
	const [comment, setComment] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const searchQuery = useDebounce(search, 500);
	const { ref, inView } = useInView();

	const {
		data: movies,
		isLoading,
		isError,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useTmdbSearchMoviesInfinite({
		query: searchQuery,
		locale: locale,
	})

	const addMoviesToPlaylist = useAddMoviesToPlaylist({
		userId: user?.id,
		playlist: playlist,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
		  fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	function submit() {
		addMoviesToPlaylist.mutate({
			movies: selectedMovies,
			comment: comment,
		}, {
			onSuccess: () => {
				toast.success(`Ajouté${selectedMovies.length > 1 ? 's' : ''}`);
				closeModal(props.id);
			},
			onError: () => {
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
				<ModalTitle>Ajouter à la playlist</ModalTitle>
				<ModalDescription>
					Ajouter un ou plusieurs films à <strong>{playlist?.title}</strong>
				</ModalDescription>
			</ModalHeader>
			<ModalBody className='!p-0 border-t bg-popover text-popover-foreground'>
				<InputSearch
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Rechercher un film..."
				/>
				<ScrollArea className={`h-[40vh]`}>
					<div className='p-2 grid justify-items-center'>
					{(movies?.pages && movies?.pages[0].length > 0) ? (
						movies?.pages.map((page, i) => (
							page.map((movie, index) => (
								<div
								key={index}
								className='w-full flex cursor-pointer items-center justify-between py-1.5 px-2 hover:bg-accent rounded-sm'
								onClick={() => {
									if (selectedMovies.some((selectedMovie) => selectedMovie?.id === movie?.id)) {
										return setSelectedMovies((prev) => prev.filter(
											(selectMovie) => selectMovie?.id !== movie?.id
										))
									}
									return setSelectedMovies((prev) => [...prev, movie]);
								}}
								{...(i === movies.pages.length - 1 && index === page.length - 1
									? { ref: ref }
									: {})}
								>
									<div className='flex items-center rounded-xl h-20'>
										<div className='relative h-full shrink-0 rounded-md overflow-hidden' style={{ aspectRatio: '2 / 3' }}>
											<ImageWithFallback
												src={movie?.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : ''}
												alt={movie?.title ?? ''}
												fill
												className="object-cover"
												type="playlist"
												sizes={`
												(max-width: 640px) 96px,
												(max-width: 1024px) 120px,
												150px
												`}
											/>
										</div>
										<div className='px-2 py-1 space-y-1'>
											<p className='line-clamp-2 break-words'>{movie?.title}</p>
											<p className='line-clamp-1 break-words text-muted-foreground'>
											{movie?.directors?.map((director, index: number) => (
												<span key={index} className={`${index > 0 ? 'before:content-[",_"]' : ''}`}>
													{director?.name}
												</span>
											)) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
											</p>
										</div>
									</div>
									<Check size={20} className={`text-primary ${!selectedMovies.some((selectedMovie) => selectedMovie?.id === movie?.id) ? 'opacity-0' : ''}`} />
								</div>
							))
						))
					) : isError ? (
						<div className='p-4 text-center text-muted-foreground'>
						Une erreur s&apos;est produite.
						</div>
					) : (searchQuery && !isLoading) ? (
						<div className='p-4 text-center text-muted-foreground'>
						Aucun film trouvé.
						</div>
					) : !isLoading ? (
						<div className='p-4 text-center text-muted-foreground'>
						Rechercher un film.
						</div>
					) : null}
					 {(isLoading || isFetchingNextPage) ? <Icons.loader /> : null}
					</div>
				</ScrollArea>
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
				{selectedMovies.length > 0 ? (
				<div className="flex -space-x-2 overflow-hidden">
					{selectedMovies.map((movie) => (
						<div
						key={movie?.id}
						className={`w-[40px] shadow-2xl cursor-not-allowed`}
						onClick={() => setSelectedMovies((prev) => prev.filter(
							(selectedMovie) => selectedMovie?.id !== movie?.id
						))}
						>
							<AspectRatio ratio={1 / 1}>
								<ImageWithFallback
									src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
									alt={movie?.title ?? ''}
									fill
									className="rounded-md object-cover"
									type="playlist"
									sizes={`
									(max-width: 640px) 96px,
									(max-width: 1024px) 120px,
									150px
									`}
								/>
							</AspectRatio>
						</div>
					))}
				</div>
				) : (
					<p className="text-sm text-muted-foreground">
						Select a movie to add to the playlist
					</p>
				)}
				<Button
				disabled={!selectedMovies.length || addMoviesToPlaylist.isPending}
				onClick={submit}
				>
				{addMoviesToPlaylist.isPending && <Icons.loader className="mr-2" />}
				Ajouter
				</Button>
			</ModalFooter>
		</Modal>
	)
}
