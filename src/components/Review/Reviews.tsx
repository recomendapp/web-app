'use client';
import { useEffect } from 'react';
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
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { z } from "zod";
import { useRouter, useSearchParams } from 'next/navigation';
import { useMediaReviewsInfiniteQuery } from '@/features/client/media/mediaQueries';
import { Icons } from '@/config/icons';
import { CardReview } from '@/components/Card/CardReview';
import { MyReviewButton } from '@/components/Review/MyReviewButton';
import { Button } from '../ui/button';
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from 'lucide-react';

const SORT_BY = ["updated_at"] as const;
const DEFAULT_PER_PAGE = 20;
const DEFAULT_SORT_BY = SORT_BY[0];
const DEFAULT_SORT_ORDER = "desc";

const sortBySchema = z.enum(SORT_BY);
const getValidatedSortBy = (order?: string | null): z.infer<typeof sortBySchema> => {
  return sortBySchema.safeParse(order).success ? order! as z.infer<typeof sortBySchema> : DEFAULT_SORT_BY;
};
const orderSchema = z.enum(["asc", "desc"]);
const getValidatedSortOrder = (order?: string | null): z.infer<typeof orderSchema> => {
  return orderSchema.safeParse(order).success ? order! as z.infer<typeof orderSchema> : DEFAULT_SORT_ORDER;
};
const perPageSchema = z.number().int().positive();
const getValidatePerPage = (perPage?: number | null): number => {
  return perPageSchema.safeParse(perPage).success ? perPage! : DEFAULT_PER_PAGE;
}

interface ReviewProps {
  mediaId: number;
}

export default function Reviews({
  mediaId,
} : ReviewProps) {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const sortBy = getValidatedSortBy(searchParams.get('sort_by'));
  const sortOrder = getValidatedSortOrder(searchParams.get('sort_order'));
  const perPage = getValidatePerPage(Number(searchParams.get('per_page')));
  const router = useRouter();
  const { ref, inView } = useInView();
  const {
    data: reviews,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useMediaReviewsInfiniteQuery({
    id: mediaId,
    filters: {
      sortBy: sortBy,
      sortOrder: sortOrder,
      perPage: perPage,
    },
  });

  const handleChange = ({ name, value }: { name: string, value: string }) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);
		router.push(`?${params.toString()}`);
	};

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-col gap-4 justify-between lg:flex-row">
        <MyReviewButton mediaId={mediaId} />
        <div className="flex justify-end gap-2 items-center">
          <Button variant={'ghost'} size={'sm'} onClick={(e) => {
            e.preventDefault();
            handleChange({ name: 'sort_order', value: sortOrder === 'desc' ? 'asc' : 'desc' });
          }}>
            {sortOrder === 'desc' ? <ArrowDownNarrowWideIcon size={20} /> : <ArrowUpNarrowWideIcon size={20} />}
          </Button>
          <Select defaultValue={sortBy} onValueChange={(e) => handleChange({ name: 'sort_by', value: e })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_BY.map((sort) => (
                <SelectItem key={sort} value={sort}>{upperFirst(t(`messages.${sort}`))}</SelectItem>
              ))}
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
              page?.map((review, index) => {
                if (!review) return null;
                return (
                  <CardReview
                  key={review?.id ?? index}
                  review={review}
                  activity={review?.activity}
                  author={review?.activity?.user}
                  ref={(i === reviews.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
                  />
                )
              })
            ))
        ) : (
          <p className="text-muted-foreground text-center font-semibold">{upperFirst(t('messages.no_reviews'))}</p>
        )}
        {isFetchingNextPage ? <Icons.loader /> : null}
      </div>
    </div>
  );
}

