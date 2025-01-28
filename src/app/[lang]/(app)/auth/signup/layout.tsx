import { siteConfig } from '@/config/site';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.auth.signup' });
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  return {
    title: common('word.signup'),
    description: t('metadata.description', { app: siteConfig.name }),
  };
}

interface SignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (children);
}
