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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Loader from '@/components/Loader/Loader';

// GRAPHQL
// import { useMutation } from '@apollo/client';
// import USER_FRIENDS_QUERY from '@/graphql/User/Friends/queries/GetUserFriends';
// import INSERT_GUIDELIST_MUTATION from '@/graphql/User/Movie/Guidelist/mutations/InsertUserMovieGuidelist';
// import {
//   GetUserFriendsQuery,
//   InsertUserMovieGuidelistMutation,
// } from '@/graphql/__generated__/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { getInitiales } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import { supabase } from '@/lib/supabase/client';
import { Fragment, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Input } from '@/components/ui/input';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import useDebounce from '@/hooks/use-debounce';

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
  id,
  movieId,
}: {
  id: string;
  movieId: string;
}) {
  const { user } = useAuth();

  const { closeModal } = useModal();

  const [ search, setSearch ] = useState<null | string>(null);

  const debouncedSearch = useDebounce(search, 300);

//   const {
//     data: userFriendsQuery,
//     loading,
//     error,
//   } = useQuery<GetUserFriendsQuery>(USER_FRIENDS_QUERY, {
//     variables: {
//       user_id: user?.id,
//     },
//     skip: !user,
//   });
//   const friends = userFriendsQuery?.user_friendCollection?.edges;

	const { ref, inView } = useInView();

	const numberOfResult = 20;

	const {
		data: friends,
		isLoading: loading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: debouncedSearch ? ['user', user?.id, 'friends', { search: debouncedSearch }] : ['user', user?.id, 'friends'],
		queryFn: async ({ pageParam = 1 }) => {
			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;

			let query = supabase
				.from('user_friend')
				.select('id, friend:user!inner(*)')
				.eq('user_id', user?.id ?? '')
				.range(from, to)

			if (debouncedSearch) {
				query = query
					.ilike(`friend.username`, `${debouncedSearch}%`)
			}
			const { data } = await query;
			return data;
		},
		getNextPageParam: (data, pages) => {
			return data?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!user?.id,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			console.log('fetchNextPage');
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	// const [insertGuidelistMutation, { error: errorInsertGuidelist }] =
    // useMutation<InsertUserMovieGuidelistMutation>(INSERT_GUIDELIST_MUTATION);

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
			// const { error, count } = await supabase
			// 	.from('user_movie_guidelist')
			// 	.upsert(data.friends.map(({ friend }) => ({
			// 		movie_id: Number(movieId),
			// 		receiver_user_id: String(friend.id),
			// 		sender_user_id: String(user?.id),
			// 		comment: data.comment,
			// 	})), { count: 'exact', onConflict: 'movie_id, receiver_user_id', ignoreDuplicates: true});
			const { error, count } = await supabase
				.rpc('insert_user_movie_guidelist', {
					movieid: Number(movieId),
					receiver_user_ids: data.friends.map(({ friend }) => friend.id),
					sender_user_id: user?.id,
					comment: data.comment ?? '',
				});
			if (error) throw error;
			// if (Number(count) !== data.friends.length) throw { count: Number(count), error };
			form.reset();
			toast.success('Envoyé');
		} catch (error: any) {
			toast.error("Une erreur s'est produite");
		} finally {
			closeModal(id);
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
												className="flex flex-row w-full justify-between items-center space-x-3 space-y-0 hover:bg-muted p-2"
												{...(i === friends.pages.length - 1 &&
												index === page.length - 1
													? { ref: ref }
													: {})}
											>
												<FormLabel className="font-normal flex gap-2 items-center">
													<Avatar className="h-[40px] w-[4	0px] shadow-2xl">
														<AvatarImage
															src={friend?.avatar_url ?? ''}
															alt={friend?.username}
														/>
														<AvatarFallback className="text-primary bg-muted text-[20px]">
															{getInitiales(friend?.username ?? '')}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="font-semibold line-clamp-1">{friend?.full_name}</p>
														<p className="text-muted-foreground line-clamp-1">
															@{friend?.username}
														</p>
													</div>
												</FormLabel>
												<FormControl>
													<Checkbox
														checked={field.value?.some(
														(friendSelected) =>
															friendSelected.friend.id === friend?.id
														)}
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
