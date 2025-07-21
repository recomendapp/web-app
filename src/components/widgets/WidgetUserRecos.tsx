'use client';

import { Link } from "@/lib/i18n/routing";
import { useAuth } from '@/context/auth-context';
import { useUserRecosQuery } from '@/features/client/user/userQueries';
import { UserAvatar } from '@/components/User/UserAvatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { CardMedia } from '@/components/Card/CardMedia';

export const WidgetUserRecos = ({
  className,
} : React.HTMLAttributes<HTMLDivElement>) => {
  const { user } = useAuth();
  const t = useTranslations('widgets');

  const { data: recos } = useUserRecosQuery({
    userId: user?.id,
    filters: {
      order: 'random',
      limit: 6,
    }
  })

  const sendersShow = 3;

  if (!user) return null;

  if (!recos || !recos.length) return null;

  return (
  <div className={cn('@container/widget-user-recos space-y-2', className)}>
    <Button variant={'link'} className="p-0 w-fit font-semibold text-xl" asChild>
			<Link href={'/collection/my-recos'}>
        {t('user_recos.label')}
			</Link>
		</Button>
    <div className='grid grid-cols-2 @2xl/widget-user-recos:grid-cols-3 gap-4'>
      {recos.map((item, index) => (
      <CardMedia key={index} media={item.media!}>
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
      </CardMedia>
      ))}
    </div>
  </div>
  )
};
