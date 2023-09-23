'use client';

import { ImageWithFallback } from '@/components/elements/Tools/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlaylistButton } from '@/components/modules/MoviePlaylist/PlaylistButton';
import { Dispatch, SetStateAction, useState } from 'react';
import { Models } from 'appwrite';
import { TablePlaylist } from '@/components/modules/MoviePlaylist/table/TablePlaylist';
import { handleGetPlaylistItems } from '@/components/modules/MovieAction/_components/MoviePlaylistAction/_queries/movie-action-playlist';
import { User } from '@/types/type.user';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import Loader from '@/components/elements/Loader/Loader';
import { useQuery } from '@apollo/client';
import PLAYLIST_DETAILS_QUERY from './queries/PlaylistDetailsQuery';

export default function PlaylistDetails({
  playlistId,
}: {
  playlistId: string;
}) {
  const { user } = useAuth();

  const { data: playlistQuery } = useQuery(PLAYLIST_DETAILS_QUERY, {
    variables: {
      id: playlistId,
    }
  });

  const playlist = playlistQuery?.playlistCollection.edges[0]?.node;
  // const [ playlistMetadata, setPlaylistMetadata] = useState(playlistServer);


  if (!user) {
    return <Loader />;
  }

  return (
    <main className="h-full w-full">
      <PlaylistHeader
        user={user}
        playlistDetails={playlist}
        // data={playlist}
      />
      {/* <div className='p-4'>
        {playlist && <TablePlaylist playlist={playlist} playlistMetadata={playlistMetadata} />}
      </div> */}
    </main>
  )
}

export function PlaylistHeader({
  user,
  playlistDetails,
  data 
} : {
  user: User,
  playlistDetails: any,
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
          <div className="w-[200px] shadow-md cursor-pointer" onClick={() => playlistDetails.user_id == user.id && setOpen(true)}>
              <AspectRatio ratio={1 / 1}>
                <ImageWithFallback
                  src={playlistDetails?.poster_url ?? ""}
                  alt={playlistDetails?.title}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className='flex flex-col gap-2 cursor-pointer' onClick={() => playlistDetails.user_id == user.id && setOpen(true)}>
              <p>
                {playlistDetails?.is_public ? "Playlist publique" : "Playlist privée"}
              </p>
              <h2 className='text-clamp font-bold text-accent-1'>
                {playlistDetails?.title}
                </h2>
              <p>
                {playlistDetails?.description}
              </p>
              <p className='text-muted-foreground'>{playlistDetails?.items_count ?? 0} film{playlistDetails?.items_count > 1 && 's'}</p>
            </div>
        </div>
      </div>
      <PlaylistButton
        open={open}
        setOpen={setOpen}
        userId={user.id}
        playlist={playlistDetails}
      />
    </>
  )
}
