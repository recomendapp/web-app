import { siteConfig } from '@/config/site';
import { getT } from '@/lib/i18n';
import { upperFirst } from 'lodash';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: upperFirst(t('common.messages.signup')),
    description: t('pages.auth.signup.metadata.description', { app: siteConfig.name }),
  };
}

interface SignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (children);
}
