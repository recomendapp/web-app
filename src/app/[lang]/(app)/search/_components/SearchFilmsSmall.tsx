import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { upperFirst } from 'lodash';
import { Media } from '@/types/type.db';
import { getTranslations } from 'next-intl/server';
import { CardMedia } from '@/components/Card/CardMedia';

export default async function SearchFilmsSmall({
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
    <div className={cn('flex flex-col gap-2', className)}>
      <Button
      variant={'link'}
      className="text-2xl font-bold justify-start p-0"
      asChild
      >
        <Link href={`/search/films?q=${query}`}>{upperFirst(common('word.film', { count: 2}))}</Link>
      </Button>
      <div className="flex flex-col gap-2">
      {medias.slice(0, 4).map((media, i) => (
        <CardMedia
        key={i}
        variant='row'
        media={media}
        className='border-none bg-transparent'
        posterClassName='w-[50px]'
        />
      ))}
      </div>
    </div>
  )
}