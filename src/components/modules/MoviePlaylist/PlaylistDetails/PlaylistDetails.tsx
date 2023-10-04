'use client';

import { ImageWithFallback } from '@/components/tools/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlaylistButton } from '@/components/modules/MoviePlaylist/PlaylistButton';
import { useEffect, useState } from 'react';
import { User } from '@/types/type.user';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import Loader from '@/components/Loader/Loader';
import { useQuery } from '@apollo/client';
import { TablePlaylist } from '@/components/modules/MoviePlaylist/table/TablePlaylist';
import { Playlist, PlaylistItem } from '@/types/type.playlist';
import { Film } from '@/types/type.film';
import { getMovieDetails } from '@/lib/tmdb';

import PLAYLIST_DETAILS_QUERY from '@/components/modules/MoviePlaylist/PlaylistDetails/queries/playlistDetailsQuery';

export default function PlaylistDetails({
  playlistId,
}: {
  playlistId: string;
}) {
  const { user, loading } = useAuth();

  const [ playlistItems, setPlaylistItems ] = useState<{item: PlaylistItem}[]>();

  const { data: playlistQuery } = useQuery(PLAYLIST_DETAILS_QUERY, {
    variables: {
      id: playlistId,
    }
  });

  const playlist: Playlist = playlistQuery?.playlistCollection.edges[0]?.playlist;
  
  useEffect(() => {
    const fetchData = async () => {
      if (playlist?.playlist_item?.edges) {
        const updatedPlaylistItems = await Promise.all(playlist?.playlist_item?.edges.map(async (item, index) => {
          const option = { ...item }
          if (item.item.film_id) {
            const film = await getMovieDetails(item.item.film_id, 'fr');
            option.item = { ...item.item, film };
          }
          // if (item.item.film_id) {
          //   const film = await getMovieDetails(item.item.film_id, 'fr');
          //   item.item.film = film;
          // }
          return option;
        }));
  
        setPlaylistItems(updatedPlaylistItems);
      }
    };
  
    fetchData();
  }, [playlist])

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="h-full w-full">
      <PlaylistHeader
        playlistDetails={playlist}
        data={playlistItems}
      />
      <div className='p-4'>
        {playlistItems && <TablePlaylist playlist={playlistItems} userId={playlist?.user_id} />}
      </div>
    </main>
  )
}

export function PlaylistHeader({
  playlistDetails,
  data 
} : {
  playlistDetails: any,
  data?: any[]
}) {

  const { user } = useAuth();
  const [ open, setOpen ] = useState(false);

  const randomBackdrop = (object: any[]) => {
    const itemsWithBackdrop = object.filter((item: any) => item.item.film.backdrop_path); 
    
    if (itemsWithBackdrop.length === 0)
      return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return (itemsWithBackdrop[randomIndex].item.film.backdrop_path);
  }
  return (
    <>
      <div 
        style={{
          backgroundImage: `${data?.length ? `url('https://image.tmdb.org/t/p/original/${randomBackdrop(data)}` : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"}`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `${data ? 'top' : 'center'}`,
          height: 'clamp(340px,30vh,400px)',
        }}
      >
        <div className="w-full h-full flex gap-4 p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
          <div className="w-[200px] shadow-md cursor-pointer" onClick={() => playlistDetails.user_id == user?.id && setOpen(true)}>
              <AspectRatio ratio={1 / 1}>
                <ImageWithFallback
                  src={playlistDetails?.poster_url ?? ""}
                  alt={playlistDetails?.title}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className='flex flex-col gap-2 cursor-pointer' onClick={() => playlistDetails.user_id == user?.id && setOpen(true)}>
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
      { user && <PlaylistButton
        open={open}
        setOpen={setOpen}
        userId={user?.id}
        playlist={playlistDetails}
      /> }
    </>
  )
}
