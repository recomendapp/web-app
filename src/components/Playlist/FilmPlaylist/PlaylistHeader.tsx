'use client';

import { useAuth } from '@/context/AuthContext/auth-context';
import { useState } from 'react';
import { PlaylistEditButton } from '../Button/PlaylistEditButton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_PLAYLIST_BY_ID from '@/graphql/Playlist/Playlist/queries/GetPlaylistById';
import { GetPlaylistByIdQuery, PlaylistItemFragment } from '@/graphql/__generated__/graphql';

export default function PlaylistHeader({
  playlistId,
}: {
  playlistId: string;
}) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const { data: playlistQuery } = useQuery<GetPlaylistByIdQuery>(GET_PLAYLIST_BY_ID, {
    variables: {
      id: playlistId,
    },
  });
  const playlist = playlistQuery?.playlistCollection?.edges[0]?.node;

  const randomBackdrop = (object: { node: PlaylistItemFragment }[]) => {
    const itemsWithBackdrop = object.filter(
      ({ node }) => node.movie.backdrop_path
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return itemsWithBackdrop[randomIndex].node.movie.backdrop_path;
  };

  return (
    <PlaylistEditButton playlist={playlist}>
      <div
        style={{
          backgroundImage: `${
            playlist?.playlist_item?.edges
              ? `url('https://image.tmdb.org/t/p/original/${randomBackdrop(playlist?.playlist_item?.edges)}`
              : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"
          }`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `${Number(playlist?.items_count) ? 'top' : 'center'}`,
          height: 'clamp(340px,30vh,400px)',
        }}
      >
        <div className="w-full h-full flex gap-4 p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
          <div
            className="w-[200px] shadow-md cursor-pointer"
            onClick={() => playlist?.user_id == user?.id && setOpen(true)}
          >
            <AspectRatio ratio={1 / 1}>
              <ImageWithFallback
                src={playlist?.poster_url ?? ''}
                alt={playlist?.title ?? ''}
                fill
                className="rounded-md object-cover"
                type="playlist"
              />
            </AspectRatio>
          </div>
          <div
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => playlist?.user_id == user?.id && setOpen(true)}
          >
            <p>
              {playlist?.is_public ? 'Playlist publique' : 'Playlist privée'}
            </p>
            <h2 className="text-clamp font-bold text-accent-1">
              {playlist?.title}
            </h2>
            <p>{playlist?.description}</p>
            <p className="text-muted-foreground">
              {playlist?.items_count ?? 0} film
              {Number(playlist?.items_count) > 1 && 's'}
            </p>
          </div>
        </div>
      </div>
    </PlaylistEditButton>
  );
}
