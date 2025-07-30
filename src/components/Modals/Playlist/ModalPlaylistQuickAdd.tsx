'use client';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Media, Playlist } from '@/types/type.db';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../../Modals/Modal';
import { Icons } from '@/config/icons';
import { Label } from '@/components/ui/label';
import useDebounce from '@/hooks/use-debounce';
import { useTmdbSearchMultiInfiniteQuery } from '@/features/client/tmdb/tmdbQueries';
import { useLocale, useTranslations } from 'next-intl';
import { InputSearch } from '@/components/ui/input-search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInView } from 'react-intersection-observer';
import { usePlaylistAddMediasMutation } from '@/features/client/playlist/playlistMutations';
import { upperFirst } from 'lodash';
import { CardMedia } from '@/components/Card/CardMedia';

const COMMENT_MAX_LENGTH = 180;

interface ModalPlaylistQuickAddProps extends ModalType {
	playlist: Playlist;
}

export function ModalPlaylistQuickAdd({
	playlist,
	...props
} : ModalPlaylistQuickAddProps) {
	const { user } = useAuth();
	const t = useTranslations();
	const locale = useLocale();
	const { closeModal } = useModal();
	const [selectedMedias, setSelectedMedias] = useState<Media[]>([]);
	const [comment, setComment] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const searchQuery = useDebounce(search, 500);
	const { ref, inView } = useInView();

	const {
		data: medias,
		isLoading,
		isError,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useTmdbSearchMultiInfiniteQuery({
		query: searchQuery,
		locale: locale,
	})

	const addMediasToPlaylist = usePlaylistAddMediasMutation({
		userId: user?.id,
		playlist: playlist,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
		  fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	function submit() {
		addMediasToPlaylist.mutate({
			medias: selectedMedias,
			comment: comment,
		}, {
			onSuccess: () => {
				toast.success(upperFirst(t('common.messages.added', { gender: 'male', count: selectedMedias.length })));
				closeModal(props.id);
			},
			onError: () => {
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
					{t.rich('common.messages.add_one_or_more_items_to', {
						title: playlist?.title,
						important: (chunks) => <strong>{chunks}</strong>,
					})}
				</ModalDescription>
			</ModalHeader>
			<ModalBody className='!p-0 border-t bg-popover text-popover-foreground'>
				<InputSearch
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder={upperFirst(t('common.messages.search_media'))}
				/>
				<ScrollArea className={`h-[40vh]`}>
					<div className='p-2 flex flex-col gap-1'>
					{(medias?.pages && medias?.pages[0].results.length > 0) ? (
						medias?.pages.map((page, i) => (
							page.results.map((media, index) => (
								<CardMedia
								key={index}
								variant='row'
								media={media}
								className={`
									border-none bg-transparent hover:cursor-pointer
									${selectedMedias.some((selectedMedia) => selectedMedia?.id === media?.id) ? 'bg-muted-hover' : ''}
								`}
								posterClassName='h-full'
								hideMediaType={false}
								linked={false}
								onClick={() => {
									if (selectedMedias.some((selectedMedia) => selectedMedia?.id === media?.id)) {
										return setSelectedMedias((prev) => prev.filter(
											(selectedMedia) => selectedMedia?.id !== media?.id
										))
									}
									return setSelectedMedias((prev) => [...prev, media]);
								}}
								{...(i === medias.pages.length - 1 && index === page.results.length - 1
										? { ref: ref }
										: {})}
								/>
							))
						))
					) : isError ? (
						<div className='p-4 text-center text-muted-foreground'>
						{upperFirst(t('common.errors.an_error_occurred'))}
						</div>
					) : (searchQuery && !isLoading) ? (
						<div className='p-4 text-center text-muted-foreground'>
						{upperFirst(t('common.errors.no_media_found'))}
						</div>
					) : !isLoading ? (
						<div className='p-4 text-center text-muted-foreground'>
						{upperFirst(t('common.messages.search_media'))}
						</div>
					) : null}
					 {(isLoading || isFetchingNextPage) ? <Icons.loader className='w-full'/> : null}
					</div>
				</ScrollArea>
			</ModalBody>
			<div className='px-2 pt-2'>
				<Label htmlFor="comment" className='sr-only'>{upperFirst(t('common.word.comment', {count: 1}))}</Label>
				<Input
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder={upperFirst(t('common.messages.add_comment', { count: 1 }))}
				maxLength={COMMENT_MAX_LENGTH}
				/>
			</div>
			<ModalFooter className="flex items-center p-4 sm:justify-between">
				{selectedMedias.length > 0 ? (
				<div className="flex -space-x-2 overflow-hidden">
					{selectedMedias.map((media) => (
						<div
						key={media?.id}
						className={`w-[40px] shadow-2xl cursor-not-allowed`}
						onClick={() => setSelectedMedias((prev) => prev.filter(
							(selectedMedia) => selectedMedia?.id !== media?.id
						))}
						>
							<AspectRatio ratio={1 / 1}>
								<ImageWithFallback
									src={media.avatar_url ?? ''}
									alt={media?.title ?? ''}
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
						{upperFirst(t('common.messages.select_an_item_to_add_to_playlist'))}
					</p>
				)}
				<Button
				disabled={!selectedMedias.length || addMediasToPlaylist.isPending}
				onClick={submit}
				>
				{addMediasToPlaylist.isPending && <Icons.loader className="mr-2" />}
				{upperFirst(t('common.messages.add'))}
				</Button>
			</ModalFooter>
		</Modal>
	)
}
