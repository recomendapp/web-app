import { notFound } from 'next/navigation';
import PlaylistDetails from '@/components/modules/MoviePlaylist/PlaylistDetails/PlaylistDetails';
import { supabaseServer } from '@/lib/supabase/supabase-server';

export async function generateMetadata({
  params,
}: {
  params: { playlist: string };
}) {
  const { data: playlist } = await supabaseServer.from('playlist').select('*, user(username)').eq('id', params.playlist).single();
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
  const { data: playlist } = await supabaseServer.from('playlist').select('*').eq('id', params.playlist).single();

  if (!playlist) notFound();

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <PlaylistDetails playlistId={params.playlist} />
    </div>

  )
}