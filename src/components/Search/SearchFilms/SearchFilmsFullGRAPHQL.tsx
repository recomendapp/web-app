'use client';
import { handleSearchMovies } from '@/lib/tmdb/tmdb';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../../ui/skeleton';
import { ImageWithFallback } from '../../utils/ImageWithFallback';
import { AspectRatio } from '../../ui/aspect-ratio';
import { useAuth } from '@/context/auth-context';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import { useLocale } from 'next-intl';

// GRAPHQL
import { useQuery } from '@apollo/client';
import SEARCH_MOVIES from '@/graphql/Search/SearchMovies';
import { SearchMoviesQuery } from '@/graphql/__generated__/graphql';

export default function SearchFilmsFull({ query }: { query: string }) {
  const { user } = useAuth();

  const locale = useLocale();

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: searchMoviesQuery,
    loading,
    fetchMore,
  } = useQuery<SearchMoviesQuery>(SEARCH_MOVIES, {
    variables: {
      filter: {
        title: { iregex: query },
      },
      first: numberOfResult,
      locale: locale,
    },
    skip: !query || !locale,
  });
  const movies = searchMoviesQuery?.tmdb_movie_translationCollection?.edges;
  const pageInfo = searchMoviesQuery?.tmdb_movie_translationCollection?.pageInfo;

  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          filter: {
            title: { iregex: query },
          },
          first: numberOfResult,
          after: pageInfo?.endCursor,
          locale: locale,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            tmdb_movie_translationCollection: {
              ...previousResult.tmdb_movie_translationCollection!,
              edges: [
                ...previousResult.tmdb_movie_translationCollection!.edges,
                ...fetchMoreResult.tmdb_movie_translationCollection!.edges,
              ],
              pageInfo: fetchMoreResult.tmdb_movie_translationCollection!.pageInfo,
            },
          };
        },
      });
    }
  }, [fetchMore, inView, locale, pageInfo, query]);
  // const {
  //   data: films,
  //   isLoading: loading,
  //   fetchNextPage,
  //   isFetchingNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ['search', query, 'films'],
  //   queryFn: ({ pageParam = 1 }) =>
  //     handleSearchMovies(query, locale, pageParam),
  //   getNextPageParam: (results, pages) => {
  //     return results?.length == numberOfResult ? pages.length + 1 : undefined;
  //   },
  //   enabled: !!query,
  // });

  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, fetchNextPage]);

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

  if (!loading && !movies) {
    return <div>Aucun résultat.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {movies?.map(({ node }, index) => (
        <Link
          key={node.id}
          href={'/film/' + node.id}
          className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
          ref={index === movies.length - 1 ? ref : undefined}
        >
          <div className="flex items-center gap-2">
            {/* MOVIE COVER */}
            <div className="w-[50px]">
              <AspectRatio ratio={2 / 3}>
                <ImageWithFallback
                  src={
                    'https://image.tmdb.org/t/p/original/' + node.movie.data?.edges[0].node.poster_path ?? ''
                  }
                  alt={node.movie.data?.edges[0].node.title ?? ''}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            {/* MOVIE DATA */}
            <div className="flex flex-col">
              <Button variant="link" className="w-fit p-0 h-full text-base">
                {node.movie.data?.edges[0].node.title ?? ''}
              </Button>
              <div>
                {node.movie.directors?.edges.length! > 0 ? (
                  node.movie.directors?.edges.map(
                    ({ node: person }, index: number) => (
                      <span key={person.id}>
                        <Button
                          variant="link"
                          className="w-fit p-0 h-full text-accent-1 font-normal italic"
                          asChild
                        >
                          <Link href={`/person/${person.person.id}`}>
                            {person.person.name ?? 'Unknown'}
                          </Link>
                        </Button>
                        {index !== node.movie.directors!.edges.length - 1 && (
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
            {node.movie.release_date ? node.movie.release_date.split('-')[0] : 'n/a'}
          </div>
        </Link>
      ))}
      {loading && <Loader />}
    </div>
  );
}
