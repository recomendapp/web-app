'use client';
import { handleSearchPersons } from '@/lib/tmdb/tmdb';
import Link from 'next/link';
import React, { Fragment, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../../ui/skeleton';
import { ImageWithFallback } from '../../utils/ImageWithFallback';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import { supabase } from '@/lib/supabase/client';

export default function SearchCrewCastFull({ query }: { query: string }) {

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
		data: persons,
		isLoading: loading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['search', 'person', { search: query }],
		queryFn: async ({ pageParam = 1 }) => {
      if (!query) return null;
			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;

			const { data } = await supabase
        .from('tmdb_person')
        .select('*')
        .order('updated_at', { ascending: false})
        .range(from, to)
        .ilike(`name`, `${query}%`);
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
