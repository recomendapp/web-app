import { Header } from "@/components/Header/Header";
import { AppLayout } from "@/layouts/app-layout/AppLayout";
import { createServerClient } from "@/lib/supabase/server";

interface AppLayoutProps {
  children: React.ReactNode;
}
export default async function RootLayout({ children }: AppLayoutProps) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    // <AppLayout
    //   header={<Header/>}
    // >
    <AppLayout isLogged={!!user}>
      {children}
    </AppLayout>
  );
}