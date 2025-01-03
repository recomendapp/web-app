'use client';

import * as React from "react"
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { UserAvatar } from '../UserAvatar/UserAvatar';
import { User, UserProfile } from '@/types/type.db';

interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | UserProfile;
  icon?: boolean;
  full?: boolean;
}

const UserCard = React.forwardRef<
  HTMLDivElement,
  UserCardProps
>(({ user, icon, full, className, ...props }, ref) => {
  if (full)
    return (
      <Link
        href={'/@' + user?.username}
        className="flex flex-col items-center bg-muted hover:bg-muted-hover h-full rounded-xl p-2 gap-2 transition"
      >
        <UserAvatar className="w-[150px] h-[150px]" avatar_url={user?.avatar_url} username={user?.username} />
        <div className="text-center">
          <p>{user?.full_name}</p>
          <p className="text-muted-foreground">@{user?.username}</p>
        </div>
      </Link>
    );

  return (
    <Link
      href={'/@' + user?.username}
      className={cn('flex items-center gap-2 w-fit', className)}
    >
      <UserAvatar className="w-[25px] h-[25px]" avatar_url={user?.avatar_url} username={user?.username} />
      {!icon && (
        <div
          className={`flex justify-center items-center gap-1
                `}
        >
          <span className="hover:underline">{user?.username}</span>
        </div>
      )}
    </Link>
  );
});
UserCard.displayName = "UserCard";

export default UserCard;