'use client'

import { cn } from '@/lib/utils';
import { Profile } from '@recomendapp/types';
import { upperFirst } from 'lodash';
import { Link } from "@/lib/i18n/navigation";
import { usePathname } from '@/lib/i18n/navigation';
import { useMemo } from 'react';
import { useT } from '@/lib/i18n/client';

export const ProfileNavbar = ({
  profile,
  className,
}: {
  profile: Profile;
  className?: string;
}) => {
  const { t } = useT();
  const pathname = usePathname();
  const profileRoutes = useMemo(
    () => [
      {
        label: upperFirst(t('common.messages.profile')),
        active: pathname === `/@${profile?.username}`,
        href: `/@${profile?.username}`,
      },
      {
        label: upperFirst(t('common.messages.film', { count: 2 })),
        active: pathname === `/@${profile?.username}/films`,
        href: `/@${profile?.username}/films`,
      },
      {
        label: upperFirst(t('common.messages.tv_series', { count: 2 })),
        active: pathname === `/@${profile?.username}/tv-series`,
        href: `/@${profile?.username}/tv-series`,
      },
      {
        label: upperFirst(t('common.messages.playlist', { count: 2 })),
        active: pathname === `/@${profile?.username}/playlists`,
        href: `/@${profile?.username}/playlists`,
      },
    ],
    [pathname, profile, t]
  );
  return (
    <div
      className={cn(
        'flex w-full h-10 items-center justify-between bg-muted p-1 text-muted-foreground rounded-md',
        className
      )}
    >
      <div className="flex w-full md:w-fit justify-between">
        {profileRoutes.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`w-full rounded-md inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium ring-offset-background transition-all 
              focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
              disabled:pointer-events-none disabled:opacity-50 
              ${
                item.active && 'bg-background text-accent-yellow shadow-xs'
              }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
