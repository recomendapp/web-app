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
import { Card } from '@/components/ui/card';
import { getMediaDetails } from '@/hooks/get-media-details';
import { BadgeMedia } from '@/components/badge/BadgeMedia';

export default function SearchBestResult({
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

  if ((!showSkeleton && !results) || !results?.pages[0].best_result) return null;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="text-2xl font-bold">
        {showSkeleton ? <Skeleton className="h-8 w-32" /> : upperFirst(common('messages.top_result'))}
      </div>
      <div className="flex flex-col gap-2">
        {showSkeleton ? (
          <>
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
          </>
        ) : (
          <Link
            href={getMediaDetails(results.pages[0].best_result).url}
          >
            <Card className='flex flex-col gap-2 relative p-2 hover:bg-muted-hover'>
              <BadgeMedia type={results.pages[0].best_result?.media_type} variant={"accent-1"} className='absolute top-2 right-2' />
              <div
              className={`relative w-[100px] shrink-0 overflow-hidden
                ${getMediaDetails(results.pages[0].best_result).poster_className}
              `}
              >
                <ImageWithFallback
                  src={`https://image.tmdb.org/t/p/original/${getMediaDetails(results.pages[0].best_result).poster_path}`}
                  alt={getMediaDetails(results.pages[0].best_result).title ?? ''}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-2xl font-bold line-clamp-2 break-all overflow-hidden">
                  {getMediaDetails(results.pages[0].best_result).title}
                </p>
                {results.pages[0].best_result.media_type === 'person'
                  ? (
                    <p className="line-clamp-2 text-muted-foreground">
                      {results.pages[0].best_result.known_for_department}
                    </p>
                  )
                  : (
                    <Credits
                      credits={getMediaDetails(results.pages[0].best_result).mainCredits ?? []}
                    />
                  )
                }
                {results.pages[0].best_result.media_type === 'movie'
                  ? (
                    <p className="text-muted-foreground">
                      {new Date(results.pages[0].best_result.release_date).getFullYear()}
                    </p>
                  ) : results.pages[0].best_result.media_type === 'tv_series'
                  ? (
                    <p className="text-muted-foreground">
                      {new Date(results.pages[0].best_result.first_air_date).getFullYear()}
                    </p>
                  ) : null
                }
              </div>
            </Card>
          </Link>
        )}
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
