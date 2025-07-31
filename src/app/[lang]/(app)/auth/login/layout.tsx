import { siteConfig } from '@/config/site';
import { upperFirst } from 'lodash';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { noSSR } from 'next/dynamic';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.auth.login' });
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  return {
    title: upperFirst(common('messages.login')),
    description: t('metadata.description', { app: siteConfig.name }),
  };
}

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (children);
}
