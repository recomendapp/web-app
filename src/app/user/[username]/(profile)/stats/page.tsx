
import { createServerClient } from "@/lib/supabase/supabase-server";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
  }: {
    params: { username: string };
  }) {
    const supabaseServer = createServerClient()

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

export default async function Stats({
    params
  } : {
    params: { username: string };
  }) {
    const supabaseServer = createServerClient()

    const { data: user } = await supabaseServer.from('user').select('*').eq('username', params.username).single();

    return (
      <div>
        Des stats
      </div>
    )
}