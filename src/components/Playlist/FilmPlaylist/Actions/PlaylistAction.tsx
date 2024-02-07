'use client';

import ButtonShare from '@/components/utils/ButtonShare';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { PlaylistLikeAction } from './components/PlaylistLikeAction';

export function PlaylistAction({
  playlistId,
  className,
} : {
  playlistId: number;
  className?: string;
}) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={cn("flex justify-between gap-1", className)}>
		<PlaylistLikeAction playlistId={playlistId} />
		<ButtonShare
			url={`${location.origin}/playlist/${playlistId}`}
			icon
			className=''
		/>
    </div>
  );
}
