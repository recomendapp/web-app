import { notFound } from 'next/navigation';
import PlaylistDetails from '@/components/Playlist/FilmPlaylist/PlaylistDetails/PlaylistDetails';
import { createServerClient } from '@/lib/supabase/supabase-server';

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