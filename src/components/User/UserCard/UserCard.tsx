'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

// UI
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import UserAvatar from '../UserAvatar/UserAvatar';

import { User, UserProfile } from '@/types/type.db';

interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | UserProfile;
  icon?: boolean;
  full?: boolean;
}

export default function UserCard({
  user,
  icon,
  full = false,
  className,
}: UserCardProps) {
  if (full)
    return (
      <Link
        key={user?.username}
        href={'/@' + user?.username}
        className="flex flex-col items-center bg-muted hover:bg-muted-hover h-full rounded-xl p-2 gap-2 transition"
      >
        <UserAvatar className="w-[150px] h-[150px]" user={user} />
        <div className="text-center">
          <p>{user?.full_name}</p>
          <p className="text-muted-foreground">@{user?.username}</p>
        </div>
      </Link>
    );

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <UserLink user={user} className={cn('', className)} icon={icon} />
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex justify-between space-x-4">
          <UserAvatar user={user} />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              {/* <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "} */}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

interface UserLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | UserProfile;
  icon?: boolean;
}

function UserLink({ user, className, icon }: UserLinkProps) {
  return (
    <Link
      href={'/@' + user?.username}
      className={cn('flex items-center gap-2 w-fit', className)}
    >
      <UserAvatar className="w-[25px] h-[25px]" user={user} />
      {!icon && (
        <div
          className={`flex justify-center items-center gap-1
                `}
        >
          <span className="hover:underline">{user?.username}</span>
          {/* {user?.verified && <BsFillPatchCheckFill fill="#1D9BF0" size={16} />} */}
        </div>
      )}
    </Link>
  );
}
