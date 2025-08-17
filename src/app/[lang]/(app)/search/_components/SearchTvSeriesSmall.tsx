import { Link } from "@/lib/i18n/routing";
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { upperFirst } from 'lodash';
import { MediaTvSeries } from '@/types/type.db';
import { getTranslations } from 'next-intl/server';
import { CardTvSeries } from "@/components/Card/CardTvSeries";

export default async function SearchTvSeriesSmall({
  tvSeries,
  query,
  locale,
  className,
}: {
  tvSeries?: MediaTvSeries[];
  query: string;
  locale: string;
  className?: string;
}) {
  const common = await getTranslations({ locale: locale, namespace: 'common' });
  if (!tvSeries || tvSeries.length === 0) return null;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Button
      variant={'link'}
      className="text-2xl font-bold justify-start p-0"
      asChild
      >
    <Link href={`/search/tv_series?q=${query}`}>{upperFirst(common('messages.tv_series', { count: 2}))}</Link>
      </Button>
      <div className="flex flex-col gap-2">
      {tvSeries.slice(0, 4).map((item, i) => (
        <CardTvSeries
        key={i}
        variant='row'
        tvSeries={item}
        className='border-none bg-transparent'
        posterClassName='w-[50px]'
        />
      ))}
      </div>
    </div>
  )
}