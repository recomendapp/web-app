import { SettingsNav } from '@/app/[lang]/(app)/(privateroutes)/settings/_components/SettingsNav';
import { upperFirst } from 'lodash';
import { Metadata } from 'next';
import { getT } from '@/lib/i18n';

export const generateMetadata = async (): Promise<Metadata> => {
  const { t } = await getT();
  return {
    title: upperFirst(t('pages.settings.label')),
    robots: {
      index: false,
      follow: false,
    }
  };
}

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = async ({ children }: SettingsLayoutProps) => {
  const { t } = await getT();
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="">
        <h2 className="text-2xl font-bold">{t('pages.settings.label')}</h2>
        <p className="text-muted-foreground">{t('pages.settings.description')}</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <aside className=" lg:w-1/5">
          <SettingsNav />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}

export default SettingsLayout;