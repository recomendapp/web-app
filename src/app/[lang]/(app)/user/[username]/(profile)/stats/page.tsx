
import { createServerClient } from "@/lib/supabase/supabase-server";
import { notFound } from "next/navigation";

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