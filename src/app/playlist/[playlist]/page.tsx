import PlaylistDetails from '@/components/modules/MoviePlaylist/PlaylistsDetails/PlaylistDetails';
import { handleGetPlaylist } from '@/components/modules/MovieAction/_components/MoviePlaylistAction/_queries/movie-action-playlist';
import { notFound } from 'next/navigation';
import { getClient } from '@/lib/ApolloClient';

import PLAYLIST_DETAILS_QUERY from '@/components/modules/MoviePlaylist/PlaylistsDetails/queries/PlaylistDetailsQuery'

export async function generateMetadata({
  params,
}: {
  params: { playlist: string };
}) {
  const playlist = await (await getClient().query({
    query: PLAYLIST_DETAILS_QUERY,
    variables: {
      id: params.playlist
    }
  })).data?.playlistCollection?.edges[0]?.node;

  if (!playlist) {
    return {
      title: 'Oups, playlist introuvable !',
    };
  }
  return {
    title: `${playlist.title} - playlist by {playlist.userId.username}`,
    description: `${playlist.description}`,
  };
}

export default async function Playlist({
  params,
}: {
  params: { playlist: string };
}) {
  const playlist = await (await getClient().query({
    query: PLAYLIST_DETAILS_QUERY,
    variables: {
      id: params.playlist
    }
  })).data?.playlistCollection?.edges[0]?.node;

  if (!playlist) notFound();

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <PlaylistDetails playlistId={params.playlist} />
    </div>

  )
}