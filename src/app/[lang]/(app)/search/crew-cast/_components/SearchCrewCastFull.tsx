'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import { useSupabaseClient } from '@/context/supabase-context';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { useTmdbSearchPersonsInfinite } from '@/features/tmdb/tmdbQueries';
import { useLocale, useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';

export default function SearchCrewCastFull({ query }: { query: string }) {
  const common = useTranslations('common');
  const locale = useLocale();
  const { ref, inView } = useInView();
  const {
    data: persons,
    isLoading,
    fetchNextPage,
    isFetchingNextPage, 
    hasNextPage,
  } = useTmdbSearchPersonsInfinite({
    query: query,
    locale: locale,
  })

  const showSkeleton = persons === undefined || isLoading;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, persons, fetchNextPage]);

  if ((!showSkeleton && !persons) || persons?.pages[0].length == 0) {
    return (
      <p>{upperFirst(common('messages.no_results'))}</p>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 max-h-screen overflow-hidden">
        {Array.from({ length: 20 }).map((item: any) => (
          <div
            key={item}
            className="text-sm flex justify-between p-2 rounded-md"
          >
            <div className="flex items-center gap-2">
              {/* PERSON COVER */}
              <Skeleton className="h-[75px] w-[50px] rounded-md" />
              {/* PERSON NAME */}
               <Skeleton className="h-6 w-32" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-6 w-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {persons?.pages.map((page, i) => (
        page?.map((person, index) => (
            <Link
              key={person?.id}
              href={`/person/${person?.slug ?? person?.id}`}
              className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
              ref={(i === persons.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
            >
              <div className="flex items-center gap-2">
                {/* MOVIE COVER */}
                <div className="shadow-md z-0 relative shrink-0 w-[50px] aspect-[2/3]">
                  <ImageWithFallback
                    src={person?.profile_path ? `https://image.tmdb.org/t/p/original/${person?.profile_path}` : ''}
                    alt={person?.name ?? ''}
                    fill
                    sizes={`
                      (max-width: 640px) 96px,
                      (max-width: 1024px) 120,
                      150px
                    `}
                    className="rounded-md object-cover"
                    type="person"
                  />
                </div>
                {/* MOVIE DATA */}
                <div className="flex flex-col">
                  <Button variant="link" className="w-fit p-0 h-full text-base">
                    {person?.name}
                  </Button>
                </div>
              </div>
              <div className="flex items-center">
                {person?.known_for_department}
              </div>
            </Link>
          ))
      ))}
      {isFetchingNextPage && <Loader />}
    </div>
  );
}
