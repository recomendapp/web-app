'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useUserGuidelist } from '@/features/user/userQueries';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import { UserAvatar } from '../User/UserAvatar/UserAvatar';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { MovieCard } from '../Movie/MovieCard';

export const WidgetUserMovieGuidelist = ({
  className,
} : React.HTMLAttributes<HTMLDivElement>) => {
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

  if (!guidelist || !guidelist.length) return null;

  return (
  <div className={cn('@container/widget-user-movie-guidelist space-y-4', className)}>
    <Link href={'/collection/guidelist'}>
        <h3 className="font-semibold text-xl">Reco par vos amis</h3>
    </Link>
    <div className='grid grid-cols-2 @2xl/widget-user-movie-guidelist:grid-cols-3 gap-4'>
      {guidelist.map((item, index) => (
      <Link key={index} href={`/film/${item.movie?.slug ?? item.movie_id}`}>
        <MovieCard movie={item.movie}>
          <div className="flex -space-x-2 overflow-hidden">
            {item.senders?.slice(0, sendersShow).map(({user}:any, index) => (
            <UserAvatar
              key={index}
              avatar_url={user?.avatar_url ?? ''}
              username={user?.username ?? ''}
              className='w-4 h-4'
            />
            ))}
            {item.senders?.length! > sendersShow ? (
              <div className='h-4 w-4 flex items-center justify-center bg-black/60 rounded-full border text-xs text-muted-foreground'>
                +{item.senders?.length! - sendersShow}
              </div>
            ) : null}
          </div>
        </MovieCard>
      </Link>
      ))}
    </div>
  </div>
  )
};
