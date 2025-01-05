import { siteConfig } from '@/config/site';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.auth.signup' });
  const word = await getTranslations({ locale: params.lang, namespace: 'word' });
  return {
    title: word('signup'),
    description: t('metadata.description', { app: siteConfig.name }),
  };
}

interface SignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (children);
}
