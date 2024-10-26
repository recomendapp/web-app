'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useUserWatchlist } from '@/features/user/userQueries';
import { cn } from '@/lib/utils';
import { CardMovie } from '../card/CardMovie';
import { Button } from '../ui/button';

export const WidgetUserMovieWatchlist = ({
  className,
} : React.HTMLAttributes<HTMLDivElement>) => {
  const { user } = useAuth();

  const { data: watchlist } = useUserWatchlist({
    userId: user?.id,
    filters: {
      order: 'random',
      limit: 6,
    }
  })

  if (!user) return null;

  if (!watchlist || !watchlist.length) return (null);

  return (
  <div className={cn('@container/widget-user-movie-watchlist space-y-4', className)}>
    <Button variant={'link'} className="p-0 w-fit font-semibold text-xl" asChild>
			<Link href={'/collection/watchlist'}>
        À voir
			</Link>
		</Button>
    <div className='grid grid-cols-2 @2xl/widget-user-movie-watchlist:grid-cols-3 gap-4'>
      {watchlist.map((item, index) => (
      <CardMovie key={index} movie={item.movie} />
      ))}
    </div>
  </div>
  )
};
