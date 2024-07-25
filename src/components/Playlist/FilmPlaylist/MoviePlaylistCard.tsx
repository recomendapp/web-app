'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '../../utils/ImageWithFallback';
import Link from 'next/link';
import FeaturedPlaylistBadge from '@/components/Badge/FeatuedPlaylistBadge';
import { Playlist } from '@/types/type.db';

interface MoviePlaylistCardProps extends React.HTMLAttributes<HTMLElement> {
  playlist: Playlist;
}

export default function MoviePlaylistCard({
  className,
  playlist,
}: MoviePlaylistCardProps) {
  if (!playlist) return null;
  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className={cn(`relative flex flex-col gap-2 h-full bg-muted hover:bg-muted-hover rounded-md p-2`,
        className
      )}
    >
      {playlist.featured && <FeaturedPlaylistBadge />}
      <div className={`w-full shadow-2xl`}>
        <AspectRatio ratio={1 / 1}>
          <ImageWithFallback
            src={playlist.poster_url ?? ''}
            alt={playlist.title ?? ''}
            fill
            sizes={`
              (max-width: 640px) 96px,
              (max-width: 1024px) 120px,
              150px
            `}
            className="rounded-md object-cover"
            type="playlist"
          />
        </AspectRatio>
      </div>
      <div>
        <p className="text-center line-clamp-2 break-words">{playlist.title}</p>
        <p className="text-center text-muted-foreground">
          {playlist.items_count} film{Number(playlist.items_count) > 1 && 's'}
        </p>
      </div>
    </Link>
  );
}
