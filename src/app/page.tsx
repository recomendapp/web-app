import Dashboard from "@/components/Dashboard/Dashboard";
import Welcome from "@/components/Welcome/Welcome";
import { createServerClient } from "@/lib/supabase/supabase-server";
import { Fragment } from "react";

export default async function Home() {
  const supabaseServer = createServerClient()
  const { data: { session } } = await supabaseServer.auth.getSession();
  return (
    <Fragment>
      { session ?
        <Dashboard />
      :
        <Welcome />
      }

    </Fragment>
  );
}
