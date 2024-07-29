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
	FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Loader from '@/components/Loader/Loader';

import { zodResolver } from '@hookform/resolvers/zod';
import { getInitiales } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import { supabase } from '@/lib/supabase/client';
import { Fragment, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import useDebounce from '@/hooks/use-debounce';
import { Badge } from '@/components/ui/badge';
import { UserFriend } from '@/types/type.db';
import { da } from 'date-fns/locale';

const sendFormSchema = z.object({
	friends: z.array(
		z.object({
			friend: z.any(),
		})
	),
	comment: z
		.string()
		.optional(),
});
  
type SendFormValues = z.infer<typeof sendFormSchema>;


export function MovieSendModal({
	onClose,
	movieId,
} : {
	onClose: () => void;
	movieId: number;
}) {
	const { user } = useAuth();

	const { closeModal } = useModal();

	const [ search, setSearch ] = useState<null | string>(null);

	const debouncedSearch = useDebounce(search);

	const { ref, inView } = useInView();

	const numberOfResult = 20;

	const {
		data: friends,
		isLoading: loading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: debouncedSearch ? ['movie', movieId, 'send', { search: debouncedSearch }] : ['movie', movieId, 'send'],
		queryFn: async ({ pageParam = 1 }) => {
			if (!user?.id) throw Error('Missing user id');
			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;

			let query = supabase
				.from('user_friend')
				.select('id, friend:friend_id!inner(*, user_movie_activity(count))')
				.eq('user_id', user?.id ?? '')
				.eq('friend.user_movie_activity.movie_id', movieId)
				.range(from, to)

			if (debouncedSearch) {
				query = query
					.ilike(`friend.username`, `${debouncedSearch}%`)
			}
			const { data } = await query.returns<UserFriend[]>();
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!user?.id && !!movieId,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, friends, fetchNextPage]);

	const defaultValues: Partial<SendFormValues> = {
		friends: [],
		comment: '',
	};

	const form = useForm<SendFormValues>({
		resolver: zodResolver(sendFormSchema),
		defaultValues,
	});

	async function onSubmit(data: SendFormValues) {
		if (!user?.id) return null;

		if (!data.friends.length) {
			toast.error('Vous devez sélectionner au moins un ami');
			return;
		}

		try {
			// const { error, } = await supabase
			// 	.rpc('insert_user_movie_guidelist', {
			// 		movieid: movieId,
			// 		receiver_user_ids: data.friends.map(({ friend }) => friend.id),
			// 		sender_user_id: user?.id,
			// 		comment: data.comment ?? '',
			// 	});
			const { error } = await supabase
				.rpc('user_movie_guidelist_insert', {
					movieid: movieId,
					receiver_user_ids: data.friends.map(({ friend }) => friend.id),
					sender_user_id: user?.id,
					comment: data.comment ?? '',
				});

			// const { error } = await supabase
			// 	.from('user_movie_guidelist_new')
			// 	.upsert(data.friends.map(({ friend }) => ({
			// 			movie_id: movieId,
			// 			user_id: friend.id,
			// 			sender_id: user.id,
			// 			comment: data.comment ?? '',
			// 	})))
 			if (error) throw error;
			form.reset();
			toast.success('Envoyé');
		} catch (error: any) {
			switch (error.code) {
				case '23505':
					if (data.friends.length === 1)
						toast.error('Vous avez déjà envoyé ce film à cet ami(e)');
					else
						toast.error('Vous avez déjà envoyé ce film à un ou plusieurs de ces amis');
					break;
				default:
					toast.error("Une erreur s'est produite");
					break;
			}
		} finally {
			onClose();
		}
	}

	return (
		<>
			<div className="relative">
				<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					value={search ?? ''}
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Rechercher un ami...'
					autoFocus={false}
					className="pl-8"
				/>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col space-y-2"
				>
					<FormField
					control={form.control}
					name="friends"
					render={() => (
						<ScrollArea className="border-2 rounded-md h-[40vh]">
						{friends?.pages[0]?.length ? (
							friends?.pages.map((page, i) => (
								<Fragment key={i}>
									{page?.map(({ friend }, index) => (
										<FormField
										key={friend?.id}
										control={form.control}
										name="friends"
										render={({ field }) => {
											return (
											<FormItem
												key={friend?.id}
												{...(i === friends.pages.length - 1 &&
												index === page.length - 1
													? { ref: ref }
													: {})}
											>
												<FormLabel className="flex flex-row w-full justify-between items-center space-x-3 space-y-0 hover:bg-muted p-2">
													<div className='flex items-center w-full justify-between gap-4'>
														<div className="font-normal flex gap-2 items-center">
															<Avatar className="h-[40px] w-[4	0px] shadow-2xl">
																<AvatarImage
																	src={friend?.avatar_url ?? ''}
																	alt={friend?.username}
																/>
																<AvatarFallback className="text-primary-foreground bg-muted text-[20px]">
																	{getInitiales(friend?.username ?? '')}
																</AvatarFallback>
															</Avatar>
															<div>
																<p className="line-clamp-1">{friend?.full_name}</p>
																<p className="text-muted-foreground line-clamp-1">
																	@{friend?.username}
																</p>
															</div>
														</div>
														{/*
														// @ts-ignore */}
														{friend?.user_movie_activity[0].count > 0 && <Badge variant={'destructive'}>Déjà vu</Badge>}
													</div>

													<FormControl>
														<Checkbox
															checked={field.value?.some(
															(friendSelected) =>
																friendSelected.friend.id === friend?.id
															)}
															// @ts-ignore
															disabled={friend?.user_movie_activity[0].count > 0}
															onCheckedChange={(checked) => {
															if (checked) {
																field.onChange([
																...(field.value || []),
																{ friend: { ...friend } },
																]);
															} else {
																field.onChange(
																field.value?.filter(
																	(friendSelected) =>
																	friendSelected.friend.id !== friend?.id
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
						) : (debouncedSearch && !loading && !isFetchingNextPage) ? (
							<p className="text-center p-2">Aucun résultat</p>
						) : friends != null ? (
							<p className="text-center p-2">Aucun ami</p>
						) : (
							<></>
						)}
						{(loading || isFetchingNextPage) && <Loader />}
						</ScrollArea>
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
						disabled={!form.getValues('friends').length}
						type="submit"
					>
						Envoyer
					</Button>
				</form>
			</Form>
		</>
	);
}
