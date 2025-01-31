'use client';

import { Button } from '@/components/ui/button';
import { Media, MediaPerson } from '@/types/type.db';
import { useAuth } from '@/context/auth-context';
import { useUserActivityQuery } from '@/features/client/user/userQueries';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import ReviewForm from '@/components/Review/ReviewForm';

export default function CreateReviewForm({
	media
}: {
	media: Media;
}) {
  const { user } = useAuth();

  const {
    data: activity,
    isLoading,
    isError,
  } = useUserActivityQuery({
    userId: user?.id,
    mediaId: media.media_id!,
  })

  return (
    <div className="@container/review">
      <div className="flex flex-col @3xl/review:flex-row gap-4 p-2">
        {/* MEDIA */}
        <Link className='shrink-0' href={media.url ?? ''}>
          <Card
          className={`
            flex items-center rounded-xl bg-muted hover:bg-muted-hover p-1 h-20
            @3xl/review:flex-col @3xl/review:items-start @3xl/review:h-fit
          `}
          >
            <div
            className={'relative h-full shrink-0 rounded-md overflow-hidden @3xl/review:w-56 aspect-[2/3]'}
            >
              <ImageWithFallback
              src={media.avatar_url ?? ''}
              alt={media.title ?? ''}
              fill
              className="object-cover"
              type="movie"
              sizes={`
              (max-width: 640px) 96px,
              (max-width: 1024px) 120px,
              150px
              `}
              />
            </div>
            <div className='px-2 py-1 space-y-1'>
              <h3 className='text-xl font-semibold line-clamp-2 break-words'>{media?.title}</h3>
              {media.main_credit ? <Credits credits={media.main_credit ?? []} /> : null}
            </div>
          </Card>
        </Link>
        <ReviewForm
        mediaId={media.media_id!}
        media={media}
        activity={activity}
        />
      </div>
    </div>
  );
}

const Credits = ({
  credits,
  className,
}: {
  credits: MediaPerson[];
  className?: string;
}) => {
  if (!credits || credits.length === 0) return null;
  return (
    <p className={cn('line-clamp-2', className)}>
      {credits?.map((credit, index: number) => (
        <span key={index}>
          <Button
            variant={'link'}
            className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition"
            asChild
          >
            <Link href={credit.url ?? ''}>
              {credit.title}
            </Link>
          </Button>
          {index !== credits.length - 1 && (
            <span className='text-muted-foreground'>, </span>
          )}
        </span>
      ))}
    </p>
  )
}
