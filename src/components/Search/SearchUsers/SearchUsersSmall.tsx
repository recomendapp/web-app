'use client';
import { Skeleton } from '../../ui/skeleton';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import UserCard from '@/components/User/UserCard/UserCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';

export default function SearchUsersSmall({
  query,
}: {
  query: string | undefined;
}) {
  const supabase = useSupabaseClient();
  const numberOfResult = 8;

  const {
		data: users,
		isLoading: loading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['search', 'user', { search: query }],
		queryFn: async ({ pageParam = 1 }) => {
      if (!query) return null;
			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;

			const { data } = await supabase
        .from('user')
        .select('*')
        .range(from, to)
        .ilike(`username`, `${query}%`);
			return (data);
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!query
	});

  if (loading) {
    return (
      <div className=" w-full flex flex-col gap-2">
        {/* USERS TITLE */}
        <div className="flex justify-between items-end">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
        {/* USERS CONTAINER */}
        <div className=" flex h-[250px] gap-4 overflow-x-auto overflow-y-hidden flex-wrap">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className="flex flex-col items-center bg-secondary h-full rounded-xl p-2 gap-2"
            >
              {/* AVATAR */}
              <Skeleton className="bg-background h-[150px] w-[150px] rounded-full" />
              {/* NAME */}
              <Skeleton className="bg-background h-5 w-20" />
              <Skeleton className="bg-background h-5 w-20 rounded-full" />
            </Skeleton>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && !users?.pages[0]?.length) return null;

  return (
    <div className=" w-full flex flex-col gap-2">
      {/* USERS TITLE */}
      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold">Utilisateurs</div>
        {hasNextPage && (
          <Button variant="link" className="p-0 h-full" asChild>
            <Link href={`/search/users?q=${query}`}>Tout afficher</Link>
          </Button>
        )}
      </div>
      {/* USERS CONTAINER */}
      <ScrollArea className="pb-4">
        <div className="flex gap-4">
          {users?.pages.map((page, i) => (
            page?.map((user, index) => (
              <UserCard key={user.id} user={user} full />
            ))
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
