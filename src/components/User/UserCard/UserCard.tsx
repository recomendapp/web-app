'use client';

import * as React from "react"
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { UserAvatar } from '../UserAvatar/UserAvatar';
import { Profile, User } from '@/types/type.db';

interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | Profile;
  icon?: boolean;
  full?: boolean;
  width?: number;
  height?: number;
}

const UserCard = React.forwardRef<
  HTMLDivElement,
  UserCardProps
>(({ user, icon, full, className, width, height, ...props }, ref) => {
  if (full)
    return (
      <Link
        href={'/@' + user.username}
        className="flex flex-col items-center bg-muted hover:bg-muted-hover h-full rounded-xl p-2 gap-2 transition"
      >
        { user.username ? <UserAvatar
        className={`w-[${width || 150}px] h-[${height || 150}px]`}
        avatar_url={user.avatar_url}
        username={user.username}
        /> : null }
        <div className="text-center">
          <p>{user.full_name}</p>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </Link>
    );

  return (
    <Link
      href={'/@' + user.username}
      className={cn('flex items-center gap-2 w-fit', className)}
    >
      {user.username ? <UserAvatar
      className={`w-[${width || 25}px] h-[${height || 25}px]`}
      avatar_url={user.avatar_url}
      username={user.username}
      /> : null}
      {!icon && (
        <div
          className={`flex justify-center items-center gap-1
                `}
        >
          <span className="hover:underline">{user.username}</span>
        </div>
      )}
    </Link>
  );
});
UserCard.displayName = "UserCard";

export default UserCard;