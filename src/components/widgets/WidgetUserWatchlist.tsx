'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useUserWatchlistQuery } from '@/features/client/user/userQueries';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { CardMedia } from '@/components/Cards/CardMedia';

export const WidgetUserWatchlist = ({
  className,
} : React.HTMLAttributes<HTMLDivElement>) => {
  const { user } = useAuth();
  const t = useTranslations('widgets');

  const { data: watchlist } = useUserWatchlistQuery({
    userId: user?.id,
    filters: {
      order: 'random',
      limit: 6,
    }
  })

  if (!user) return null;

  if (!watchlist || !watchlist.length) return (null);

  return (
  <div className={cn('@container/widget-user-watchlist space-y-2', className)}>
    <Button variant={'link'} className="p-0 w-fit font-semibold text-xl" asChild>
			<Link href={'/collection/watchlist'}>
        {t('user_watchlist.label')}
			</Link>
		</Button>
    <div className='grid grid-cols-2 @2xl/widget-user-watchlist:grid-cols-3 gap-4'>
      {watchlist.map((item, index) => (
      <CardMedia key={index} media={item?.media!} />
      ))}
    </div>
  </div>
  )
};
