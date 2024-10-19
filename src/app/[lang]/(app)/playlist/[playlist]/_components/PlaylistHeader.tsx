'use client';

import { useAuth } from '@/context/auth-context';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { ConvertHoursMinutes } from '@/lib/utils';
import UserCard from '@/components/User/UserCard/UserCard';
import { useModal } from '@/context/modal-context';
import { PlaylistModal } from '@/components/Modals/Playlist/PlaylistModal';
import { Playlist, PlaylistItem } from '@/types/type.db';

export default function PlaylistHeader({ playlist } : { playlist: Playlist }) {
  const { user } = useAuth();
  const { openModal, createModal } = useModal();

  const randomBackdrop = (object: PlaylistItem[]) => {
    const itemsWithBackdrop = object.filter(
      (item ) => item?.movie?.backdrop_path
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return itemsWithBackdrop[randomIndex]?.movie?.backdrop_path;
  };

  const totalRuntime = playlist?.items?.reduce(
    (total: number, item: PlaylistItem) => total + (item?.movie?.runtime ?? 0),
    0
  );

  const openPlaylistModal = () => {
    if (playlist?.user_id !== user?.id) return;
    openModal(PlaylistModal, {
      playlist,
    })
  }

  return (
    <HeaderBox
      style={{
        backgroundImage:  playlist?.items?.length ? `url(https://image.tmdb.org/t/p/w1280/${randomBackdrop(playlist?.items)})` : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')",
      }}
    >
      <div className="flex flex-col w-full gap-4 items-center md:flex-row">
        <div
          className="w-[250px] shadow-md cursor-pointer shrink-0 aspect-square"
          onClick={() => openPlaylistModal()}
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
        <div className="flex flex-col justify-between gap-2 w-full">
          {/* TYPE & GENRES */}
          <div>
            <span className='text-accent-1'>Playlist</span>
            <span className=" before:content-['_|_']">
              {playlist?.private ? 'Privée' : 'Publique'}
            </span>
          </div>
          <div>
            <h2
              onClick={() => openPlaylistModal()}
              className="w-fit text-clamp font-bold line-clamp-2 cursor-pointer"
            >
              {playlist?.title}
            </h2>
          </div>
          <div className='space-y-2'>
            {/* DESCRIPTION */}
            <p
              className='cursor-pointer text-muted-foreground font-light line-clamp-2'
              onClick={() => createModal({
                header: {
                  title: 'Description',
                },
                content: <p className='p-4 bg-muted rounded-md'>{playlist?.description}</p>
              })}
            >
              {playlist?.description}
            </p>
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