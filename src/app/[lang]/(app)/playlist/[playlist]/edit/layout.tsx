import { createServerClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";
export default async function PlaylistLayout({
    params,
    children
} : {
    params: { playlist: string };
    children: React.ReactNode;
}) {
  const supabaseServer = createServerClient();
  const { data: { session } } = await supabaseServer.auth.getSession();

  if (!session) redirect(`/playlist/${params.playlist}`);

  return [
    <>
        {children}
    </>
  ]
}