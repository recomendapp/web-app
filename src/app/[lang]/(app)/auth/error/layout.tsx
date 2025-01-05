import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
  };
}) {
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
