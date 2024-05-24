'use client';
import { handleSearchMovies } from '@/lib/tmdb/tmdb';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Film } from 'lucide-react';

export default function SearchUser({
  onClick,
}: {
  onClick: (filmid: number) => void;
}) {
  const { user } = useAuth();

  const [query, setQuery] = useState('');

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: films,
    isLoading: loading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', query, 'films'],
    queryFn: ({ pageParam = 1 }) =>
      handleSearchMovies(query, user?.language, pageParam),
    initialPageParam: 1,
    getNextPageParam: (results, pages) => {
      return results?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!query,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Chercher un film"
      />
      {!loading && !films ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <Film />
        </div>
      ) : (
        <ScrollArea className="pr-4">
          {loading ? (
            <div className="flex flex-col gap-2 max-h-screen overflow-hidden">
              {Array.from({ length: 20 }).map((item: any) => (
                <div
                  key={item}
                  className="text-sm flex justify-between p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    {/* MOVIE COVER */}
                    <Skeleton className="h-[75px] w-[50px] rounded-md" />
                    {/* MOVIE DATA */}
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              ))}
            </div>
          ) : !loading && !films?.pages[0].length && query ? (
            <div>Aucun résultat.</div>
          ) : (
            <div className="flex flex-col gap-2">
              {films?.pages.map((page, i) => (
                <Fragment key={i}>
                  {page?.map((film: any, index) => (
                    <Button
                      variant={'ghost'}
                      key={film.id}
                      className="h-full text-sm flex justify-between p-2 !hover:bg-muted rounded-md"
                      {...(i === films.pages.length - 1 &&
                      index === page.length - 1
                        ? { ref: ref }
                        : {})}
                      onClick={() => onClick(film.id)}
                    >
                      <div className="flex items-center gap-2">
                        {/* MOVIE COVER */}
                        <div className="w-[50px]">
                          <AspectRatio ratio={2 / 3}>
                            <ImageWithFallback
                              src={
                                'https://image.tmdb.org/t/p/original/' +
                                film.poster_path
                              }
                              alt={film.title}
                              fill
                              className="rounded-md object-cover"
                            />
                          </AspectRatio>
                        </div>
                        {/* MOVIE DATA */}
                        <div className="flex flex-col text-left">
                          <Button
                            variant="link"
                            className="w-fit p-0 h-full text-base"
                          >
                            {film.title}
                          </Button>
                          <div>
                            {film.credits.directors.length ? (
                              film.credits.directors.map(
                                (director: any, index: number) => (
                                  <span key={director.id}>
                                    <Button
                                      variant="link"
                                      className="w-fit p-0 h-full text-accent-1 font-normal italic"
                                      asChild
                                    >
                                      <Link href={`/person/${director.id}`}>
                                        {director.name}
                                      </Link>
                                    </Button>
                                    {index !==
                                      film.credits.directors.length - 1 && (
                                      <span>, </span>
                                    )}
                                  </span>
                                )
                              )
                            ) : (
                              <span className="w-fit p-0 h-full text-accent-1 font-normal italic">
                                Unknown
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {film.release_date
                          ? film.release_date.split('-')[0]
                          : 'n/a'}
                      </div>
                    </Button>
                  ))}
                </Fragment>
              ))}
              {isFetchingNextPage && <Loader />}
            </div>
          )}
          <ScrollBar />
        </ScrollArea>
      )}
    </>
  );
}
