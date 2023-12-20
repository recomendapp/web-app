import { Metadata } from 'next';
import { SettingsNav } from '@/components/Settings/SettingsNav/SettingsNav';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Recomend\'s settings',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const t = useTranslations('settings');
  return (
    <main className="p-4 lg:pt-0 flex flex-col gap-4">
      <div className="">
        <h2 className="text-2xl font-bold">{t('label')}</h2>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>
      {/* <Separator className="my-6" /> */}
      <div className="flex flex-col lg:flex-row gap-4">
        <aside className=" lg:w-1/5">
          <SettingsNav />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </main>
  );
}
