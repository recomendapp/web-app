'use client';

import { Button } from '@/components/ui/button';
import { MediaType, Person, UserActivity } from '@/types/type.db';
import { useAuth } from '@/context/auth-context';
import { useUserActivityQuery } from '@/features/client/user/userQueries';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import ReviewForm from '@/components/review/ReviewForm';
import { getMediaUrl } from '@/hooks/get-media-details';

export default function CreateReviewForm({
  media,
}: {
  media: {
    id: number;
    media_type: MediaType;
    poster_path: string | null;
    title: string | null;
    credits?: Person[];
    slug?: string | null;
  }
}) {
  const { user } = useAuth();

  const {
    data: activity,
    isLoading,
    isError,
  } = useUserActivityQuery({
    userId: user?.id,
    mediaId: media.id,
    mediaType: media.media_type,
  })

  return (
    <div className="@container/review">
      <div className="flex flex-col @3xl/review:flex-row gap-4 p-2">
        {/* MEDIA */}
        <Link className='shrink-0' href={getMediaUrl({ id: media.id, type: media.media_type, slug: media.slug })}>
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
              src={media?.poster_path ? `https://image.tmdb.org/t/p/original/${media.poster_path}` : ''}
              alt={media?.title ?? ''}
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
              {media.credits ? <Credits credits={media.credits ?? []} /> : null}
            </div>
          </Card>
        </Link>
        <ReviewForm mediaId={media.id} mediaType={media.media_type} activity={activity as UserActivity} />
      </div>
    </div>
  );
}

const Credits = ({
	credits,
	className,
  }: {
	credits: any[];
	className?: string;
  }) => {
	if (!credits || credits.length === 0) return null;
	return (
	  <p className={cn('line-clamp-1', className)}>
		{credits?.map((credit: any, index: number) => (
		  <span key={credit.id}>
			<Button
			  variant={'link'}
			  className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition"
			  asChild
			>
			  <Link href={`/person/${credit.id}`}>
				{credit.name}
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