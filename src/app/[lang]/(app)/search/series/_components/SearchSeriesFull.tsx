'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/Loader/Loader';
import { useLocale, useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { useTmdbSearchSeriesInfinite } from '@/features/tmdb/tmdbQueries';
import { cn } from '@/lib/utils';
import { upperFirst } from 'lodash';

export default function SearchSeriesFull({ query }: { query: string }) {
  const common = useTranslations('common');
  const locale = useLocale();
  const { ref, inView } = useInView();
  const {
    data: series,
    isLoading,
    fetchNextPage,
    isFetchingNextPage, 
    hasNextPage,
  } = useTmdbSearchSeriesInfinite({
    query: query,
    locale: locale,
  })

  const showSkeleton = series === undefined || isLoading;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);


  if ((!showSkeleton && !series) || series?.pages[0].length == 0) {
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

  return (
    <div className="flex flex-col gap-2">
      {series?.pages.map((page, i) => (
        page?.map((serie, index) => (
            <Link
              key={serie?.id}
              href={`/serie/${serie?.slug ?? serie?.id}`}
              className="text-sm flex justify-between p-2 hover:bg-secondary rounded-md"
              {...(i === series.pages.length - 1 && index === page.length - 1
                ? { ref: ref }
                : {})}
            >
              <div className="flex items-center gap-2">
                {/* MOVIE COVER */}
                <div className="w-[50px]">
                  <AspectRatio ratio={2 / 3}>
                    <ImageWithFallback
                      src={serie?.poster_path ? `https://image.tmdb.org/t/p/original/${serie.poster_path}` : ''}
                      alt={serie?.name ?? ''}
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
                    {serie?.name}
                  </p>
                  <Credits
                    credits={serie?.created_by ?? []}
                    className="text-muted-foreground line-clamp-1"
                  />
                </div>
              </div>
              <div className="flex items-center">
                {serie?.first_air_date ? serie.first_air_date.split('-')[0] : 'n/a'}
              </div>
            </Link>
          ))
      ))}
      {isFetchingNextPage && <Loader />}
    </div>
  );
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
