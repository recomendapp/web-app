'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useUserGuidelist } from '@/features/user/userQueries';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import { UserAvatar } from '../User/UserAvatar/UserAvatar';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

interface WidgetUserMovieGuidelistProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetUserMovieGuidelist = ({
  className,
} : WidgetUserMovieGuidelistProps) => {
  const { user } = useAuth();

  const { data: guidelist } = useUserGuidelist({
    userId: user?.id,
    filters: {
      order: 'random',
      limit: 6,
    }
  })

  const sendersShow = 3;

  if (!user) return null;

  if (!guidelist) return (null);

  return (
  <div className={cn('@container/widget-user-movie-guidelist space-y-4', className)}>
    <Link href={'/collection/guidelist'}>
        <h3 className="font-semibold text-xl">Reco par vos amis</h3>
    </Link>
    <div className='grid grid-cols-2 @xl/widget-user-movie-guidelist:grid-cols-2 @2xl/widget-user-movie-guidelist:grid-cols-3 gap-4'>
      {guidelist.map((item, index) => (
      <Link key={index} href={`/film/${item.movie?.id}`}>
        <Card className='flex items-center rounded-xl overflow-hidden h-20 bg-muted-hover hover:bg-muted'>
          <div className='relative h-full shrink-0' style={{ aspectRatio: '2 / 3' }}>
            <ImageWithFallback
                src={item.movie?.poster_path ? `https://image.tmdb.org/t/p/original/${item.movie.poster_path}` : ''}
                alt={item.movie?.title ?? ''}
                fill
                className="object-cover"
                type="playlist"
                sizes={`
                  (max-width: 640px) 96px,
                  (max-width: 1024px) 120px,
                  150px
                `}
              />
          </div>
          <div className='px-2 py-1 space-y-1'>
            <p className='line-clamp-1 break-words'>{item.movie?.title}</p>
            <div className="flex -space-x-2 overflow-hidden">
              {/* LIMIT TO 3 */}
              {item.senders?.slice(0, sendersShow).map(({user}:any, index) => (
              <UserAvatar
                key={index}
                avatar_url={user?.avatar_url ?? ''}
                username={user?.username ?? ''}
              />
              ))}
              {item.senders?.length! > sendersShow ? (
                <div className='h-8 w-8 flex items-center justify-center bg-black/60 rounded-full border text-xs text-muted-foreground'>
                  +{item.senders?.length! - sendersShow}
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </Link>
      ))}
    </div>
  </div>
  )
};
