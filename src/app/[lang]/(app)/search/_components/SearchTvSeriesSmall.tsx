'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { useTmdbSearchMultiInfinite } from '@/features/client/tmdb/tmdbQueries';
import { cn } from '@/lib/utils';
import { upperFirst } from 'lodash';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';

export default function SearchTvSeriesSmall({
  query,
  className,
}: {
  query: string | undefined;
  className?: string;
}) {
  const common = useTranslations('common');
  const locale = useLocale();
  const {
    data: results,
    isLoading
  } = useTmdbSearchMultiInfinite({
    query: query,
    locale: locale,
  });
  const showSkeleton = results === undefined || isLoading;

  if ((!showSkeleton && !results) || results?.pages[0].tv_series.length == 0) return null;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {showSkeleton
        ? <Skeleton className="h-8 w-32" />
        : (
          <Button
          variant={'link'}
          className="text-2xl font-bold justify-start p-0 hover:text-foreground"
          asChild
          >
            <Link href={`/search/tv_series?q=${query}`}>{upperFirst(common('messages.serie', { count: 2}))}</Link>
          </Button>
        )}
      <div className="flex flex-col gap-2">
        {showSkeleton ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="text-sm flex justify-between p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-[75px] w-[50px] rounded-md" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
              <div className="flex items-center">
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          ))
        ) : results?.pages.map((page) => (
          page.tv_series.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="text-sm flex justify-between p-2 rounded-md hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                {/* MOVIE COVER */}
                <div className="w-[50px] shrink-0">
                  <AspectRatio ratio={2 / 3}>
                    <ImageWithFallback
                      src={
                        'https://image.tmdb.org/t/p/original/' + item.poster_path
                      }
                      alt={item.name}
                      fill
                      sizes={`
                        (max-width: 640px) 96px,
                        (max-width: 1024px) 120,
                        150px
                      `}
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
                {/* MOVIE DATA */}
                <div className="flex flex-col">
                  <p className="font-bold line-clamp-2 break-all overflow-hidden">
                    {item.name}
                  </p>
                  <Credits
                    credits={item.created_by}
                    className="text-muted-foreground line-clamp-1"
                  />
                </div>
              </div>
              <div className="flex items-center">
                {item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'n/a'}
              </div>
            </Link>
          ))
        ))}
      </div>
    </div>
  )
}

const Credits = ({
  credits,
  className,
}: {
  credits: any[];
  className?: string;
}) => {
  if (!credits || credits.length === 0) return null;
  return (
    <p className={cn('line-clamp-2', className)}>
      {credits?.map((credit: any, index: number) => (
        <span key={credit.id}>
          <Button
            variant={'link'}
            className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition"
            asChild
          >
            <Link href={`/person/${credit.id}`}>
              {credit.name}
            </Link>
          </Button>
          {index !== credits.length - 1 && (
            <span className='text-muted-foreground'>, </span>
          )}
        </span>
      ))}
    </p>
  )
}
