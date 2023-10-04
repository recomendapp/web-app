import ProfilePlaylists from "@/components/Profile/ProfilePlaylists/ProfilePlaylists";
import { supabaseServer } from "@/lib/supabase/supabase-server";

export async function generateMetadata({
    params,
  }: {
    params: { username: string };
  }) {
    const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();

    if (!user) {
      return {
        title: 'Oups, utilisateur introuvable !',
      };
    }
    return {
      title: `${user.full_name} (@${user.username})`,
      description: `This is the page of @${user.username}`,
    };
}

export default async function Playlists({
    params
  } : {
    params: { username: string };
  }) {
    const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();
    return (
        <ProfilePlaylists profile={user} />
    )
}