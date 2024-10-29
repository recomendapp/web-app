'use client';

import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '../../utils/ImageWithFallback';
import Link from 'next/link';
import FeaturedPlaylistBadge from '@/components/Badge/FeatuedPlaylistBadge';
import { Playlist } from '@/types/type.db';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MoviePlaylistCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  playlist: Playlist;
}

const MoviePlaylistCard = React.forwardRef<
HTMLAnchorElement,
  MoviePlaylistCardProps
>(({ className, playlist, ...props }, ref) => {
  if (!playlist) return null;
  return (
  <Link ref={ref} href={`/playlist/${playlist.id}`} className={cn(``, className)} {...props}>
    <Card className='group border-none bg-transparent'>
      <CardHeader className='p-0'>
        <AspectRatio ratio={1 / 1} className='w-full'>
          <ImageWithFallback
            src={playlist.poster_url ?? ''}
            alt={playlist.title ?? ''}
            fill
            sizes={`
              (max-width: 640px) 96px,
              (max-width: 1024px) 120px,
              150px
            `}
            className="object-cover rounded-xl"
            type="playlist"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        </AspectRatio>
      </CardHeader>
      <CardContent className='p-0'>
        <p className="line-clamp-1 break-words group-hover:text-primary/80">{playlist.title}</p>
        <p className="line-clamp-1 text-sm italic text-muted-foreground">
          {playlist.items_count} film{Number(playlist.items_count) > 1 && 's'}
        </p>
      </CardContent>
    </Card>
  </Link>
  )
  // return (
  //   <div>
  //     <AspectRatio ratio={1 / 1}>
  //       <ImageWithFallback
  //         src={playlist.poster_url ?? ''}
  //         alt={playlist.title ?? ''}
  //         fill
  //         sizes={`
  //           (max-width: 640px) 96px,
  //           (max-width: 1024px) 120px,
  //           150px
  //         `}
  //         className="object-cover rounded-xl"
  //         type="playlist"
  //       />
  //     </AspectRatio>
  //     <div>
  //       <p className="line-clamp-1 break-words">{playlist.title}</p>
  //       {/* <p className="text-muted-foreground">
  //         {playlist.items_count} film{Number(playlist.items_count) > 1 && 's'}
  //       </p> */}
  //     </div>
  //   </div>
  // )
  // return (
  //   <Link
  //     href={`/playlist/${playlist.id}`}
  //     className={cn(`relative flex flex-col gap-2 h-full bg-muted hover:bg-muted-hover rounded-md p-2`,
  //       className
  //     )}
  //   >
  //     {playlist.featured && <FeaturedPlaylistBadge />}
  //     <div className={`w-full shadow-2xl`}>
  //       <AspectRatio ratio={1 / 1}>
  //         <ImageWithFallback
  //           src={playlist.poster_url ?? ''}
  //           alt={playlist.title ?? ''}
  //           fill
  //           sizes={`
  //             (max-width: 640px) 96px,
  //             (max-width: 1024px) 120px,
  //             150px
  //           `}
  //           className="rounded-md object-cover"
  //           type="playlist"
  //         />
  //       </AspectRatio>
  //     </div>
  //     <div>
  //       <p className="text-center line-clamp-2 break-words">{playlist.title}</p>
  //       <p className="text-center text-muted-foreground">
  //         {playlist.items_count} film{Number(playlist.items_count) > 1 && 's'}
  //       </p>
  //     </div>
  //   </Link>
  // );
});
MoviePlaylistCard.displayName = 'MoviePlaylistCard';

export default MoviePlaylistCard;
