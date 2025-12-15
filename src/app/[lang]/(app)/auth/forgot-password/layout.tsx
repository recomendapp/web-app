import { getT } from '@/lib/i18n';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: t('pages.auth.forgot_password.metadata.title'),
    description: t('pages.auth.forgot_password.metadata.description'),
  };
}

interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}

export default function ForgotPasswordLayout({ children }: ForgotPasswordLayoutProps) {
  return (children);
}
