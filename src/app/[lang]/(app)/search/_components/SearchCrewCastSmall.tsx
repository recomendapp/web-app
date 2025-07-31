import { Link } from "@/lib/i18n/routing";
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Media } from '@/types/type.db';
import { getTranslations } from 'next-intl/server';
import { title } from '@/utils/custom-lodash';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';

export default async function SearchCrewCastSmall({
  medias,
  query,
  locale,
  className,
}: {
  medias?: Media[];
  query: string;
  locale: string;
  className?: string;
}) {
  const common = await getTranslations({ locale: locale, namespace: 'common' });
  if (!medias || medias.length === 0) return null;
  return (
    <div className={cn('@container/search-widget flex flex-col gap-2', className)}>
      <Button
      variant={'link'}
      className="text-2xl font-bold justify-start p-0"
      asChild
      >
        <Link href={`/search/crew-cast?q=${query}`}>{title(common('messages.cast_and_crew'))}</Link>
      </Button>
      <div className="grid grid-cols-2 gap-2 @sm/search-widget:grid-cols-3 @md/search-widget:grid-cols-4 @lg/search-widget:grid-cols-5 @2xl/search-widget:grid-cols-6 @4xl/search-widget:grid-cols-7">
      {medias.slice(0, 5).map((media, index) => (
        <Link
          key={index}
          href={media?.url ?? ''}
          className="flex flex-col items-center gap-2 hover:bg-muted-hover p-2 rounded-md"
        >
          <div className="w-full shrink-0 relative aspect-square rounded-full overflow-hidden">
            <ImageWithFallback
              src={media?.avatar_url ?? ''}
              alt={media?.title ?? ''}
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
              {media?.title}
            </p>
            {"known_for_department" in media.extra_data && media.extra_data.known_for_department && (
              <p className="text-muted-foreground line-clamp-1">
                {title(media.extra_data.known_for_department)}
              </p>
            )}
          </div>
        </Link>
      ))}
      </div>
    </div>
  )
}