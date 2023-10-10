import { Metadata } from 'next';
import { SettingsNav } from '@/components/User/UserSettings/SettingsNav/SettingsNav';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Recomend\'s settings',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <main className="space-y-6 p-10 pb-16 ">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground">
          Gérez les paramètres de votre compte.
        </p>
      </div>
      {/* <Separator className="my-6" /> */}
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SettingsNav />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </main>
  );
}
