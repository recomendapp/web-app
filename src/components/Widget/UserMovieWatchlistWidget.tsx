import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

// UI
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/Movie/Card/MovieCard';
import { useLocale } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';

export const UserMovieWatchlistWidget = () => {
  const supabase = useSupabaseClient();
  const { user } = useAuth();

  const locale = useLocale();

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: watchlist,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user', user?.id, 'watchlist', { order: 'random'}],
    queryFn: async ({ pageParam = 1 }) => {
      if (!user?.id || !locale) return;

      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      const { data, error } = await supabase
        .from('user_movie_watchlist_random')
        .select(`
          *,
          movie(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .eq('movie.language', locale)
        .range(from, to)
        // .order('created_at', { ascending: true});
      if (error) throw error;
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!user?.id && !!locale,
  });

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, watchlist, fetchNextPage]);

  if (watchlist === undefined || isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-4 items-center">
          <Skeleton className=" w-52 h-6" />
          <Skeleton className=" w-24 h-6" />
        </div>
        <div className="flex space-x-4 pb-4 overflow-hidden">
          {Array.from({ length: 20 }).map((__, i) => (
            <Skeleton key={i} className="w-36 aspect-[2/3] shrink-0 pb-2" />
          ))}
        </div>
      </div>
    );
  }

  if (watchlist && !watchlist.pages[0]?.length) return null;

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <Link href={'/collection/watchlist'}>
          <h3 className="font-semibold text-xl">À voir</h3>
        </Link>
        <Button variant={'link'} asChild>
          <Link href={'/collection/watchlist'}>Tout afficher</Link>
        </Button>
      </div>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-2">
          {watchlist?.pages.map((page, i) => (
              page?.map(({ movie }, index) => (
              <div
                key={movie?.id}
                className="w-24"
                ref={(i === watchlist.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
              >
                <MovieCard
                  movie={movie}
                  displayMode="grid"
                  fill
                  sizes={`
                    (max-width: 640px) 96px,
                    (max-width: 1024px) 120px,
                    150px
                  `}
                />
              </div>
            ))
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
