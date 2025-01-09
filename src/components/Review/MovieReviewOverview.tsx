'use client';

import Link from 'next/link';
// UI
import UserCard from '@/components/User/UserCard/UserCard';
// TYPES
import { JSONContent } from '@tiptap/react';
// UI
import { cn } from '@/lib/utils';
import Rating from './ActivityIcon';
import { Review } from '@/types/type.db';
import UserMovieReviewLike from './actions/UserMovieReviewLike';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { Card } from '../ui/card';
import { upperFirst } from 'lodash';

export default function MovieReviewOverview({
  review,
  className,
}: {
  review: Review;
  className?: string;
}) {
  const common = useTranslations('common');
  const now = useNow({ updateInterval: 1000 * 10 });
  const format = useFormatter();
  if (!review) return null;
  return (
    <Link href={`/film/${review?.movie_id}/review/${review?.id}`}>
      <Card className={cn('@container/review flex flex-col gap-2 p-2 hover:bg-muted-hover', className)}>
        {/* HEADER */}
        <div className='w-full flex justify-between gap-2'>
          <div className="flex gap-2 items-center w-full">
            <Rating movieId={review.movie_id!} rating={review.rating} is_liked={review.is_liked} />
            <p className="font-semibold line-clamp-1">{review?.title}</p>
          </div>
          <div className="hidden @md/review:flex justify-center items-center shrink-0">
            <div className='text-sm text-muted-foreground'>
              {format.relativeTime(new Date(review.created_at ?? ''), now)}
            </div>
            {/* <MovieReviewSettings review={review} /> */}
          </div>
        </div>
        <UserCard user={review.user} />
        {/* BODY */}
        <div className="overflow-hidden text-sm">
          <Overview data={JSON.parse(review?.body ?? '')} />
        </div>
        {/* ACTIVITY */}
        <div className='flex justify-between items-center'>
          {/* Comments */}
          <div className='text-sm text-muted-foreground'>
            {common('messages.comment_count', { count: review?.comments_count })}
            <span className='mx-1'>•</span>
            {upperFirst(common('messages.view_activity'))}
          </div>
          {/* Actions */}
          <div>
            <UserMovieReviewLike reviewId={review?.id!} />
          </div>
        </div>
      </Card>
	  </Link>
  );
}

export function Overview({ data }: { data: JSONContent }) {
  const text = data?.content
    ?.filter((paragraph) => paragraph?.content)
    ?.flatMap(
      (paragraph) => paragraph?.content?.map((item) => item.text).join('')
    )
    .join('\n');

  return (
    <div className=" whitespace-pre-line text-justify">
      <p className="line-clamp-3">{text}</p>
    </div>
  );
}
