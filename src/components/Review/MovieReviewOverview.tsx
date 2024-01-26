'use client';

import Link from 'next/link';

// UI
import UserCard from '@/components/User/UserCard/UserCard';

// ICONS
import { Heart } from 'lucide-react';
// TYPES
import { JSONContent } from '@tiptap/react';

// UI
import { MovieReviewSettings } from './MovieReviewSettings';
import { cn } from '@/lib/utils';
import Rating from './ActivityIcon';
import type {
  UserMovieActivityFragment,
  UserMovieReviewFragment,
} from '@/graphql/__generated__/graphql';

export default function MovieReviewOverview({
  review,
  activity,
  className,
}: {
  review: UserMovieReviewFragment;
  activity: UserMovieActivityFragment;
  className?: string;
}) {
  return (
    <Link
      href={`/film/${review.movie_id}/review/${review.id}`}
      className={cn(
        'w-full bg-muted px-4 py-2 transition rounded-3xl flex flex-col gap-2',
        className
      )}
    >
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2 items-center">
          <Rating rating={activity.rating} is_liked={activity.is_liked} />
          <p className="font-semibold line-clamp-1">{review.title}</p>
        </div>
        <div className="flex justify-center items-start">
          <MovieReviewSettings review={review} />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <UserCard user={review.user} />
        <div className="text-muted-foreground flex items-center gap-2">
          <Heart size={13} className="fill-muted-foreground" />
          <span>{review.likes_count}</span>
        </div>
      </div>
      {/* BODY */}
      <div className="overflow-hidden text-sm">
        <Overview data={JSON.parse(review.body)} />
      </div>
      <div className="text-right">ACTION</div>
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
