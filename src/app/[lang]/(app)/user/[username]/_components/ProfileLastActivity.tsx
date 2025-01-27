'use client';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Profile } from '@/types/type.db';
import { useUserActivitiesInfiniteQuery } from '@/features/client/user/userQueries';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { CardMedia } from '@/components/card/CardMedia';

export default function ProfileLastActivity({ profile }: { profile: Profile }) {
  const common = useTranslations('common');
  const { ref, inView } = useInView();

  const {
    data: activities,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useUserActivitiesInfiniteQuery({
    userId: profile?.id ?? undefined,
  })

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, activities, fetchNextPage]);

  if (!activities?.pages[0].length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-xl">
      {upperFirst(common('messages.last_activities'))}
      </h3>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-4">
          {activities?.pages.map((page, i) => (
              page?.map((activity, index) => (
                <CardMedia
                key={activity?.id}
                variant='poster'
                ref={(i === activities.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                media={activity?.media!}
                activity={activity}
                className='w-24 lg:w-32'
                />
              ))
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
