import ProfileFilm from "@/components/modules/ProfileFilms/ProfileFilms";
import { getUserDetails } from "@/lib/appwrite";
import { supabase } from "@/lib/supabase/supabase";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
  }: {
    params: { username: string };
  }) {
    const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();

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

export default async function Films({
    params
  } : {
    params: { username: string };
  }) {
    const { data: user } = await supabase.from('user').select('*').eq('username', params.username).single();

    return (
      <ProfileFilm profile={user} />
    )
}