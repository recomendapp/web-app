'use client';

import { useAuth } from '@/context/auth-context';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// COMPONENTS
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Loader from '@/components/Loader/Loader';

import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import { supabase } from '@/lib/supabase/client';
import { Fragment, useEffect, useState } from 'react';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import useDebounce from '@/hooks/use-debounce';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { Playlist } from '@/types/type.db';
import { Badge } from '@/components/ui/badge';

const sendFormSchema = z.object({
	playlists: z.array(
		z.object({
			playlist: z.any(),
		})
	),
	comment: z
		.string()
		.optional(),
});
  
type SendFormValues = z.infer<typeof sendFormSchema>;

export function MoviePlaylistModal({
	onClose,
	movieId,
} : {
	onClose: () => void;
	movieId: number;
}) {
	const { user } = useAuth();

	const queryClient = useQueryClient();

	const { closeModal } = useModal();

	const [ search, setSearch ] = useState<null | string>(null);

	const [ playlistView, setPlaylistView ] = useState<string>('personal');

	const debouncedSearch = useDebounce(search);

	const { mutateAsync: addPlaylist } = useMutation({
		mutationFn: async (data: SendFormValues) => {
			if (!user?.id) throw new Error('User not found');
			if (!data.playlists.length) throw new Error('Vous devez sélectionner au moins une playlist');
			const { data: response, error, count } = await supabase
				.from('playlist_item')
				.insert(data.playlists.map(({ playlist }) => ({
					playlist_id: playlist.id,
					movie_id: movieId,
					user_id: user?.id,
					comment: data.comment,
					rank: 0,
				})), { count: 'exact',})
				.select('*, playlist(*)');
			if (error || Number(count) !== data.playlists.length) throw new Error('Une erreur s\'est produite');
			const responseWithIncrementedCount = response.map(item => {
				if (item.playlist && item.playlist.items_count !== undefined) {
					item.playlist.items_count += 1;
				}
				return item;
			});
			return responseWithIncrementedCount;
		},
		onSuccess: (data) => {
			// Invalidate playlists
			data.map(item => {
				queryClient.invalidateQueries({
					queryKey: ['playlist', item?.playlist_id],
				});
			});
			// Reset user playlists
			queryClient.setQueryData(['user', user?.id, 'playlists', { order: 'updated_at-desc'}], (oldData: InfiniteData<Playlist[], unknown>) => {
				if (!oldData || !oldData.pages) {
					return oldData;
				}
			
				// Récupérez les IDs des nouvelles playlists
				const newPlaylistIds = data.map(item => item?.playlist?.id);
			
				// Filtrer les nouvelles playlists pour ne conserver que celles qui étaient présentes dans oldData
				const newPlaylistsInOldData = data.filter(item => oldData.pages.some(page => page.some(oldItem => oldItem?.id === item?.playlist?.id)));
				
				// Filtrer les playlists existantes avec des IDs non présents dans les nouvelles playlists
				const deletePlaylist = oldData.pages.map(page => page.filter(item => !newPlaylistIds.includes(item?.id)));
			
				// Créez la nouvelle page avec les playlists existantes filtrées et les nouvelles playlists présentes dans oldData
				const newPage = [
					...newPlaylistsInOldData.map(item => item.playlist),
					...deletePlaylist.flat(),
				];
			
				const newData: InfiniteData<Playlist[], unknown> = {
					...oldData,
					pages: [newPage, ...deletePlaylist.slice(1)],
				};
			
				return newData;
			});
			toast.success('Ajouté');
			form.reset();
			onClose();
		},
		onError: () => {
			toast.error("Une erreur s\'est produite");
		}
	});

	const defaultValues: Partial<SendFormValues> = {
		playlists: [],
		comment: '',
	};

	const form = useForm<SendFormValues>({
		resolver: zodResolver(sendFormSchema),
		defaultValues,
	});

	async function onSubmit(data: SendFormValues) {
		await addPlaylist(data);
	}

	return (
		<>
			<div className="relative">
				<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					value={search ?? ''}
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Rechercher une playlist...'
					autoFocus={false}
					className="pl-8"
				/>
			</div>
			<Tabs onValueChange={setPlaylistView} defaultValue={playlistView} className="w-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col space-y-2"
					>
						<FormField
						control={form.control}
						name="playlists"
						render={() => (
							<>
								<TabsList className="grid w-full grid-cols-2">
									<TabsTrigger value="personal">Mes playlists</TabsTrigger>
									<TabsTrigger value="external">Enregistré</TabsTrigger>
								</TabsList>
								<TabsContent value="personal">
									<UserMoviePlaylist movieId={movieId} search={debouncedSearch} form={form} />
								</TabsContent>
								<TabsContent value="external">
									<UserMoviePlaylistLike movieId={movieId} search={debouncedSearch} form={form} />
								</TabsContent>
							</>
						)}
						/>
						<FormField
							control={form.control}
							name="comment"
							render={({ field }) => (
								<FormItem>
								<FormLabel className="sr-only">Bio</FormLabel>
								<FormControl>
									<Input
										placeholder="Écrire un commentaire..."
										maxLength={180}
										autoComplete='off'
										{...field}
									/>
								</FormControl>
								</FormItem>
							)}
						/>
						<Button
							disabled={!form.getValues('playlists').length}
							type="submit"
						>
							Ajouter
						</Button>
					</form>
				</Form>
			</Tabs>

		</>
	);
}

const UserMoviePlaylist = ({
	movieId,
	search,
	form,
}: {
	movieId: number;
	search: string | null;
	form: any;
}) => {
	const { user } = useAuth();

	const { ref, inView } = useInView();

	const numberOfResult = 20;

	const {
		data: playlists,
		isLoading: loading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: search ? ['user', user?.id, 'playlist', { search: search }] : ['user', user?.id, 'playlist'],
		queryFn: async ({ pageParam = 1 }) => {
			if (!user?.id) throw new Error('User not found');

			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;

			// check if there is already the movieid in the playlist
			let query = supabase
				.from('playlist')
				.select('*, isAlready:playlist_item(count)')
				.eq('user_id', user?.id)
				.eq('isAlready.movie_id', movieId)
				.order('updated_at', { ascending: false})
				.range(from, to)

			if (search) {
				query = query
					.ilike(`title`, `${search}%`)
			}
			const { data } = await query;
			// console.log('playlists content', data);
			return (data);
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!user?.id,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, playlists, fetchNextPage]);

	return (
		<ScrollArea className="border-2 rounded-md h-[40vh]">
			{playlists?.pages[0]?.length ? (
				playlists?.pages.map((page, i) => (
					<Fragment key={i}>
						{page?.map((playlist, index) => (
							<FormField
							key={playlist?.id}
							control={form.control}
							name="playlists"
							render={({ field }) => {
								return (
								<FormItem
									key={playlist?.id}
									ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
								>
									<FormLabel className="flex flex-row w-full justify-between items-center space-x-3 space-y-0 hover:bg-muted p-2">
										<div className='flex items-center w-full justify-between'>
											<div className="font-normal flex gap-2 items-center">
												<div className={`w-[40px] shadow-2xl`}>
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
												<div>
													<p className="line-clamp-1">{playlist?.title}</p>
													<p className="text-muted-foreground line-clamp-1">{playlist?.items_count} film{playlist?.items_count! > 1 && 's'}</p>
												</div>
											</div>
											{playlist.isAlready[0].count > 0 && <Badge variant={'destructive'}>Déjà ajouté</Badge>}
										</div>
										<FormControl>
											<Checkbox
												checked={field.value?.some(
												(playlistSelected: any) =>
													playlistSelected.playlist.id === playlist?.id
												)}
												onCheckedChange={(checked) => {
												if (checked) {
													field.onChange([
													...(field.value || []),
													{ playlist: { ...playlist } },
													]);
												} else {
													field.onChange(
													field.value?.filter(
														(playlistSelected: any) =>
														playlistSelected.playlist.id !== playlist?.id
													)
													);
												}
												}}
												className="rounded-full"
											/>
										</FormControl>
									</FormLabel>
								</FormItem>
								);
							}}
							/>
						))}
					</Fragment>
				))
			) : (search && !loading && !isFetchingNextPage) ? (
				<p className="text-center p-2">Aucun résultat</p>
			) : playlists != null ? (
				<p className="text-center p-2">Aucune playlist</p>
			) : (
				<></>
			)}
			{(loading || isFetchingNextPage) && <Loader />}
		</ScrollArea>
	)
}

const UserMoviePlaylistLike = ({
	movieId,
	search,
	form,
}: {
	movieId: number;
	search: string | null;
	form: any;
}) => {
	const { user } = useAuth();

	const { ref, inView } = useInView();

	const numberOfResult = 20;

	const {
		data: playlists,
		isLoading: loading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: search ? ['user', user?.id, 'playlist_like', { search: search }] : ['user', user?.id, 'playlist_like'],
		queryFn: async ({ pageParam = 1 }) => {
			if (!user?.id) throw new Error('User not found');
			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;

			let query = supabase
				.from('playlist_like')
				.select(`
					id, 
					playlist!inner(*, playlist_guest!inner(*), user!inner(*), isAlready:playlist_item(count))
				`)
				.eq('user_id', user?.id)
				.eq('playlist.playlist_guest.user_id', user?.id)
				.eq('playlist.playlist_guest.edit', true)
				.eq('playlist.user.premium', true)
				.eq('playlist.isAlready.movie_id', movieId)
				.range(from, to)

			if (search) {
				query = query
					.ilike(`playlist.title`, `${search}%`)
			}
			const { data } = await query;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!user?.id,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, playlists, fetchNextPage]);

	return (
		<ScrollArea className="border-2 rounded-md h-[40vh]">
			{playlists?.pages[0]?.length ? (
				playlists?.pages.map((page, i) => (
					<Fragment key={i}>
						{page?.map(({ playlist }, index) => (
							<FormField
							key={playlist?.id}
							control={form.control}
							name="playlists"
							render={({ field }) => {
								return (
								<FormItem
									key={playlist?.id}
									{...(i === playlists.pages.length - 1 &&
									index === page.length - 1
										? { ref: ref }
										: {})}
								>
									<FormLabel className="flex flex-row w-full justify-between items-center space-x-3 space-y-0 hover:bg-muted p-2">
										<div className='flex items-center w-full justify-between'>
											<div className="font-normal flex gap-2 items-center">
												<div className={`w-[40px] shadow-2xl`}>
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
												<div>
													<p className="line-clamp-1">{playlist?.title}</p>
													<p className="text-muted-foreground line-clamp-1">{playlist?.items_count} film{playlist?.items_count! > 1 && 's'}</p>
												</div>
											</div>
											{playlist.isAlready[0].count > 0 && <Badge variant={'destructive'}>Déjà ajouté</Badge>}
										</div>
										<FormControl>
											<Checkbox
												checked={field.value?.some(
												(playlistSelected: any) =>
													playlistSelected.playlist.id === playlist?.id
												)}
												onCheckedChange={(checked) => {
												if (checked) {
													field.onChange([
													...(field.value || []),
													{ playlist: { ...playlist } },
													]);
												} else {
													field.onChange(
													field.value?.filter(
														(playlistSelected: any) =>
														playlistSelected.playlist.id !== playlist?.id
													)
													);
												}
												}}
												className="rounded-full"
											/>
										</FormControl>
									</FormLabel>
								</FormItem>
								);
							}}
							/>
						))}
					</Fragment>
				))
			) : (search && !loading && !isFetchingNextPage) ? (
				<p className="text-center p-2">Aucun résultat</p>
			) : playlists != null ? (
				<p className="text-center p-2">Aucune playlist</p>
			) : (
				<></>
			)}
			{(loading || isFetchingNextPage) && <Loader />}
		</ScrollArea>
	)
}