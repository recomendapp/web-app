'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    <Avatar className={cn('@container/avatar h-8 w-8', className)} {...props}>
      <AvatarImage src={avatarUrlRender} alt={usernameRender} />
      <AvatarFallback className="text-xl @[50px]/avatar:text-3xl @[100px]/avatar:text-5xl">
        {getInitiales(usernameRender)}
      </AvatarFallback>
    </Avatar>
  );
}
