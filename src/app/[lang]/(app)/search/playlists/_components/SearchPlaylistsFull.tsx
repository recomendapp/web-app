'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';
import { CardPlaylist } from '@/components/Card/CardPlaylist';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPlaylistsFull({
  query,
}: {
  query: string | undefined;
}) {
  const supabase = useSupabaseClient();
  const [order, setOrder] = useState('popular');

  const { ref, inView } = useInView();

  const numberOfResult = 8;

  const {
		data: playlists,
		isLoading: loading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['search', 'playlist', { search: query }],
		queryFn: async ({ pageParam = 1 }) => {
      if (!query) return null;
			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;

			const { data } = await supabase
        .from('playlists')
        .select('*, user(*)')
        .order('updated_at', { ascending: false})
        .range(from, to)
        .ilike(`title`, `${query}%`);
        
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
  }, [inView, hasNextPage, playlists, fetchNextPage]);

  if (!loading && !playlists?.pages[0]?.length) {
    return <div>Aucun résultat.</div>;
  }

  return (
    <div className=" w-full flex flex-col gap-2">
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 gap-4 overflow-x-auto overflow-y-hidden">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="flex flex-col items-center bg-secondary h-full w-full rounded-xl p-2 gap-2"
              >
                {/* AVATAR */}
                <Skeleton className="bg-background h-[150px] w-[150px] rounded-xl" />
                {/* NAME */}
                <Skeleton className="bg-background h-5 w-20" />
                <Skeleton className="bg-background h-5 w-20 rounded-full" />
              </Skeleton>
            ))
          : playlists?.pages.map((page, i) => (
              page?.map((playlist, index) => (
                <CardPlaylist
                key={index}
                playlist={playlist}
                className={'w-full'}
                ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                />
              ))
            ))
          }
      </div>
    </div>
  );
}
