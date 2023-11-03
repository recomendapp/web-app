import ProfileFilm from "@/components/Profile/ProfileFilms/ProfileFilms";
import { createServerClient } from "@/lib/supabase/supabase-server";

export default async function Films({
    params
  } : {
    params: { username: string };
  }) {
    const supabaseServer = createServerClient()

    const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();

    return (
      <ProfileFilm profile={user} />
    )
}