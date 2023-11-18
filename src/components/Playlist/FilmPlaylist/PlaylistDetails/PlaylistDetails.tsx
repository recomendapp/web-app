'use client';

import { ImageWithFallback } from '@/components/tools/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlaylistEditButton } from '@/components/Playlist/Button/PlaylistEditButton';
import { useEffect, useState } from 'react';
import { User } from '@/types/type.user';
import { useAuth } from '@/context/AuthContext/auth-context';
import Loader from '@/components/Loader/Loader';
import { useQuery } from '@apollo/client';
import PlaylistTable from '@/components/Playlist/FilmPlaylist/PlaylistTable/PlaylistTable';
import { Playlist, PlaylistItem } from '@/types/type.playlist';
import { Film } from '@/types/type.film';
import { getMovieDetails } from '@/lib/tmdb/tmdb';

import PLAYLIST_DETAILS_QUERY from '@/components/Playlist/FilmPlaylist/PlaylistDetails/queries/playlistDetailsQuery';
import PlaylistHeader from '../PlaylistHeader';

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
    // <main className="h-full w-full">
    //   <PlaylistHeader
    //     playlistId={playlistId}
    //     data={playlistItems}
    //   />
      <div className='p-4'>
        {playlistItems && <PlaylistTable playlistItems={playlistItems} playlist={playlist} />}
      </div>
    // </main>
  )
}


