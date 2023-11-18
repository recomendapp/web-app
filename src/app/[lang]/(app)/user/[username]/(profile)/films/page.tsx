import ProfileFilm from "@/components/Profile/ProfileFilms/ProfileFilms";
import { createServerClient } from "@/lib/supabase/server";

export default async function Films({
    params
  } : {
    params: { username: string };
  }) {
    const supabase = createServerClient();
    const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();

    return (
      <ProfileFilm profile={user} />
    )
}