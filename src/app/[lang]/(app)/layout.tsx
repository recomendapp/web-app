import { AppLayout } from "@/layouts/app-layout/AppLayout";

interface AppLayoutProps {
  children: React.ReactNode;
}
export default async function RootLayout({ children }: AppLayoutProps) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}