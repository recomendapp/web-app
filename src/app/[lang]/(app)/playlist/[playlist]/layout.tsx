import { notFound } from 'next/navigation';
import PlaylistHeader from '@/components/Playlist/FilmPlaylist/PlaylistHeader';
import { createServerClient } from '@/lib/supabase/server';

export async function generateMetadata({
  params,
}: {
  params: { playlist: string };
}) {
  const supabase = createServerClient();
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

export default async function PlaylistLayout({
    params,
    children
} : {
    params: { playlist: string };
    children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const { data: playlist } = await supabase.from('playlist').select('*').eq('id', params.playlist).single();

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