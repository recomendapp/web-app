'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import Link from 'next/link';
import { Playlist } from '@/types/type.db';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

interface CardPlaylistProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default";
		playlist: Playlist;
	}

const CardPlaylistDefault = React.forwardRef<
	HTMLDivElement,
	Omit<CardPlaylistProps, "variant">
>(({ className, playlist, children, ...props }, ref) => {
	return (
		<Card
			ref={ref}
			className={cn(
				"group border-none bg-transparent",
				className
			)}
			{...props}
		>
			<CardHeader className='p-0'>
        <AspectRatio ratio={1 / 1} className='w-full rounded-xl overflow-hidden'>
          <ImageWithFallback
            src={playlist?.poster_url ?? ''}
            alt={playlist?.title ?? ''}
            fill
            sizes={`
              (max-width: 640px) 96px,
              (max-width: 1024px) 120px,
              150px
            `}
            className="object-cover"
            type="playlist"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        </AspectRatio>
      </CardHeader>
      <CardContent className='p-0'>
        <p className="line-clamp-2 break-words group-hover:text-primary/80">{playlist?.title}</p>
        {/* <p className="line-clamp-1 text-sm italic text-muted-foreground">
          {playlist?.items_count} film{Number(playlist?.items_count) > 1 && 's'}
        </p> */}
      </CardContent>
		</Card>
	);
});
CardPlaylistDefault.displayName = "CardPlaylistDefault";

const CardPlaylist = React.forwardRef<
	HTMLDivElement,
	CardPlaylistProps
>(({ className, playlist, variant = "default", ...props }, ref) => {
	return (
	// <ContextMenuMovie movie={movie}>
		<Link href={`/playlist/${playlist?.id}`}>
			{variant === "default" ? (
				<CardPlaylistDefault ref={ref} className={className} playlist={playlist} {...props} />
			) : null}
		</Link>
	// </ContextMenuMovie>
	);
});
CardPlaylist.displayName = "CardPlaylist";

export {
	type CardPlaylistProps,
	CardPlaylist,
	CardPlaylistDefault,
}