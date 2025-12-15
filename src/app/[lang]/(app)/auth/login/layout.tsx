import { siteConfig } from '@/config/site';
import { getT } from '@/lib/i18n';
import { upperFirst } from 'lodash';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: upperFirst(t('common.messages.login')),
    description: t('pages.auth.login.metadata.description', { app: siteConfig.name }),
  };
}

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (children);
}
