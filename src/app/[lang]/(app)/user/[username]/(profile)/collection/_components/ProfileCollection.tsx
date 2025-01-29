'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import Loader from '@/components/Loader/Loader';
import { useInView } from 'react-intersection-observer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserActivitiesInfiniteQuery } from '@/features/client/user/userQueries';
import { CardMedia } from '@/components/Cards/CardMedia';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';
import { z } from "zod";

// Display
const displaySchema = z.enum(["grid", "row"]);
const getValidatedDisplay = (display: string | null): z.infer<typeof displaySchema> => {
  return displaySchema.safeParse(display).success ? display as z.infer<typeof displaySchema> : "grid";
};

// Order
const orderSchema = z.enum(["watched_date-desc", "watched_date-asc"]);
const getValidatedOrder = (order: string | null): z.infer<typeof orderSchema> => {
  return orderSchema.safeParse(order).success ? order as z.infer<typeof orderSchema> : "watched_date-desc";
};

export default function ProfileCollection({
  userId
} : {
  userId: string,
}) {
  const common = useTranslations('common');
  const searchParams = useSearchParams();
  const display = getValidatedDisplay(searchParams.get('display'));
  const order = getValidatedOrder(searchParams.get('order'));
  const { ref, inView } = useInView();
  const {
    data: activities,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useUserActivitiesInfiniteQuery({
    userId: userId,
    filters: {
      order: order,
    }
  })

  const handleDisplayChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('display', display === 'grid' ? 'row' : 'grid');
    window.history.pushState(null, '', `?${params.toString()}`)
  };

  const handleOrderChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('order', value);
    window.history.pushState(null, '', `?${params.toString()}`)
  };

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, activities, fetchNextPage]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <div className='flex items-center gap-2'>
          <p className='text-muted-foreground'>Filters</p>
          <Badge variant={'accent-1'}>{upperFirst(common('word.soon'))}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={handleOrderChange} defaultValue={order}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Vus</SelectLabel>
                <SelectItem value={'watched_date-desc'}>Plus récents</SelectItem>
                <SelectItem value={'watched_date-asc'}>Plus anciens</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Notes</SelectLabel>
                <SelectItem value={'rating-desc'}>
                  Notes décroissantes
                </SelectItem>
                <SelectItem value={'rating-asc'}>Notes croissantes</SelectItem>
              </SelectGroup>
              <SelectSeparator />
            </SelectContent>
          </Select>
          <Button variant={'ghost'} onClick={handleDisplayChange}>
            {display == 'grid' ? <LayoutGrid /> : <List />}
          </Button>
        </div>
      </div>
      {isLoading || activities == undefined ? (
        <div className="flex items-center h-full">
          <Loader />
        </div>
      ) : !isLoading && activities?.pages[0].length ? (
        <div
          className={` gap-2
              ${
                display == 'row'
                  ? 'flex flex-col'
                  : 'grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 2xl:grid-cols-10'
              }
          `}
        >
          {activities.pages.map((page, i) => (
            page?.map((activity, index) => (
              <CardMedia
              key={activity?.id}
              ref={(i === activities.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
              variant={display === 'grid' ? 'poster' : 'row'}
              media={activity?.media!}
              activity={activity}
              className='w-full'
              />
            ))
          ))}
          {isFetchingNextPage && (
            <Loader/>
          )}
        </div>
      ) : (
        <p className="text-center font-semibold">Aucune activité.</p>
      )}
    </div>
  );
}
