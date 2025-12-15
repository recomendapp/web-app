import { Upgrade } from './_components/Upgrade';
import { upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import { getT } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: upperFirst(t('pages.upgrade.metadata.title')),
    description: upperFirst(t('pages.upgrade.metadata.description', { app: siteConfig.name })),
  };
}

export default async function UpgradePage() {
  return <Upgrade />;
}
