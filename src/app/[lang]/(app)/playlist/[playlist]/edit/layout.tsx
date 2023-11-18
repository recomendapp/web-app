import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function PlaylistLayout({
    params,
    children
} : {
    params: { playlist: string };
    children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect(`/playlist/${params.playlist}`);

  return [
    <>
        {children}
    </>
  ]
}