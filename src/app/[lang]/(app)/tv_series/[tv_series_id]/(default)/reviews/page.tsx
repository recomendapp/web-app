'use client';
import { useEffect, use } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInView } from 'react-intersection-observer';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { z } from "zod";
import { useSearchParams } from 'next/navigation';
import { useMediaReviewsInfiniteQuery } from '@/features/client/media/mediaQueries';
import { Icons } from '@/config/icons';
import { CardReview } from '@/components/Card/CardReview';
import { MyReviewButton } from '@/components/Review/MyReviewButton';

const NUMBER_OF_RESULT = 20;

// Order
const orderSchema = z.enum(["updated_at-desc", "updated_at-asc", "likes_count-desc", "likes_count-asc", "rating-desc", "rating-asc"]);
const getValidatedOrder = (order: string | null): z.infer<typeof orderSchema> => {
  return orderSchema.safeParse(order).success ? order as z.infer<typeof orderSchema> : "updated_at-desc";
};

export default function Reviews(
  props: {
    params: Promise<{
      lang: string;
      tv_series_id: string;
    }>
  }
) {
  const params = use(props.params);
  const { id: serieId } = getIdFromSlug(params.tv_series_id);
  const common = useTranslations('common');
  const searchParams = useSearchParams();
  const order = getValidatedOrder(searchParams.get('order'));
  const { ref, inView } = useInView();
  const {
    data: reviews,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useMediaReviewsInfiniteQuery({
    mediaId: serieId,
    mediaType: 'tv_series',
    filters: {
      resultsPerPage: NUMBER_OF_RESULT,
      order,
    },
  });

  const handleOrderChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('order', value);
    window.history.pushState(null, '', `?${params.toString()}`)
  };

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-col gap-4 justify-between lg:flex-row">
        <MyReviewButton mediaId={serieId} mediaType='tv_series' mediaSlug={params.tv_series_id} />
        <div className="flex flex-1 justify-end gap-2 items-center">
          {upperFirst(common('messages.sort_by'))}
          <Select onValueChange={handleOrderChange} defaultValue={order}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{upperFirst(common('word.date'))}</SelectLabel>
                <SelectItem value={'updated_at-desc'}>{upperFirst(common('messages.most_recent', { count: 2, gender: 'female'}))}</SelectItem>
                <SelectItem value={'updated_at-asc'}>{upperFirst(common('messages.most_old', { count: 2, gender: 'female'}))}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full max-w-xl'>
        {/* ALL */}
        {(isLoading || reviews === undefined) ? (
          <Icons.loader />
        ) : reviews?.pages[0]?.length ? (
            reviews?.pages.map((page, i) => (
              page?.map((review, index) => (
                <CardReview
                key={review?.id ?? index}
                review={review}
                ref={(i === reviews.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                />
              ))
            ))
        ) : (
          <p className="text-muted-foreground text-center font-semibold">{upperFirst(common('messages.no_reviews'))}</p>
        )}
        {isFetchingNextPage ? <Icons.loader /> : null}
      </div>
    </div>
  );
}

