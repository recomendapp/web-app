import { SettingsNav } from '@/app/[lang]/(app)/(privateroutes)/settings/_components/SettingsNav';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';

export async function generateMetadata({
	params,
  }: {
	params: {
	  lang: string;
	};
  }) {
	const common = await getTranslations({ locale: params.lang, namespace: 'pages' });
	return {
	  title: upperFirst(common('settings.label')),
	};
}

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const t = useTranslations('pages.settings');
  return (
    <main className="p-4 flex flex-col gap-4">
      <div className="">
        <h2 className="text-2xl font-bold">{t('label')}</h2>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <aside className=" lg:w-1/5">
          <SettingsNav />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </main>
  );
}
