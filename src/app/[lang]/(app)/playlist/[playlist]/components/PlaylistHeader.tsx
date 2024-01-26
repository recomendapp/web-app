'use client';

import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
import { PlaylistEditButton } from '@/components/Playlist/Button/PlaylistEditButton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';

// GRAPHQL
import { PlaylistFragment, PlaylistItemFragment } from '@/graphql/__generated__/graphql';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { ConvertHoursMinutes } from '@/lib/utils';
import UserCard from '@/components/User/UserCard/UserCard';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { useModal } from '@/context/modal-context';
import { PlaylistModal } from '@/components/Modals/Playlist/PlaylistModal';

export default function PlaylistHeader({ playlist } : { playlist: PlaylistFragment }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { openModal, closeModal } = useModal();

  const randomBackdrop = (object: { node: PlaylistItemFragment }[]) => {
    const itemsWithBackdrop = object.filter(
      ({ node }) => node.movie.backdrop_path
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return itemsWithBackdrop[randomIndex].node.movie.backdrop_path;
  };

  const totalRuntime = playlist.playlist_item?.edges.reduce(
    (total, { node }) => total + (node.movie.runtime ?? 0),
    0
  );

  return (
    <HeaderBox
      style={{
        backgroundImage:  playlist.playlist_item?.edges.length ? `url(https://image.tmdb.org/t/p/w1280/${randomBackdrop(playlist?.playlist_item?.edges)})` : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')",
      }}
    >
      <div className="flex flex-col w-full gap-4 items-center md:flex-row">
        <div
          className="w-[250px] shadow-md cursor-pointer shrink-0 aspect-square"
          onClick={() => playlist.user_id === user?.id && openModal({
            id: `playlist-${playlist.id}-edit`,
            content: <PlaylistModal id={`playlist-${playlist.id}-edit`} playlist={playlist} />,
          })}
        >
          <AspectRatio ratio={1 / 1}>
            <ImageWithFallback
              src={playlist?.poster_url ?? ''}
              alt={playlist?.title}
              fill
              className="rounded-md object-cover"
              type="playlist"
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col justify-between gap-2 w-full">
          {/* TYPE & GENRES */}
          <div>
            <span className='text-accent-1'>Playlist</span>
            <span className=" before:content-['_|_']">
              {playlist?.is_public ? 'Publique' : 'Privée'}
            </span>
          </div>
          <div>
            <h2
              onClick={() => playlist.user_id === user?.id && openModal({
                id: `playlist-${playlist.id}-edit`,
                content: <PlaylistModal id={`playlist-${playlist.id}-edit`} playlist={playlist} />,
              })}
              className="w-fit text-clamp font-bold line-clamp-2 cursor-pointer"
            >
              {playlist?.title}
            </h2>
          </div>
          <div className='space-y-2'>
            {/* DESCRIPTION */}
            <p
              className='text-muted-foreground font-light line-clamp-2'
              onClick={() => openModal({
                id: `playlist-${playlist.id}-description`,
                content: (
                  <DialogContent>
                    <DialogTitle>
                      Description
                    </DialogTitle>
                    <p>{playlist.description}</p>
                  </DialogContent>
                ),
              })}
            >
              {playlist?.description}
            </p>
            {/* <PlaylistDescriptionModal playlist={playlist} /> */}
            {/* ITEMS & TOTAL RUNTIME */}
            <div className="flex gap-1 font-light">
              <UserCard user={playlist?.user} />
              <div className=" before:content-['_•_']" >
                {Number(playlist?.items_count) ?? 0} film
                {Number(playlist?.items_count) > 1 && 's'}
              </div>
              <div className=" before:content-['_•_']" >
                {ConvertHoursMinutes(totalRuntime)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderBox>
  );
}