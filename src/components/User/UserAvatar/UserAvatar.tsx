'use client';

// UI
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// TYPES
import { User, UserProfile } from '@/types/type.db';
// UTILS
import { cn, getInitiales } from '@/lib/utils';

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | UserProfile;
}

export default function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <Avatar className={cn('h-8 w-8', className)}>
      <AvatarImage src={user?.avatar_url ?? ''} alt={user?.username ?? undefined} />
      {/* <AvatarFallback className="text-clamp">
            <UserIcon color="#fff" className='w-2/4 h-2/4'/>
          </AvatarFallback> */}
      <AvatarFallback className="text-clamp">
        {getInitiales(user?.username ?? '')}
      </AvatarFallback>
    </Avatar>
  );
}
