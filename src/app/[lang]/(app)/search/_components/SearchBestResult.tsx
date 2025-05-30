import { Link } from "@/lib/i18n/routing";
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { Card } from '@/components/ui/card';
import { getMediaDetails } from '@/hooks/get-media-details';
import { BadgeMedia } from '@/components/Badge/BadgeMedia';
import { Media, MediaPerson } from '@/types/type.db';
import { upperFirst } from 'lodash';
import { getTranslations } from 'next-intl/server';

export default async function SearchBestResult({
  media,
  locale,
  className,
}: {
  media: Media;
  locale: string;
  className?: string;
}) {
  const common = await getTranslations({ locale: locale, namespace: 'common' });

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <h2 className="text-2xl font-bold">
      {upperFirst(common('messages.top_result'))}
      </h2>
      <Link href={media.url ?? ''}>
        <Card className='flex flex-col gap-2 relative p-2 hover:bg-muted-hover'>
          <BadgeMedia type={media.media_type} variant={"accent-yellow"} className='absolute top-2 right-2' />
          <div
          className={`relative w-[100px] shrink-0 overflow-hidden
            ${getMediaDetails(media).poster_className}
          `}
          >
            <ImageWithFallback
              src={media.avatar_url ?? ''}
              alt={media.title ?? ''}
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-2xl font-bold line-clamp-2 break-all overflow-hidden">
              {media.title}
            </p>
            {media.media_type === 'person' ? (
              <p className="line-clamp-2 text-muted-foreground">
                {"known_for_department" in media.extra_data && media.extra_data.known_for_department}
              </p>
            ) : null}
            {media.main_credit ? (
              <Credits
                credits={media.main_credit ?? []}
              />
            ) : null}
            {(media.media_type === 'movie' || media.media_type === 'tv_series') ? (
                <p className="text-muted-foreground">
                  {new Date(media.date ?? '').getFullYear()}
                </p>
            ) : null}
          </div>
        </Card>
      </Link>
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
              {credit.title}
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
