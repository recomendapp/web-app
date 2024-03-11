import ProfilePlaylists from '@/app/[lang]/(app)/user/[username]/(profile)/playlists/_components/ProfilePlaylists';
import { createServerClient } from '@/lib/supabase/server';

export default async function Playlists({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerClient();
  const { data: user } = await supabase
    .from('user')
    .select('*')
    .eq('username', params.username)
    .single();
    
  return <ProfilePlaylists profile={user} />;
}
