import { Fragment } from 'react';
import { getProfile } from './_components/getProfile';
import { upperFirst } from 'lodash';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config/site';

export async function generateMetadata({
  params,
}: {
  params: { lang: string, username: string };
}) {
  const common = await getTranslations({ lang: params.lang, namespace: 'common' });
  const t = await getTranslations({ lang: params.lang, namespace: 'pages' });
  const user = await getProfile(params.username);
  if (!user) return {
      title: upperFirst(common('errors.user_not_found')),
  };
  return {
    title: upperFirst(t('user.metadata.title', { full_name: user.full_name, username: user.username })),
    description: upperFirst(t('user.metadata.description', { username: user.username, app: siteConfig.name })),
  };
}

interface UserLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

export default async function UserLayout({
  children,
}: UserLayoutProps) {

  return <Fragment>{children}</Fragment>;
}
