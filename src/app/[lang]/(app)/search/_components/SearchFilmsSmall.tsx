import { Link } from "@/lib/i18n/routing";
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { upperFirst } from 'lodash';
import { MediaMovie } from '@/types/type.db';
import { getTranslations } from 'next-intl/server';
import { CardMovie } from "@/components/Card/CardMovie";

export default async function SearchFilmsSmall({
  movies,
  query,
  locale,
  className,
}: {
  movies?: MediaMovie[];
  query: string;
  locale: string;
  className?: string;
}) {
  const common = await getTranslations({ locale: locale, namespace: 'common' });
  if (!movies || movies.length === 0) return null;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Button
      variant={'link'}
      className="text-2xl font-bold justify-start p-0"
      asChild
      >
        <Link href={`/search/films?q=${query}`}>{upperFirst(common('messages.film', { count: 2}))}</Link>
      </Button>
      <div className="flex flex-col gap-2">
      {movies.slice(0, 4).map((movie, i) => (
        <CardMovie
        key={i}
        variant='row'
        movie={movie}
        className='border-none bg-transparent'
        posterClassName='w-[50px]'
        />
      ))}
      </div>
    </div>
  )
}