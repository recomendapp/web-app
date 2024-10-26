'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useUserGuidelist } from '@/features/user/userQueries';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import { UserAvatar } from '../User/UserAvatar/UserAvatar';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { CardMovie } from '../card/CardMovie';
import { Button } from '../ui/button';

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
    <Button variant={'link'} className="p-0 w-fit font-semibold text-xl" asChild>
			<Link href={'/collection/guidelist'}>
        Reco par vos amis
			</Link>
		</Button>
    <div className='grid grid-cols-2 @2xl/widget-user-movie-guidelist:grid-cols-3 gap-4'>
      {guidelist.map((item, index) => (
      <CardMovie key={index} movie={item.movie}>
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
      </CardMovie>
      ))}
    </div>
  </div>
  )
};
