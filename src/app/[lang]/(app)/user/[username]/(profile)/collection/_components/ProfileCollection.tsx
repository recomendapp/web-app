'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon, LayoutGrid, List } from 'lucide-react';
import Loader from '@/components/Loader';
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
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';
import { z } from "zod";
import { CardMovie } from '@/components/Card/CardMovie';
import { MediaMovie, MediaTvSeries, UserActivityMovie, UserActivityTvSeries } from '@recomendapp/types/dist';
import { CardTvSeries } from '@/components/Card/CardTvSeries';

const DISPLAY = ["grid", "row"] as const;
const SORT_BY = ["watched_date", "rating"] as const;
const DEFAULT_DISPLAY = "grid";
const DEFAULT_SORT_BY = "watched_date";
const DEFAULT_SORT_ORDER = "desc";

// Display
const displaySchema = z.enum(DISPLAY);
const getValidatedDisplay = (display: string | null): z.infer<typeof displaySchema> => {
  return displaySchema.safeParse(display).success ? display as z.infer<typeof displaySchema> : DEFAULT_DISPLAY;
};

// SORT BY
const sortBySchema = z.enum(SORT_BY);
const getValidatedSortBy = (order?: string | null): z.infer<typeof sortBySchema> => {
  return sortBySchema.safeParse(order).success ? order! as z.infer<typeof sortBySchema> : DEFAULT_SORT_BY;
};

// SORT ORDER
const sortOrderSchema = z.enum(["asc", "desc"]);
const getValidatedSortOrder = (order?: string | null): z.infer<typeof sortOrderSchema> => {
  return sortOrderSchema.safeParse(order).success ? order! as z.infer<typeof sortOrderSchema> : DEFAULT_SORT_ORDER;
}

export default function ProfileCollection({
  userId
} : {
  userId: string,
}) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const display = getValidatedDisplay(searchParams.get('display'));
  const sortBy = getValidatedSortBy(searchParams.get('sort_by'));
  const sortOrder = getValidatedSortOrder(searchParams.get('sort_order'));
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
      sortBy: sortBy,
      sortOrder: sortOrder,
    }
  })

  const handleChange = ({ name, value }: { name: string, value: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    window.history.pushState(null, '', `?${params.toString()}`)
  };

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, activities, fetchNextPage]);

  return (
    <div className="@container/profile-collection flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <div className='flex items-center gap-2'>
          <p className='text-muted-foreground'>Filters</p>
          <Badge variant={'accent-yellow'}>{upperFirst(t('common.messages.soon'))}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={'ghost'} size={'sm'} onClick={(e) => {
            e.preventDefault();
            handleChange({ name: 'sort_order', value: sortOrder === 'desc' ? 'asc' : 'desc' });
          }}>
            {sortOrder === 'desc' ? <ArrowDownNarrowWideIcon size={20} /> : <ArrowUpNarrowWideIcon size={20} />}
          </Button>
          <Select onValueChange={(e) => handleChange({ name: 'sort_by', value: e })} defaultValue={sortBy}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value={'watched_date'}>{upperFirst(t('common.messages.watched_date'))}</SelectItem>
              <SelectItem value={'rating'}>{upperFirst(t('common.messages.rating'))}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={'ghost'} onClick={(e) => handleChange({ name: 'display', value: display === 'grid' ? 'row' : 'grid' })}>
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
                  : 'grid grid-cols-2 @xs/profile-collection:grid-cols-3 @md/profile-collection:grid-cols-4 @xl/profile-collection:grid-cols-5 @3xl/profile-collection:grid-cols-6 @5xl/profile-collection:grid-cols-7 @7xl/profile-collection:grid-cols-9'
              }
          `}
        >
          {activities.pages.map((page, i) => (
            page?.map((activity, index) => (
              activity.type === 'movie' ? (
                <CardMovie
                ref={(i === activities.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                key={index}
                variant={display === 'grid' ? 'poster' : 'row'}
                movie={activity.media as MediaMovie}
                profileActivity={{
                  ...activity,
                  movie_id: activity.media_id!
                } as UserActivityMovie}
                className='w-full'
                />
              ) : (
                <CardTvSeries
                ref={(i === activities.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                key={index}
                variant={display === 'grid' ? 'poster' : 'row'}
                tvSeries={activity.media as MediaTvSeries}
                profileActivity={{
                  ...activity,
                  tv_series_id: activity.media_id!
                } as UserActivityTvSeries}
                className='w-full'
                />
              )
            ))
          ))}
          {isFetchingNextPage && (
            <Loader/>
          )}
        </div>
      ) : (
        <p className="text-center font-semibold">{upperFirst(t('common.messages.no_activity'))}</p>
      )}
    </div>
  );
}
