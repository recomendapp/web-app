'use client';

import UserCard from '@/components/User/UserCard/UserCard';
import { cn } from '@/lib/utils';
import { Profile } from '@/types/type.db';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function ProfileNavbar({
  profile,
  className,
  withProfile = false,
}: {
  profile: Profile;
  className?: string;
  withProfile?: boolean;
}) {
  const common = useTranslations('common');
  const pathname = usePathname();
  const profileRoutes = useMemo(
    () => [
      {
        label: upperFirst(common('word.profile')),
        active: pathname === `/@${profile?.username}`,
        href: `/@${profile?.username}`,
      },
      {
        label: upperFirst(common('messages.collection', { count: 1 })),
        active: pathname === `/@${profile?.username}/collection`,
        href: `/@${profile?.username}/collection`,
      },
      {
        label: upperFirst(common('word.playlist', { count: 2 })),
        active: pathname === `/@${profile?.username}/playlists`,
        href: `/@${profile?.username}/playlists`,
      },
    ],
    [pathname, profile, common]
  );
  return (
    <div
      className={cn(
        'flex w-full h-10 items-center justify-between bg-muted p-1 text-muted-foreground rounded-md',
        className
      )}
    >
      {withProfile && <UserCard user={profile} />}
      <div className="flex w-full md:w-fit justify-between">
        {profileRoutes.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`w-full rounded-md inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium ring-offset-background transition-all 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
              disabled:pointer-events-none disabled:opacity-50 
              ${
                item.active && 'bg-background text-accent-1 shadow-sm'
              }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {withProfile && <div></div>}
    </div>
  );
}
