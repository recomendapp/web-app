'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import { UserAvatar } from '../User/UserAvatar/UserAvatar';
import { Card } from '../ui/card';
import { useUserWatchlist } from '@/features/user/userQueries';
import { cn } from '@/lib/utils';

interface WidgetUserMovieWatchlistProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetUserMovieWatchlist = ({
  className,
} : WidgetUserMovieWatchlistProps) => {
  const { user } = useAuth();

  const { data: watchlist } = useUserWatchlist({
    userId: user?.id,
    filters: {
      order: 'random',
      limit: 6,
    }
  })

  if (!user) return null;

  if (!watchlist) return (null);

  return (
  <div className={cn('@container/widget-user-movie-watchlist space-y-4', className)}>
    <Link href={'/collection/guidelist'}>
        <h3 className="font-semibold text-xl">À voir</h3>
    </Link>
    <div className='grid grid-cols-2 @xl/widget-user-movie-watchlist:grid-cols-2 @2xl/widget-user-movie-watchlist:grid-cols-3 gap-4'>
      {watchlist.map((item, index) => (
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
          </div>
        </Card>
      </Link>
      ))}
    </div>
  </div>
  )
};
