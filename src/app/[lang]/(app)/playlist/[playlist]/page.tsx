import PlaylistDetails from '@/components/Playlist/FilmPlaylist/PlaylistDetails/PlaylistDetails';

export default async function Playlist({
  params,
}: {
  params: { playlist: string };
}) {
  return (
    // <div className='w-full h-full flex flex-col justify-center items-center'>
      <PlaylistDetails playlistId={params.playlist} />
    // </div>
  )
}