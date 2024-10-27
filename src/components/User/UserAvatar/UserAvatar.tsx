'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, UserProfile } from '@/types/type.db';
import { cn, getInitiales } from '@/lib/utils';

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar_url?: string | null;
  username?: string | null;
}

export const UserAvatar = ({
  avatar_url,
  username,
  className,
  ...props
} : UserAvatarProps) => {
  const avatarUrlRender = avatar_url ?? '';
  const usernameRender = username ?? '';
  return (
    <Avatar className={cn('h-8 w-8', className)} {...props}>
      <AvatarImage src={avatarUrlRender} alt={usernameRender} />
      <AvatarFallback className="text-clamp">
        {getInitiales(usernameRender)}
      </AvatarFallback>
    </Avatar>
  );
}
