import PlaylistDetails from '@/components/modules/MoviePlaylist/PlaylistDetails';
import { handleGetPlaylist } from '@/components/modules/MovieAction/_components/MoviePlaylistAction/_queries/movie-action-playlist';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { playlist: string };
}) {
  const playlist = await handleGetPlaylist(params.playlist);

  if (!playlist) {
    return {
      title: 'Oups, playlist introuvable !',
    };
  }
  return {
    title: `${playlist.title} - playlist by ${playlist.userId.username}`,
    description: `${playlist.description}`,
  };
}

export default async function Playlist({
  params,
}: {
  params: { playlist: string };
}) {
  const playlist = await handleGetPlaylist(params.playlist);

  if (!playlist) notFound();

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <PlaylistDetails playlistServer={playlist} />
    </div>

  )
}