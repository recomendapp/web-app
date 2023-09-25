import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

import PlaylistDetails from '@/components/modules/MoviePlaylist/PlaylistDetails/PlaylistDetails';

export async function generateMetadata({
  params,
}: {
  params: { playlist: string };
}) {
  const { data: playlist } = await supabase.from('playlist').select('*, user(username)').eq('id', params.playlist).single();
  if (!playlist) {
    return {
      title: 'Oups, playlist introuvable !',
    };
  }
  return {
    title: `${playlist.title} - playlist by @${playlist.user.username}`,
    description: `${playlist.description}`,
  };
}

export default async function Playlist({
  params,
}: {
  params: { playlist: string };
}) {
  const { data: playlist } = await supabase.from('playlist').select('*').eq('id', params.playlist).single();

  if (!playlist) notFound();

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <PlaylistDetails playlistId={params.playlist} />
    </div>

  )
}