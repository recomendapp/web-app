import { createServerClient } from "@/lib/supabase/supabase-server";
import PlaylistEdit from '@/components/Playlist/FilmPlaylist/PlaylistEdit/PlaylistEdit';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function Playlist({
  params,
}: {
  params: { playlist: string };
}) {
    const supabaseServer = createServerClient();
    const { data } = await supabaseServer.from('playlist_item').select('*').eq('playlist_id', params.playlist).order('rank', {ascending: true});


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
        <PlaylistEdit playlistId={params.playlist} serverPlaylistItems={data ?? []} />
       </> 
    )
}