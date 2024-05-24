'use client';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../../ui/skeleton';
import { ImageWithFallback } from '../../utils/ImageWithFallback';
import { AspectRatio } from '../../ui/aspect-ratio';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import { useLocale } from 'next-intl';
import { handleSearchMovies } from './_actions/handleSearchMovies';
import { supabase } from '@/lib/supabase/client';

export default function SearchFilmsFull({ query }: { query: string }) {
  const { user } = useAuth();

  const locale = useLocale();

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const {
    data: films,
    isLoading: loading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', 'movie', { search: query }],
    queryFn: async ({ pageParam = 1 }) => {
      if (!query) return null;
      const data = await handleSearchMovies(query, locale, pageParam);
			// let from = (pageParam - 1) * numberOfResult;
			// let to = from - 1 + numberOfResult;
      // const { data, error } = await supabase
      //   .from('tmdb_movie')
      //   .select(`
      //     *,
      //     data:tmdb_movie_translation!inner(*)
      //   `)
      //   .ilike(`data.title`, `%${query}%`)
      //   .eq('data.language_id', locale)
      //   .eq('directors.job', 'Director')
      //   .order('popularity', { ascending: false})
      //   .range(from, to)
      //   .explain({analyze:true,verbose:true});
      // console.log(data, error);
      return data;
    },
      // handleSearchMovies(query, locale, pageParam),
      // if (!query) return null;
			// let from = (pageParam - 1) * numberOfResult;
			// let to = from - 1 + numberOfResult;

      // const { data } = await supabase
      //   .from('tmdb_movie')
      //   .select(`
      //     *,
      //     data: tmdb_movie_translation!inner(*),
      //     directors:tmdb_movie_credits(
      //       id,
      //       person:tmdb_person(*)
      //     )
      //   `)
      //   .ilike(`original_title`, `%${query}%`)
      //   .eq('data.language_id', locale)
      //   .eq('directors.job', 'Director')
      //   .order('popularity', { ascending: false})
      //   .range(from, to)

			// const { data } = await supabase
      //   .from('tmdb_movie')
      //   .select(`
      //     *,
      //     data:tmdb_movie_translation!inner(*)
      //   `)
      //   .ilike(`tmdb_movie_translation.title`, `%${query}%`)
      //   // .eq('data.language_id', locale)
      //   // .eq('directors.job', 'Director')
      //   .order('popularity', { ascending: false})
      //   .range(from, to)
		// 	return (data);
    // },
    initialPageParam: 1,
    getNextPageParam: (results, pages) => {
      return results?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!query && !!locale,
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

  if (!loading && !films) {
    return <div>Aucun résultat.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {films?.pages.map((page, i) => (
        <Fragment key={i}>
          {page?.map((film: any, index: number) => (
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
                        'https://image.tmdb.org/t/p/original/' + film.poster_path
                      }
                      alt={film.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
                {/* MOVIE DATA */}
                <div className="flex flex-col">
                  <p className="font-bold line-clamp-2 break-all overflow-hidden">
                    {film.title}
                  </p>
                  <div>
                    {film.directors.length ? (
                      film.directors.map(
                        (director: any, index: number) => (
                          <span key={director.id}>
                            <Button
                              variant="link"
                              className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition"
                              asChild
                            >
                              <Link href={`/person/${director.id}`}>
                                {director.name}
                              </Link>
                            </Button>
                            {index !== film.directors.length - 1 && (
                              <span>, </span>
                            )}
                          </span>
                        )
                      )
                    ) : (
                      <span className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition">
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
      {isFetchingNextPage && <Loader />}
    </div>
  );
}
