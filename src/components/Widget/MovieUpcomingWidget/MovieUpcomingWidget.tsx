import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';

// UI
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/Movie/Card/MovieCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import MoviePoster from '../../Movie/MoviePoster';
import { MovieAction } from '../../Movie/Actions/MovieAction';
import { handleUpcomingMovies } from './_actions/handleUpcomingMovies';
import { useAuth } from '@/context/auth-context';

export const MovieUpcomingWidget = () => {

  const { user } = useAuth();

  const locale = useLocale();

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: upcoming,
    isLoading: loading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['films', 'upcoming'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await handleUpcomingMovies(locale, "fr", pageParam);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (results, pages) => {
      return results?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!locale,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (upcoming === undefined || loading) {
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

  if (upcoming && !upcoming.pages.length) return null;

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <Link href={'/films/upcoming'}>
          <h3 className="font-semibold text-xl">À venir </h3>
        </Link>
        <Button variant={'link'} asChild>
          <Link href={'/films/upcoming'}>Tout afficher</Link>
        </Button>
      </div>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-2">
          {upcoming?.pages.map((page, i) => (
            <Fragment key={i}>
              {page?.map((film: any, index) => (
                <div
                  key={film.id}
                  className="w-24"
                  {...(i === upcoming.pages.length - 1 &&
                  index === page.length - 1
                    ? { ref: ref }
                    : {})}
                >
                  <div className="group transition flex gap-4 items-center relative border-2 border-transparent hover:border-accent-1 rounded-md">
                    <Link href={`/film/${film.id}`} className="w-full">
                      <MoviePoster
                        src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                        alt={film.title ?? ''}
                        fill
                        sizes={`
                          (max-width: 640px) 96px,
                          (max-width: 1024px) 120px,
                          150px
                        `}
                      />
                    </Link>
                    {user && <div className="hidden absolute bottom-8 group-hover:lg:flex w-full justify-center pointer-events-none">
                      <div className="bg-background rounded-md w-fit pointer-events-auto">
                        <MovieAction filmId={film.id} watch watchlist dropdown />
                      </div>
                    </div>}
                  </div>
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
