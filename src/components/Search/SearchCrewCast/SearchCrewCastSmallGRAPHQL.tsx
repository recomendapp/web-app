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

// GRAPHQL
import { useQuery } from '@apollo/client';
import SEARCH_PERSONS from '@/graphql/Search/SearchPersons';
import { SearchPersonsQuery } from '@/graphql/__generated__/graphql';

export default function SearchCrewCastSmall({
  query,
}: {
  query: string | undefined;
}) {

  const numberOfResult = 5;

  const {
    data: searchPersonsQuery,
    loading,
    fetchMore,
  } = useQuery<SearchPersonsQuery>(SEARCH_PERSONS, {
    variables: {
      filter: {
        name: { iregex: query },
      },
      first: numberOfResult,
    },
    skip: !query,
  });
  const persons = searchPersonsQuery?.tmdb_personCollection?.edges;
  const pageInfo = searchPersonsQuery?.tmdb_personCollection?.pageInfo;
  // const [loading, setLoading] = useState(true);
  // const [results, setResults] = useState<any>(null);
  // const locale = useLocale();

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
      <div className=" w-full grid grid-cols-1 @lg:grid-cols-2 gap-4">
        {/* MEILLEUR RESULTAT */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex bg-secondary h-full rounded-md p-2 gap-2">
            {/* MOVIE COVER */}
            <Skeleton className="bg-background w-[200px] h-full rounded-md" />

            {/* NAME */}
            <div className="flex flex-col justify-end">
              {/* MOVIE TITLE */}
              <Skeleton className="bg-background h-10 w-40" />
            </div>
          </div>
        </div>
        {/* MOVIE RESULTS */}
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
        </div>
      </div>
    );
  }

  if (!loading && !persons?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold">Crew & Cast</div>
        <Button variant="link" className="p-0 h-full" asChild>
          <Link href={`/search/crew-cast?q=${query}`}>Tout afficher</Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {persons?.map(({ node }) => (
          <Link
            key={node.id}
            href={'/person/' + node.id}
            className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
          >
            <div className="flex items-center gap-2">
              {/* MOVIE COVER */}
              <div className="w-[50px] shrink-0">
                <AspectRatio ratio={2 / 3}>
                  <ImageWithFallback
                    src={'https://image.tmdb.org/t/p/original/' + node.profile_path}
                    alt={node.name ?? ''}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
              {/* MOVIE DATA */}
              <div className="flex flex-col">
                <p className="font-bold line-clamp-2 break-all overflow-hidden">
                  {node.name}
                </p>
              </div>
            </div>
            <div className="flex items-center">{node.known_for_department}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
