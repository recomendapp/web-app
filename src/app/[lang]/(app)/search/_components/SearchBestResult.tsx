'use client'
import { Link } from "@/lib/i18n/navigation";
import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { Card } from '@/components/ui/card';
import { BadgeMedia } from '@/components/Badge/BadgeMedia';
import { MediaPerson } from '@recomendapp/types';
import { upperFirst } from 'lodash';
import { MultiResult } from "@/lib/tmdb/tmdbQueries";
import { getMediaDetails } from "@/utils/get-media-details";
import { useTranslations } from "next-intl";
import { getTmdbImage } from "@/lib/tmdb/getTmdbImage";

export default function SearchBestResult({
  result,
  className,
}: {
  result: MultiResult | null;
  className?: string;
}) {
  const t = useTranslations();
  const details = useMemo(() => {
		switch (result?.type) {
			case 'movie':
				return getMediaDetails({ type: 'movie', media: result.media });
			case 'tv_series':
				return getMediaDetails({ type: 'tv_series', media: result.media });
			default:
				return null;
		}
	}, [result]);
  if (!result) return null;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <h2 className="text-2xl font-bold">
      {upperFirst(t('common.messages.top_result'))}
      </h2>
      <>
        <Link href={result.media.url ?? ''}>
          <Card className='flex flex-col gap-2 relative p-2 hover:bg-muted-hover'>
            <BadgeMedia type={result.type} variant={"accent-yellow"} className='absolute top-2 right-2' />
            <div
            className={`relative w-[100px] shrink-0 overflow-hidden
              ${result.type === 'person' ? 'aspect-square rounded-full' : 'aspect-2/3'}
            `}
            >
              <ImageWithFallback
              src={getTmdbImage({ path: details?.imagePath, size: 'w342' })}
              alt={details?.title ?? ''}
              layout="fill"
              objectFit="cover"
              className="object-cover"
              />
            </div>
            <div>
              <p className="text-2xl font-bold line-clamp-2 break-all overflow-hidden">
                {details?.title}
              </p>
              {result.type === 'person' && result.media.known_for_department ? (
                <p className="line-clamp-2 text-muted-foreground">
                 {result.media.known_for_department}
                </p>
              ) : null}
              {result.type === 'movie' && <Credits credits={result.media.directors ?? []} />}
              {result.type === 'tv_series' && <Credits credits={result.media.created_by ?? []} />}
              {details?.date ? (
                  <p className="text-muted-foreground">
                    {new Date(details.date).getFullYear()}
                  </p>
              ) : null}
            </div>
          </Card>
        </Link>
      </>
    </div>
  )
}

const Credits = ({
  credits,
  className,
}: {
  credits: MediaPerson[];
  className?: string;
}) => {
  if (!credits || credits.length === 0) return null;
  return (
    <p className={cn('line-clamp-2', className)}>
      {credits?.map((credit, index: number) => (
        <span key={index}>
          <Button
            variant={'link'}
            className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-yellow transition"
            asChild
          >
            <Link href={credit.url ?? ''}>
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
