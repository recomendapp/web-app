import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.auth.forgot_password' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}

export default function ForgotPasswordLayout({ children }: ForgotPasswordLayoutProps) {
  return (children);
}
