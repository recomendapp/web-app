'use client';

// COMPONENTS
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Loader from '@/components/Loader/Loader';

import { getInitiales } from '@/lib/utils';
import { supabase } from '@/lib/supabase/client';
import { Fragment, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import useDebounce from '@/hooks/use-debounce';
import Link from 'next/link';


export function ProfileFollowersModal({
	userId,
} : {
	userId: string;
}) {

	const [ search, setSearch ] = useState<null | string>(null);

	const debouncedSearch = useDebounce(search);

	const { ref, inView } = useInView();

	const numberOfResult = 20;

	const {
		data: followers,
		isLoading: loading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: debouncedSearch ? ['user', userId, 'followers', { search: debouncedSearch }] : ['user', userId, 'followers'],
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) throw Error('Missing user id');
			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;

			let query = supabase
				.from('user_follower')
				.select('id, follower:user_id!inner(*)')
				.eq('followee_id', userId)
				.range(from, to)

			if (debouncedSearch) {
				query = query
					.ilike(`follower.username`, `${debouncedSearch}%`)
			}
			const { data } = await query;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!userId,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, followers, fetchNextPage]);

	return (
		<>
			<div className="relative">
				<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					value={search ?? ''}
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Rechercher un user...'
					autoFocus={false}
					className="pl-8"
				/>
			</div>
			<ScrollArea className="flex flex-col gap-2 border-2 rounded-md h-[60vh]">
			{followers?.pages[0]?.length ? (
				followers?.pages.map((page, i) => (
					page?.map(({ follower } : { follower: any }, index) => (
						<Link
							href={`/@${follower?.username}`}
							key={follower?.id}
							className='flex items-center w-full gap-2 p-2 hover:bg-muted'
							{...(i === followers.pages.length - 1 &&
								index === page.length - 1
									? { ref: ref }
									: {})}
						>
							<Avatar className="h-[40px] w-[40px] shadow-2xl">
								<AvatarImage
									src={follower?.avatar_url ?? ''}
									alt={follower?.username}
								/>
								<AvatarFallback className="text-primary bg-muted text-[20px]">
									{getInitiales(follower?.username ?? '')}
								</AvatarFallback>
							</Avatar>
							<div>
								<p className="line-clamp-1">{follower?.full_name}</p>
								<p className="text-muted-foreground line-clamp-1">
									@{follower?.username}
								</p>
							</div>
						</Link>
					))
				))
			) : (debouncedSearch && !loading && !isFetchingNextPage) ? (
				<p className="text-center p-2">Aucun résultat</p>
			) : followers != null ? (
				<p className="text-center p-2">Aucun follower</p>
			) : (
				<></>
			)}
			{(loading || isFetchingNextPage) && <Loader />}
			</ScrollArea>
		</>
	);
}
