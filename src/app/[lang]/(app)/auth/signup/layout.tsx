import { siteConfig } from '@/config/site';
import { upperFirst } from 'lodash';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.auth.signup' });
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  return {
    title: upperFirst(common('messages.signup')),
    description: t('metadata.description', { app: siteConfig.name }),
  };
}

interface SignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (children);
}
