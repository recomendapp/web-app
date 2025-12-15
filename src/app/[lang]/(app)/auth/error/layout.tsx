import { getT } from '@/lib/i18n';
import { upperFirst } from 'lodash';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: upperFirst(t('common.messages.an_error_occurred'))
  }
}

interface AuthErrorLayoutProps {
  children: React.ReactNode;
}

export default function AuthErrorLayout({ children }: AuthErrorLayoutProps) {
  return (children);
}
