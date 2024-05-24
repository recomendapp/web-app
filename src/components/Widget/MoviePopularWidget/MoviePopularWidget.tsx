import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';

// UI
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { handleMoviesNowPlaying } from '@/lib/tmdb/tmdb';
import { useLocale } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import MoviePoster from '../../Movie/MoviePoster';
import { MovieAction } from '../../Movie/Actions/MovieAction';
import { useAuth } from '@/context/auth-context';

export const MoviePopularWidget = () => {

  const { user } = useAuth();

  const locale = useLocale();

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: nowPlaying,
    isLoading: loading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['films', 'now-playing'],
    queryFn: ({ pageParam = 1 }) =>
      handleMoviesNowPlaying(locale, locale, pageParam),
    initialPageParam: 1,
    getNextPageParam: (results, pages) => {
      return results?.length == numberOfResult ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (nowPlaying === undefined || loading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-4 items-center">
          <Skeleton className=" w-52 h-6" />
          <Skeleton className=" w-24 h-6" />
        </div>
        <div className="flex space-x-4 pb-4 overflow-hidden">
          {Array.from({ length: 50 }).map((__, i) => (
            <Skeleton key={i} className="w-24 aspect-[2/3] shrink-0 pb-2" />
          ))}
        </div>
      </div>
    );
  }

  if (nowPlaying && !nowPlaying.pages.length) return null;

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <Link href={'/films/now-playing'}>
          <h3 className="font-semibold text-xl">À l&apos;affiche </h3>
        </Link>
        <Button variant={'link'} asChild>
          <Link href={'/films/now-playing'}>Tout afficher</Link>
        </Button>
      </div>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-2">
          {nowPlaying?.pages.map((page, i) => (
            <Fragment key={i}>
              {page?.map((film: any, index) => (
                <div
                  key={film.id}
                  className="w-36"
                  {...(i === nowPlaying.pages.length - 1 &&
                  index === page.length - 1
                    ? { ref: ref }
                    : {})}
                >
                  {user && <div className="group transition flex gap-4 items-center relative border-2 border-transparent hover:border-accent-1 rounded-md">
                    <Link href={`/film/${film.id}`} className="w-full">
                    <MoviePoster
                      poster_path={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                      alt={film.title ?? ''}
                    />
                    </Link>
                    <div className="hidden absolute bottom-8 group-hover:lg:flex w-full justify-center pointer-events-none">
                      <div className="bg-background rounded-md w-fit pointer-events-auto">
                        <MovieAction filmId={film.id} watch watchlist dropdown />
                      </div>
                    </div>
                 	</div>}
                  {/* <MovieCard filmId={film.id} displayMode="grid" /> */}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
