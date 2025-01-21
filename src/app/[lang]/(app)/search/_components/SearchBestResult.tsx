'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { useTmdbSearchMultiInfinite } from '@/features/tmdb/tmdbQueries';
import { cn } from '@/lib/utils';
import { upperFirst } from 'lodash';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { count } from 'console';

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
            href={
              results.pages[0].best_result?.media_type === 'movie'
                ? `/film/${results.pages[0].best_result.slug ?? results.pages[0].best_result.id}`
                : results.pages[0].best_result?.media_type === 'tv_serie'
                ? `/serie/${results.pages[0].best_result.slug ?? results.pages[0].best_result.id}`
                : results.pages[0].best_result?.media_type === 'person'
                ? `/person/${results.pages[0].best_result.slug ?? results.pages[0].best_result.id}`
                : ''
            }
          >
            <Card className='flex flex-col gap-2 relative p-2 hover:bg-muted-hover'>
              <Badge variant={"accent-1"} className='absolute top-2 right-2'>
                {results.pages[0].best_result?.media_type === 'movie'
                  ? common('word.film', { count: 1 })
                  : results.pages[0].best_result?.media_type === 'tv_serie'
                  ? common('messages.serie', { count: 1 })
                  : results.pages[0].best_result?.media_type === 'person'
                  ? common('word.cast_and_crew')
                  : ''
                }
              </Badge>
              <div
              className={`relative w-[100px] shrink-0 overflow-hidden
                ${results.pages[0].best_result.media_type === 'movie'
                  ? 'aspect-[2/3] rounded-md'
                  : results.pages[0].best_result.media_type === 'tv_serie'
                  ? 'aspect-[2/3] rounded-md'
                  : results.pages[0].best_result.media_type === 'person'
                  ? 'aspect-[1/1] rounded-full'
                  : ''}
              `}
              >
                <ImageWithFallback
                  src={`https://image.tmdb.org/t/p/original/${
                    results.pages[0].best_result.media_type === 'movie'
                      ? results.pages[0].best_result.poster_path
                      : results.pages[0].best_result.media_type === 'tv_serie'
                      ? results.pages[0].best_result.poster_path
                      : results.pages[0].best_result.media_type === 'person'
                      ? results.pages[0].best_result.profile_path
                      : ''
                    }
                  `}
                  alt={
                      results.pages[0].best_result.media_type === 'movie'
                      ? results.pages[0].best_result.title
                      : results.pages[0].best_result.media_type === 'tv_serie'
                      ? results.pages[0].best_result.name
                      : results.pages[0].best_result.media_type === 'person'
                      ? results.pages[0].best_result.name
                      : ''
                  }
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-2xl font-bold line-clamp-2 break-all overflow-hidden">
                  {results.pages[0].best_result.media_type === 'movie'
                    ? results.pages[0].best_result.title
                    : results.pages[0].best_result.media_type === 'tv_serie'
                    ? results.pages[0].best_result.name
                    : results.pages[0].best_result.media_type === 'person'
                    ? results.pages[0].best_result.name
                    : ''
                  }
                </p>
                {results.pages[0].best_result.media_type === 'person'
                  ? (
                    <p className="line-clamp-2 text-muted-foreground">
                      {results.pages[0].best_result.known_for_department}
                    </p>
                  )
                  : (
                    <Credits
                      credits={results.pages[0].best_result.media_type === 'movie'
                        ? results.pages[0].best_result.directors
                        : results.pages[0].best_result.media_type === 'tv_serie'
                        ? results.pages[0].best_result.created_by
                        : []
                      }
                    />
                  )
                }
                {results.pages[0].best_result.media_type === 'movie'
                  ? (
                    <p className="text-muted-foreground">
                      {new Date(results.pages[0].best_result.release_date).getFullYear()}
                    </p>
                  ) : results.pages[0].best_result.media_type === 'tv_serie'
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
