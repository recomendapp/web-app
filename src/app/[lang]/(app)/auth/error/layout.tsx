import { getTranslations } from 'next-intl/server';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang, namespace: 'common' });
  return {
    title: t('error'),
  }
}

interface AuthErrorLayoutProps {
  children: React.ReactNode;
}

export default function AuthErrorLayout({ children }: AuthErrorLayoutProps) {
  return (children);
}
