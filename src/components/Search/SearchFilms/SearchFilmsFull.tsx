'use client';
import { handleSearchMovies } from '@/lib/tmdb/tmdb';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../../ui/skeleton';
import { ImageWithFallback } from '../../tools/ImageWithFallback';
import { AspectRatio } from '../../ui/aspect-ratio';
import { useInfiniteQuery } from 'react-query';
import { useAuth } from '@/context/AuthContext/auth-context';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';

export default function SearchFilmsFull({
  query,
}: {
  query: string;
}) {
  const { user } = useAuth();

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
    queryFn: ({pageParam = 1}) => handleSearchMovies(query, user?.language, pageParam),
    getNextPageParam: (results, pages) => {
        return results?.length == numberOfResult ? pages.length + 1 : undefined  
    },
    enabled: !!query,
  });

useEffect(() => {
  if (inView && hasNextPage) {
    fetchNextPage();
  }
}, [inView, hasNextPage, fetchNextPage])

  if (loading) {
    return (
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
    );
  }

  if (!loading && !films) {
    return (
      <div>
        Aucun résultat.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {films?.pages.map((page, i) => (
        <Fragment key={i}>
          {page?.map((film: any, index) => (
            <Link
              key={film.id}
              href={'/film/' + film.id}
              className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
              {...(i === films.pages.length - 1 && index === page.length - 1
                ? { ref: ref }
                : {})}
            >
              <div className="flex items-center gap-2">
                {/* MOVIE COVER */}
                <div className="w-[50px]">
                  <AspectRatio ratio={2 / 3}>
                    <ImageWithFallback
                      src={
                        'https://image.tmdb.org/t/p/w500/' + film.poster_path
                      }
                      alt={film.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
                {/* MOVIE DATA */}
                <div className="flex flex-col">
                  <Button variant="link" className="w-fit p-0 h-full text-base">
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
                            {index !== film.credits.directors.length - 1 && (
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
                {film.release_date ? film.release_date.split('-')[0] : 'n/a'}
              </div>
            </Link>
          ))}
        </Fragment>
      ))}
      {isFetchingNextPage &&
        <Loader />
      }
    </div>
  );
}
