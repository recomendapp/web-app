'use client';
import { handleSearchMovies, handleSearchPersons } from '@/lib/tmdb/tmdb';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../../ui/skeleton';
import { ImageWithFallback } from '../../utils/ImageWithFallback';
import { AspectRatio } from '../../ui/aspect-ratio';
import { useInfiniteQuery } from 'react-query';
import { useAuth } from '@/context/AuthContext/auth-context';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import { useLocale } from 'next-intl';

export default function SearchCrewCastFull({ query }: { query: string }) {
  const { user } = useAuth();

  const locale = useLocale();

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: persons,
    isLoading: loading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', query, 'persons'],
    queryFn: ({ pageParam = 1 }) =>
      handleSearchPersons(query, locale, pageParam),
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

  if (!loading && !persons) {
    return <div>Aucun résultat.</div>;
  }

  console.log(persons);
  return (
    <div className="flex flex-col gap-2">
      {persons?.pages.map((page, i) => (
        <Fragment key={i}>
          {page?.map((person: any, index) => (
            <Link
              key={person.id}
              href={'/person/' + person.id}
              className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
              {...(i === persons.pages.length - 1 && index === page.length - 1
                ? { ref: ref }
                : {})}
            >
              <div className="flex items-center gap-2">
                {/* MOVIE COVER */}
                <div className="shadow-md z-0 relative shrink-0 w-[50px] aspect-[2/3]">
                  <ImageWithFallback
                    src={
                      'https://image.tmdb.org/t/p/w500/' + person.profile_path
                    }
                    alt={person.name}
                    fill
                    className="rounded-md object-cover"
                    type="person"
                  />
                </div>
                {/* MOVIE DATA */}
                <div className="flex flex-col">
                  <Button variant="link" className="w-fit p-0 h-full text-base">
                    {person.name}
                  </Button>
                </div>
              </div>
              <div className="flex items-center">
                {person.known_for_department}
              </div>
            </Link>
          ))}
        </Fragment>
      ))}
      {isFetchingNextPage && <Loader />}
    </div>
  );
}
