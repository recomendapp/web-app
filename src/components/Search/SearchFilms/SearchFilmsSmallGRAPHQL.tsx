'use client';
import { handleSearchMovies } from '@/lib/tmdb/tmdb';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Badge } from '../../ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../../ui/skeleton';
import { ImageWithFallback } from '../../utils/ImageWithFallback';
import { AspectRatio } from '../../ui/aspect-ratio';
import { useLocale } from 'next-intl';

// GRAPHQL
import { useQuery } from '@apollo/client';
import SEARCH_MOVIES from '@/graphql/Search/SearchMovies';
import { SearchMoviesQuery } from '@/graphql/__generated__/graphql';

export default function SearchFilmsSmall({
  query,
}: {
  query: string | undefined;
}) {

  const locale = useLocale();

  const numberOfResult = 5;

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


  // useEffect(() => {
  //   if (query) {
  //     setLoading(true);
  //     handleSearchMovies(query, locale, 1)
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

  if (!loading && !movies?.length) {
    return null;
  }

  return (
    <div className=" w-full grid grid-cols-1 @4xl:grid-cols-2 gap-2">
      {/* MEILLEUR RESULTAT */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div className="text-2xl font-bold">Meilleur résultat</div>
        </div>
        <Link
          key={movies![0].node.movie.id}
          href={'/film/' + movies![0].node.movie.id}
          className="flex flex-col @md:flex-row relative bg-secondary h-full hover:bg-secondary-hover rounded-md p-2 gap-2"
        >
          <Badge className="z-[1] absolute top-4 right-4 shadow-2xl">
            Film
          </Badge>
          {/* MOVIE COVER */}
          <div className="w-full @sm:w-[250px] shrink-0">
            <AspectRatio ratio={2 / 3}>
              <ImageWithFallback
                src={movies![0].node.movie.data?.edges[0].node.poster_path ? `https://image.tmdb.org/t/p/original/${movies![0].node.movie.data?.edges[0].node.poster_path}` : ''}
                alt={movies![0].node.movie.data?.edges[0].node.title ?? ''}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>

          {/* NAME */}
          <div className="flex flex-col justify-end">
            {/* MOVIE TITLE */}
            <div className="text-2xl font-bold line-clamp-2 break-all overflow-hidden">
              {movies![0].node.movie.data?.edges[0].node.title ?? ''}
            </div>
            {/* MOVIE DIRECTOR */}
            <div className="line-clamp-2">
              {movies![0].node.movie.directors?.edges.length! > 0 ? (
                movies![0].node.movie.directors?.edges.map(
                  ({ node }, index: number) => (
                    <span key={node.id}>
                      <Link
                        href={`/person/${node.person.id}`}
                        className="w-fit p-0 h-full text-accent-1 font-normal italic hover:underline underline-offset-4"
                      >
                        {node.person.name}
                      </Link>
                      {index !== movies![0].node.movie.directors?.edges.length! - 1 && (
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
        </Link>
      </div>
      {/* MOVIE RESULTS */}
      {movies?.length! > 1 && (
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between items-end">
            <div className="text-2xl font-bold">Films</div>
            <Button variant="link" className="p-0 h-full" asChild>
              <Link href={`/search/films?q=${query}`}>Tout afficher</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {movies?.slice(1, 5).map(({ node }) => (
              <Link
                key={node.id}
                href={'/film/' + node.movie.id}
                className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
              >
                <div className="flex items-center gap-2">
                  {/* MOVIE COVER */}
                  <div className="w-[50px] shrink-0">
                    <AspectRatio ratio={2 / 3}>
                      <ImageWithFallback
                        src={node.movie.data?.edges[0].node.poster_path ? `https://image.tmdb.org/t/p/original/${node.movie.data?.edges[0].node.poster_path}` : ''}
                        alt={node.movie.data?.edges[0].node.title ?? ''}
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                  {/* MOVIE DATA */}
                  <div className="flex flex-col">
                    <p className="font-bold line-clamp-2 break-all overflow-hidden">
                      {node.movie.data?.edges[0].node.title}
                    </p>
                    <div className="line-clamp-2">
                      {node.movie.directors?.edges.length! > 0 ? (
                        node.movie.directors?.edges.map(
                          ({ node: director }, index: number) => (
                            <span key={director.id}>
                              <Link
                                href={`/person/${director.person.id}`}
                                className="w-fit p-0 h-full text-accent-1 font-normal italic hover:underline underline-offset-4"
                              >
                                {director.person.name}
                              </Link>
                              {index !== node.movie.directors?.edges.length! - 1 && (
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
          </div>
        </div>
      )}
    </div>
  );
}
