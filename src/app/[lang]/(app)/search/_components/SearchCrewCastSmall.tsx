'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { useTmdbSearchMultiInfinite } from '@/features/client/tmdb/tmdbQueries';
import { cn } from '@/lib/utils';
import { upperFirst } from 'lodash';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { title } from '@/hooks/custom-lodash';

export default function SearchCrewCastSmall({
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

  if ((!showSkeleton && !results) || results?.pages[0].persons.length == 0) return null;

  return (
    <div className={cn('@container/search-widget flex flex-col gap-2', className)}>
      {showSkeleton
        ? <Skeleton className="h-8 w-32" />
        : (
          <Button
          variant={'link'}
          className="text-2xl font-bold justify-start p-0 hover:text-foreground"
          asChild
          >
            <Link href={`/search/crew-cast?q=${query}`}>{title(common('word.cast_and_crew'))}</Link>
          </Button>
        )}
        
      <div className="grid grid-cols-2 gap-2 @sm/search-widget:grid-cols-3 @md/search-widget:grid-cols-4 @lg/search-widget:grid-cols-5 @2xl/search-widget:grid-cols-6 @4xl/search-widget:grid-cols-7">
        {showSkeleton ? (
          Array.from({ length: 4 }).map((item: any) => (
            <div
              key={item}
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
        ) : results?.pages.map((page, index) => (
          page.persons.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              href={`/person/${item.slug ?? item.id}`}
              className="flex flex-col items-center gap-2 hover:bg-muted-hover p-2 rounded-md"
            >
              <div className="w-full shrink-0 relative aspect-square rounded-full overflow-hidden">
                <ImageWithFallback
                  src={
                    'https://image.tmdb.org/t/p/original/' + item.profile_path
                  }
                  alt={item.title}
                  fill
                  sizes={`
                    (max-width: 640px) 96px,
                    (max-width: 1024px) 120,
                    150px
                  `}
                  className="rounded-md object-cover"
                />
              </div>
              <div className='text-left w-full'>
                <p className='line-clamp-2'>
                  {item.name}
                </p>
                <p className="text-muted-foreground line-clamp-1">
                  {item.known_for_department}
                </p>
              </div>
            </Link>
          ))
        ))}
      </div>
    </div>
  )
}