'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../../ui/skeleton';
import { ImageWithFallback } from '../../utils/ImageWithFallback';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';

// GRAPHQL
import { useQuery } from '@apollo/client';
import SEARCH_PERSONS from '@/graphql/Search/SearchPersons';
import { SearchPersonsQuery } from '@/graphql/__generated__/graphql';

export default function SearchCrewCastFull({ query }: { query: string }) {

  const { ref, inView } = useInView();

  const numberOfResult = 20;

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

  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          sfilter: {
            name: { iregex: query },
          },
          first: numberOfResult,
          after: pageInfo?.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            tmdb_personCollection: {
              ...previousResult.tmdb_personCollection!,
              edges: [
                ...previousResult.tmdb_personCollection!.edges,
                ...fetchMoreResult.tmdb_personCollection!.edges,
              ],
              pageInfo: fetchMoreResult.tmdb_personCollection!.pageInfo,
            },
          };
        },
      });
    }
  }, [fetchMore, inView, pageInfo, query]);

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
      {persons?.map(({ node }, index) => (
        <Link
          key={node.id}
          href={'/person/' + node.id}
          className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
          ref={index === persons.length - 1 ? ref : undefined}
        >
          <div className="flex items-center gap-2">
            {/* MOVIE COVER */}
            <div className="shadow-md z-0 relative shrink-0 w-[50px] aspect-[2/3]">
              <ImageWithFallback
                src={
                  'https://image.tmdb.org/t/p/w500/' + node.profile_path
                }
                alt={node.name ?? 'Unknown'}
                fill
                className="rounded-md object-cover"
                type="person"
              />
            </div>
            {/* MOVIE DATA */}
            <div className="flex flex-col">
              <Button variant="link" className="w-fit p-0 h-full text-base">
                {node.name}
              </Button>
            </div>
          </div>
          <div className="flex items-center">
            {node.known_for_department}
          </div>
        </Link>
      ))}
      {loading && <Loader />}
    </div>
  );
}
