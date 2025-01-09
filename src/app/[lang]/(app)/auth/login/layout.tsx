import { siteConfig } from '@/config/site';
import { getTranslations } from 'next-intl/server';
import { noSSR } from 'next/dynamic';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.auth.login' });
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  return {
    title: common('word.login'),
    description: t('metadata.description', { app: siteConfig.name }),
  };
}

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (children);
}
