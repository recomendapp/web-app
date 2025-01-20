'use client';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import UserCard from '@/components/User/UserCard/UserCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';

export default function SearchUsersSmall({
  query,
  className,
}: {
  query: string | undefined;
  className?: string;
}) {
  const common = useTranslations('common');
  const supabase = useSupabaseClient();
  const numberOfResult = 8;

  const {
		data: users,
		isLoading,
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

  const showSkeleton = users === undefined || isLoading;

  if ((!showSkeleton && !users) || users?.pages[0]?.length == 0) return null;

  return (
    <div className={cn(" w-full flex flex-col gap-2", className)}>
      {showSkeleton
        ? <Skeleton className="h-8 w-32" />
        : (
          <Button
          variant={'link'}
          className="text-2xl font-bold justify-start p-0 hover:text-foreground"
          asChild
          >
            <Link href={`/search/users?q=${query}`}>{upperFirst(common('messages.user', { count: 2}))}</Link>
          </Button>
        )}
      {/* USERS CONTAINER */}
      <ScrollArea className="pb-4">
        <div className="flex gap-4">
          {showSkeleton ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="flex flex-col items-center bg-secondary h-full rounded-xl p-2 gap-2"
              >
                <Skeleton className=" h-[150px] w-[150px] rounded-full" />
                <Skeleton className=" h-5 w-20" />
                <Skeleton className=" h-5 w-20 rounded-full" />
              </Skeleton>
            ))
          ) : users?.pages.map((page, i) => (
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
