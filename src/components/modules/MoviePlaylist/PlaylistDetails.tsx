'use client';

import { ImageWithFallback } from '@/components/elements/Tools/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useUser } from '@/context/UserProvider';
import { Loader2 } from 'lucide-react';
import { PlaylistButton } from '@/components/modules/MoviePlaylist/PlaylistButton';
import { Dispatch, SetStateAction, useState } from 'react';
import { Models } from 'appwrite';
import { TablePlaylist } from '@/components/modules/MoviePlaylist/table/TablePlaylist';
import { useQuery } from 'react-query';
import { handleGetPlaylistItems } from '@/components/modules/MovieAction/_components/MoviePlaylistAction/_queries/movie-action-playlist';
import { User } from '@/types/type.user';

export default function PlaylistDetails({
  playlistServer,
}: {
  playlistServer: Models.Document;
}) {
  const { user } = useUser();
  const [ playlistMetadata, setPlaylistMetadata] = useState(playlistServer);

  const {
    data: playlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['playlist', playlistServer.$id],
    queryFn: () => handleGetPlaylistItems(playlistServer.$id, user),
    enabled: (user?.$id !== undefined && user?.$id !== null) && (playlistServer?.$id !== undefined && playlistServer?.$id !== null),
  });

  if (!user) {
    return <Loader2 />;
  }

  if (!playlistServer.is_public && user.$id !== playlistServer.userId.$id) {
    throw Error;
  }

  return (
    <main className="h-full w-full">
      <PlaylistHeader
        user={user}
        playlistMetadata={playlistMetadata}
        setPlaylistMetadata={setPlaylistMetadata}
        data={playlist}
      />
      <div className='p-4'>
        {playlist && <TablePlaylist playlist={playlist} playlistMetadata={playlistMetadata} />}
      </div>
    </main>
  )
}

export function PlaylistHeader({
  user,
  playlistMetadata,
  setPlaylistMetadata,
  data 
} : {
  user: User,
  playlistMetadata: Models.Document,
  setPlaylistMetadata: Dispatch<SetStateAction<Models.Document>>
  data?: any[]
}) {

  const [ open, setOpen ] = useState(false);

  const randomBackdrop = (object: any[]) => {
    const itemsWithBackdrop = object.filter((item: any) => item.backdrop_path); 
    
    if (itemsWithBackdrop.length === 0)
      return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    
    return (itemsWithBackdrop[randomIndex].backdrop_path);
  }

  return (
    <>
      <div 
        style={{
          backgroundImage: `${data ? `url('https://image.tmdb.org/t/p/original/${randomBackdrop(data)}` : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"}`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `${data ? 'top' : 'center'}`,
          height: 'clamp(340px,30vh,400px)',
        }}
      >
        <div className="w-full h-full flex gap-4 p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
          <div className="w-[200px] shadow-md cursor-pointer" onClick={() => playlistMetadata.userId.$id == user.$id && setOpen(true)}>
              <AspectRatio ratio={1 / 1}>
                <ImageWithFallback
                  src={playlistMetadata.poster_path ? playlistMetadata.poster_path : ''}
                  alt={playlistMetadata.title}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className='flex flex-col gap-2 cursor-pointer' onClick={() => playlistMetadata.userId.$id == user.$id && setOpen(true)}>
              <p>
                {playlistMetadata.is_public ? "Playlist publique" : "Playlist privée"}
              </p>
              <h2 className='text-clamp font-bold text-accent-1'>
                {playlistMetadata.title}
                </h2>
              <p>
                {playlistMetadata.description}
              </p>
              <p className='text-muted-foreground'>{playlistMetadata.items_count} film{playlistMetadata.items_count > 1 && 's'}</p>
            </div>
        </div>
      </div>
      <PlaylistButton
        open={open}
        setOpen={setOpen}
        userId={user.$id}
        playlist={playlistMetadata}
        setPlaylist={setPlaylistMetadata}
      />
    </>
  )
}
