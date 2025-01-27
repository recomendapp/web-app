'use client';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { CardMedia } from '@/components/card/CardMedia';
import { useMediaPersonMostRatedInfiniteQuery } from '@/features/client/media/mediaQueries';

interface WidgetPersonMostRatedProps extends React.HTMLAttributes<HTMLDivElement> {
	personId: number;
}

export function WidgetPersonMostRated({
	personId
} : WidgetPersonMostRatedProps) {
  const common = useTranslations('common');
  const { ref, inView } = useInView();

  const {
    data: activities,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useMediaPersonMostRatedInfiniteQuery({
    personId: personId,
  })

  useEffect(() => {
    if (inView && hasNextPage)
      fetchNextPage();
   }, [inView, hasNextPage, activities, fetchNextPage]);

  if (!activities?.pages[0].length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-xl">
      {upperFirst(common('messages.known_for'))}
      </h3>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-4">
          {activities?.pages.map((page, i) => (
              page?.map((credit, index) => (
                <CardMedia
                key={credit.media_id}
                variant='poster'
                ref={(i === activities.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                media={credit.media!}
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
