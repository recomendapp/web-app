import PlaylistEdit from '@/components/Playlist/FilmPlaylist/PlaylistEdit/PlaylistEdit';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Playlist({
  params,
}: {
  params: { playlist: string };
}) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  
  const { 
    data: playlist
  } = await supabase
  .from('playlist')
  .select('*, user!inner(*, subscriptions(*)), playlist_guest(*), playlist_item(*)')
  .eq('id', params.playlist)
  .eq('user.subscriptions.status', 'active')
  .order('rank', {
    referencedTable: 'playlist_item',
    ascending: true,
  })
  .single();
  
  if (
    !session // not logged in
    || (session?.user?.id !== playlist?.user_id && !playlist?.playlist_guest?.some((guest: any) => guest.user_id === session.user.id && guest.edit)) // not owner and not guest with edit rights
    || (session?.user?.id !== playlist?.user_id
      && playlist?.playlist_guest?.some((guest: any) => guest.user_id === session.user.id && guest.edit)
      && !playlist?.user?.subscriptions.length) // not owner but guest with edit rights but owner isnt not subscribed
  )
    redirect(`/playlist/${params.playlist}`);
  
  return (
      <>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto h-8 absolute top-4 left-4"
        asChild
      >
        
        <Link href={`/playlist/${params.playlist}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quitter
        </Link>
      </Button>
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2  bg-green-600 px-5 py-2 rounded-b-md'>
        Mode edition
      </div>
      <PlaylistEdit playlistId={params.playlist} serverPlaylistItems={playlist?.playlist_item ?? []} />
      </> 
  )
}