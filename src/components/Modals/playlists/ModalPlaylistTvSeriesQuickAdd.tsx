'use client';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MediaTvSeries, Playlist } from '@recomendapp/types/dist';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../Modal';
import { Icons } from '@/config/icons';
import { Label } from '@/components/ui/label';
import useDebounce from '@/hooks/use-debounce';
import { useTmdbSearchTvSeriesInfiniteQuery } from '@/features/client/tmdb/tmdbQueries';
import { useLocale, useTranslations } from 'next-intl';
import { InputSearch } from '@/components/ui/input-search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInView } from 'react-intersection-observer';
import { usePlaylistTvSeriesMultiInsertMutation } from '@/features/client/playlist/playlistMutations';
import { upperFirst } from 'lodash';
import { SupportedLocale } from '@/translations/locales';
import { CardTvSeries } from '@/components/Card/CardTvSeries';

const COMMENT_MAX_LENGTH = 180;

interface ModalPlaylistTvSeriesQuickAddProps extends ModalType {
	playlist: Playlist;
}

export function ModalPlaylistTvSeriesQuickAdd({
	playlist,
	...props
} : ModalPlaylistTvSeriesQuickAddProps) {
	const { session } = useAuth();
	const t = useTranslations();
	const locale = useLocale();
	const { closeModal } = useModal();
	const [selectedTvSeries, setSelectedTvSeries] = useState<MediaTvSeries[]>([]);
	const [comment, setComment] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const searchQuery = useDebounce(search, 500);
	const { ref, inView } = useInView();

	const {
		data: tvSeries,
		isLoading,
		isError,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useTmdbSearchTvSeriesInfiniteQuery({
		query: searchQuery,
		locale: locale as SupportedLocale,
	})

	const insertTvSeriesMultiple = usePlaylistTvSeriesMultiInsertMutation({
		playlistId: playlist.id,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
		  fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	function submit() {
		if (!session?.user.id) return;
		const ids = selectedTvSeries.map((tvSeries) => tvSeries.id);
		if (ids.length === 0) return;
		insertTvSeriesMultiple.mutate({
			userId: session.user.id,
			tvSeriesIds: ids,
			comment: comment,
		}, {
			onSuccess: () => {
				toast.success(upperFirst(t('common.messages.added', { gender: 'male', count: selectedTvSeries.length })));
				closeModal(props.id);
			},
			onError: () => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')));
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
					{t.rich('common.messages.add_one_or_more_tv_series_to', {
						title: playlist.title,
						important: (chunks) => <strong>{chunks}</strong>,
					})}
				</ModalDescription>
			</ModalHeader>
			<ModalBody className='!p-0 border-t bg-popover text-popover-foreground'>
				<InputSearch
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder={upperFirst(t('common.messages.search_tv_series', { count: 1 }))}
				/>
				<ScrollArea className={`h-[40vh]`}>
					<div className='p-2 flex flex-col gap-1'>
					{(tvSeries?.pages && tvSeries.pages[0].length > 0) ? (
						tvSeries.pages.map((page, i) => (
							page.map((tvSeriesItem, index) => (
								<CardTvSeries
								key={index}
								variant='row'
								tvSeries={tvSeriesItem}
								className={`
									border-none bg-transparent hover:cursor-pointer
									${selectedTvSeries.some((item) => item.id === tvSeriesItem.id) ? 'bg-muted-hover' : ''}
								`}
								posterClassName='h-full'
								linked={false}
								onClick={() => {
									if (selectedTvSeries.some((item) => item.id === tvSeriesItem.id)) {
										return setSelectedTvSeries((prev) => prev.filter(
											(selectedTvSeries) => selectedTvSeries.id !== tvSeriesItem.id
										))
									}
									return setSelectedTvSeries((prev) => [...prev, tvSeriesItem]);
								}}
								{...(i === tvSeries.pages.length - 1 && index === page.length - 1
										? { ref: ref }
										: {})}
								/>
							))
						))
					) : isError ? (
						<div className='p-4 text-center text-muted-foreground'>
						{upperFirst(t('common.messages.an_error_occurred'))}
						</div>
					) : (searchQuery && !isLoading) ? (
						<div className='p-4 text-center text-muted-foreground'>
						{upperFirst(t('common.messages.no_tv_series_found'))}
						</div>
					) : !isLoading ? (
						<div className='p-4 text-center text-muted-foreground'>
						{upperFirst(t('common.messages.search_tv_series', { count: 1 }))}
						</div>
					) : null}
					 {(isLoading || isFetchingNextPage) ? <Icons.loader className='w-full'/> : null}
					</div>
				</ScrollArea>
			</ModalBody>
			<div className='px-2 pt-2'>
				<Label htmlFor="comment" className='sr-only'>{upperFirst(t('common.messages.comment', {count: 1}))}</Label>
				<Input
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder={upperFirst(t('common.messages.add_comment', { count: 1 }))}
				maxLength={COMMENT_MAX_LENGTH}
				/>
			</div>
			<ModalFooter className="flex items-center p-4 sm:justify-between">
				{selectedTvSeries.length > 0 ? (
				<div className="flex -space-x-2 overflow-hidden">
					{selectedTvSeries.map((tvSeriesItem) => (
						<div
						key={tvSeriesItem.id}
						className={`w-[40px] shadow-2xl cursor-not-allowed`}
						onClick={() => setSelectedTvSeries((prev) => prev.filter(
							(selectedTvSeries) => selectedTvSeries.id !== tvSeriesItem.id
						))}
						>
							<AspectRatio ratio={1 / 1}>
								<ImageWithFallback
									src={tvSeriesItem.poster_url ?? ''}
									alt={tvSeriesItem.name ?? ''}
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
						{upperFirst(t('common.messages.select_a_tv_series_to_add_to_playlist'))}
					</p>
				)}
				<Button
				disabled={!selectedTvSeries.length || insertTvSeriesMultiple.isPending}
				onClick={submit}
				>
				{insertTvSeriesMultiple.isPending && <Icons.loader className="mr-2" />}
				{upperFirst(t('common.messages.add'))}
				</Button>
			</ModalFooter>
		</Modal>
	)
}
