import { notFound } from 'next/navigation';
import PlaylistDetails from '@/components/Playlist/FilmPlaylist/PlaylistDetails/PlaylistDetails';
import { createServerClient } from '@/lib/supabase/supabase-server';
import PlaylistHeader from '@/components/Playlist/FilmPlaylist/PlaylistHeader';

export async function generateMetadata({
  params,
}: {
  params: { playlist: string };
}) {
  const supabaseServer = createServerClient();
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

export default async function PlaylistLayout({
    params,
    children
} : {
    params: { playlist: string };
    children: React.ReactNode;
}) {
  const supabaseServer = createServerClient();
  const { data: playlist } = await supabaseServer.from('playlist').select('*').eq('id', params.playlist).single();

  if (!playlist) notFound();

  return (
    <main>
      <PlaylistHeader playlistId={params.playlist} />
      <>
        {children}
      </>
    </main>
  )
}