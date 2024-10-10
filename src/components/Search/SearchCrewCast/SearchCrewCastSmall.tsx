'use client';
import { handleSearchPersons } from '@/lib/tmdb/tmdb';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useLocale } from 'next-intl';
import toast from 'react-hot-toast';
import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

export default function SearchCrewCastSmall({
  query,
}: {
  query: string | undefined;
}) {
  const numberOfResult = 8;

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
        .from('person')
        .select('*')
        .ilike(`name`, `%${query}%`)
        .order('popularity', { ascending: false})
        .range(from, to)

			return (data);
		},
		initialPageParam: 1,
		getNextPageParam: (data, pages) => {
			return data?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!query
	});


  // useEffect(() => {
  //   if (query) {
  //     setLoading(true);
  //     handleSearchPersons(query, locale, 1)
  //       .then((response) => {
  //         if (response.length) {
  //           setLoading(false);
  //           setResults(response);
  //         } else {
  //           setLoading(false);
  //           setResults(null);
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error("Une erreur s'est produite");
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [query]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-end">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((item: any) => (
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
      </div>
    );
  }

  if (!loading && !persons?.pages[0]?.length) return null;

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold">Crew & Cast</div>
        <Button variant="link" className="p-0 h-full" asChild>
          <Link href={`/search/crew-cast?q=${query}`}>Tout afficher</Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {persons?.pages.map((page, i) => (
          page?.map((person, index) => (
            <Link
              key={person.id}
              href={'/person/' + person.id}
              className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
            >
              <div className="flex items-center gap-2">
                {/* MOVIE COVER */}
                <div className="w-[50px] shrink-0">
                  <AspectRatio ratio={2 / 3}>
                    <ImageWithFallback
                      src={'https://image.tmdb.org/t/p/original/' + person.profile_path}
                      alt={person.name ?? ''}
                      fill
                      sizes={`
                        (max-width: 640px) 96px,
                        (max-width: 1024px) 120px,
                        150px
                      `}
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
                {/* MOVIE DATA */}
                <div className="flex flex-col">
                  <p className="font-bold line-clamp-2 break-all overflow-hidden">
                    {person.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center">{person.known_for_department}</div>
            </Link>
          ))
        ))}
      </div>
    </div>
  );
}

// {results.slice(0, 5).map((item: any) => (
  // <Link
  //   key={item.id}
  //   href={'/person/' + item.id}
  //   className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
  // >
  //   <div className="flex items-center gap-2">
  //     {/* MOVIE COVER */}
  //     <div className="w-[50px] shrink-0">
  //       <AspectRatio ratio={2 / 3}>
  //         <ImageWithFallback
  //           src={'https://image.tmdb.org/t/p/original/' + item.profile_path}
  //           alt={item.name}
  //           fill
  //           className="rounded-md object-cover"
  //         />
  //       </AspectRatio>
  //     </div>
  //     {/* MOVIE DATA */}
  //     <div className="flex flex-col">
  //       <p className="font-bold line-clamp-2 break-all overflow-hidden">
  //         {item.name}
  //       </p>
  //     </div>
  //   </div>
  //   <div className="flex items-center">{item.known_for_department}</div>
  // </Link>
// ))}