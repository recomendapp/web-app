import ProfilePlaylists from "@/components/Profile/ProfilePlaylists/ProfilePlaylists";
import { createServerClient } from "@/lib/supabase/supabase-server";

export default async function Playlists({
    params
  } : {
    params: { username: string };
  }) {
    const supabaseServer = createServerClient()

    const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();
    return (
        <ProfilePlaylists profile={user} />
    )
}