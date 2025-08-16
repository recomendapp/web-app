'use client';

import { Link } from "@/lib/i18n/routing";
import { useAuth } from '@/context/auth-context';
import { useUserRecosQuery } from '@/features/client/user/userQueries';
import { UserAvatar } from '@/components/User/UserAvatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { CardMedia } from '@/components/Card/CardMedia';
import { upperFirst } from "lodash";
import { MediaMovie, MediaTvSeries, UserRecosAggregated } from "@/types/type.db";
import { CardMovie } from "../Card/CardMovie";
import { CardTvSeries } from "../Card/CardTvSeries";

export const WidgetUserRecos = ({
  className,
} : React.HTMLAttributes<HTMLDivElement>) => {
  const { session } = useAuth();
  const t = useTranslations('common');

  const { data: recos, error } = useUserRecosQuery({
    userId: session?.user.id,
    filters: {
      // sortBy: 'random',
      limit: 6,
    }
  })
  console.log('error', error)

  const sendersShow = 3;

  const renderContent = (item: UserRecosAggregated) => (
    <div className="flex -space-x-2 overflow-hidden">
      {item.senders?.slice(0, sendersShow).map(({user}:any, index) => (
      <UserAvatar
        key={index}
        avatarUrl={user?.avatar_url ?? ''}
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
  )

  if (!session) return null;

  if (!recos || !recos.length) return null;

  return (
  <div className={cn('@container/widget-user-recos space-y-2', className)}>
    <Button variant={'link'} className="p-0 w-fit font-semibold text-xl" asChild>
			<Link href={'/collection/my-recos'}>
        {upperFirst(t('messages.reco_by_your_friends'))}
			</Link>
		</Button>
    <div className='grid grid-cols-2 @2xl/widget-user-recos:grid-cols-3 gap-4'>
      {recos.map((item, index) => (
        item.type === 'movie' ? (
          <CardMovie key={index} movie={item.media as MediaMovie}>
            {renderContent(item)}
          </CardMovie>
        ) : (
          <CardTvSeries key={index} tvSeries={item.media as MediaTvSeries}>
            {renderContent(item)}
          </CardTvSeries>
        )
      ))}
    </div>
  </div>
  )
};
