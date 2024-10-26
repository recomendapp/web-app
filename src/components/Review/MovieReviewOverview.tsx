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
import { UserMovieActivity, Review } from '@/types/type.db';
import UserMovieReviewLike from './actions/UserMovieReviewLike';
import { useFormatter, useNow } from 'next-intl';

export default function MovieReviewOverview({
  review,
  className,
}: {
  review: Review;
  className?: string;
}) {
  const now = useNow({
    updateInterval: 1000 * 10
  });
 
  const format = useFormatter();
  if (!review) return null;
  return (
    <Link
      href={`/film/${review?.movie_id}/review/${review?.id}`}
		  // className="flex items-start gap-2 bg-muted rounded-xl p-2"
      className={cn(
        '@container/review flex flex-col bg-muted rounded-xl p-2 w-full gap-2',
        className
      )}
	  >
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
            {review?.comments_count} commentaires
            <span className='mx-1'>•</span>
            Voir l&apos;activité
          </div>
          {/* Actions */}
          <div>
            <UserMovieReviewLike reviewId={review?.id!} />
          </div>
        </div>
      {/* </div> */}
	  </Link>
    // <Link
    //   href={`/film/${review?.movie_id}/review/${review?.id}`}
    //   className={cn(
    //     'w-full bg-muted px-4 py-2 transition rounded-3xl flex flex-col gap-2',
    //     className
    //   )}
    // >
    //   <div className="flex gap-2 justify-between">
    //     <div className="flex gap-2 items-center">
    //       <Rating rating={activity?.rating} is_liked={activity?.is_liked} />
    //       <p className="font-semibold line-clamp-1">{review?.title}</p>
    //     </div>
    //     <div className="flex justify-center items-start">
    //       <MovieReviewSettings review={review} />
    //     </div>
    //   </div>
    //   <div className="flex gap-4 items-center">
    //     <UserCard user={review?.user} />
    //     <div className="text-muted-foreground flex items-center gap-2">
    //       <Heart size={13} className="fill-muted-foreground" />
    //       <span>{review?.likes_count}</span>
    //     </div>
    //   </div>
    //   {/* BODY */}
    //   <div className="overflow-hidden text-sm">
    //     <Overview data={JSON.parse(review?.body ?? '')} />
    //   </div>
    //   <div className="text-right">
    //     <UserMovieReviewLike reviewId={review?.id} />
    //   </div>
    // </Link>
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


// export default function MovieReviewOverview({
//   review,
//   activity,
//   className,
// }: {
//   review: UserMovieReview;
//   activity: UserMovieActivity;
//   className?: string;
// }) {
//   if (!review) return null;
//   return (
//     <Link
//       href={`/film/${review?.movie_id}/review/${review?.id}`}
//       className={cn(
//         'w-full bg-muted px-4 py-2 transition rounded-3xl flex flex-col gap-2',
//         className
//       )}
//     >
//       <div className="flex gap-2 justify-between">
//         <div className="flex gap-2 items-center">
//           <Rating rating={activity?.rating} is_liked={activity?.is_liked} />
//           <p className="font-semibold line-clamp-1">{review?.title}</p>
//         </div>
//         <div className="flex justify-center items-start">
//           <MovieReviewSettings review={review} />
//         </div>
//       </div>
//       <div className="flex gap-4 items-center">
//         <UserCard user={review?.user} />
//         <div className="text-muted-foreground flex items-center gap-2">
//           <Heart size={13} className="fill-muted-foreground" />
//           <span>{review?.likes_count}</span>
//         </div>
//       </div>
//       {/* BODY */}
//       <div className="overflow-hidden text-sm">
//         <Overview data={JSON.parse(review?.body ?? '')} />
//       </div>
//       <div className="text-right">
//         <UserMovieReviewLike reviewId={review?.id} />
//       </div>
//     </Link>
//   );
// }