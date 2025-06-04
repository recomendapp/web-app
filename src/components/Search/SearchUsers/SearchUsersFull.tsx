'use client';
import { useEffect } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';
import { CardUser } from '@/components/Card/CardUser';

export default function SearchUsersFull({
  query,
}: {
  query: string | undefined;
}) {
  const supabase = useSupabaseClient();
  const { ref, inView } = useInView();

  const numberOfResult = 20;

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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, users, fetchNextPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4 max-h-screen overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
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
    );
  }

  if (!loading && !users?.pages[0]?.length) {
    return <div>Aucun résultat.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4 overflow-x-auto overflow-y-hidden">
      {users?.pages.map((page, i) => (
        page?.map((user, index) => (
          <div
            key={user.id}
            ref={(i === users.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
          >
            <CardUser
              variant="vertical"
              user={user}
              className="w-full"
              linked
            />
          </div>
        ))
      ))}
    </div>
  );
}
