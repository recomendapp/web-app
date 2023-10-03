'use client';
import { handleSearchMovies } from '@/hooks/tmdb';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Badge } from '../../../ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../../../ui/skeleton';
import { ImageWithFallback } from '../../../elements/Tools/ImageWithFallback';
import { AspectRatio } from '../../../ui/aspect-ratio';

export default function SearchFilmsFull({
  query,
}: {
  query: string | undefined;
}) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      handleSearchMovies(query, 'fr', 1)
        .then((response) => {
          if (response.length) {
            setLoading(false);
            setResults(response);
          } else {
            setLoading(false);
            setResults(null);
          }
        })
        .catch((error) => {
          console.log('error:', error);
        });
    }
  }, [query]);

  if (loading) {
    return (
      <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
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

  if (!loading && !results) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {results.map((item: any) => (
        <Link
          key={item.id}
          href={'/film/' + item.id}
          className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
        >
          <div className="flex items-center gap-2">
            {/* MOVIE COVER */}
            <div className="w-[50px]">
              <AspectRatio ratio={2 / 3}>
                <ImageWithFallback
                  src={
                    'https://image.tmdb.org/t/p/w500/' + item.poster_path
                  }
                  alt={item.title}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            {/* MOVIE DATA */}
            <div className="flex flex-col">
              <Button variant="link" className="w-fit p-0 h-full text-base">
                {item.title}
              </Button>
              <div>
                {item.credits.directors.length ? (
                  item.credits.directors.map(
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
                        {index !== item.credits.directors.length - 1 && (
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
            {item.release_date ? item.release_date.split('-')[0] : 'n/a'}
          </div>
        </Link>
      ))}
    </div>
  );
}
