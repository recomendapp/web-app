'use client';
import { useAuth } from '@/context/auth-context';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { ConvertHoursMinutes } from '@/lib/utils';
import { useModal } from '@/context/modal-context';
import { PlaylistModal } from '@/components/Modals/Playlist/PlaylistModal';
import { Playlist, PlaylistItem } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { useRandomImage } from '@/hooks/use-random-image';
import { ContextMenuPlaylist } from '@/components/ContextMenu/ContextMenuPlaylist';
import { useEffect, useMemo } from 'react';
import { CardUser } from '@/components/Card/CardUser';

export default function PlaylistHeader({
  playlist,
  playlistItems,
  totalRuntime,
} : {
  playlist: Playlist,
  playlistItems: PlaylistItem[],
  totalRuntime?: number,
}) {
  const { user } = useAuth();
  const { openModal, createModal } = useModal();
  const common = useTranslations('common');

  const randomImageList = useMemo(() => (
    playlistItems
      .filter(item => item?.media?.backdrop_url)
      .map(item => ({
        src: item?.media?.backdrop_url ?? '',
        alt: item?.media?.title ?? '',
      }))
  ), [playlistItems]);

  const randomBg = useRandomImage(randomImageList);

  const openPlaylistModal = () => {
    if (playlist?.user_id !== user?.id) return;
    openModal(PlaylistModal, {
      playlist,
    })
  }

  useEffect(() => {
    console.log('Playlist items updated:', playlistItems);
  }, [playlistItems]);

  return (
  <ContextMenuPlaylist playlist={playlist}>
    <HeaderBox
      style={{
        backgroundImage:  randomBg ? `url(${randomBg?.src})` : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')",
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
            <span className='text-accent-yellow'>{upperFirst(common('word.playlist', {count: 1}))}</span>
            <span className=" before:content-['_|_']">
              {playlist?.private ? upperFirst(common('word.private', {gender: 'female', count: 1})) : upperFirst(common('word.public'))}
            </span>
          </div>
          <div>
            <h1
              onClick={() => openPlaylistModal()}
              className="w-fit text-clamp font-bold line-clamp-2 cursor-pointer"
            >
              {playlist?.title}
            </h1>
          </div>
          <div className='space-y-2'>
            {/* DESCRIPTION */}
            <p
              className='cursor-pointer text-muted-foreground font-light line-clamp-2'
              onClick={() => createModal({
                header: {
                  title: upperFirst(common('word.description')),
                },
                content: <p className='p-4 bg-muted rounded-md'>{playlist?.description}</p>
              })}
            >
              {playlist?.description}
            </p>
            {/* ITEMS & TOTAL RUNTIME */}
            <div className="flex gap-1 font-light">
              {playlist.user ? <CardUser user={playlist?.user} variant='inline' /> : null}
              <span className=" before:content-['_•_']" >
                {common('messages.item_count', {count: Number(playlist?.items_count) ?? 0})}
              </span>
              {totalRuntime && <span className=" before:content-['_•_']" >
                {ConvertHoursMinutes(totalRuntime)}
              </span>}
            </div>
          </div>
        </div>
      </div>
    </HeaderBox>
  </ContextMenuPlaylist>
  );
}