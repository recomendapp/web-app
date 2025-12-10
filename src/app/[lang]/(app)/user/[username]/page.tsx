import { notFound } from 'next/navigation';
import { truncate, upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import { seoLocales } from '@/lib/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { SupportedLocale } from '@/translations/locales';
import { getProfile } from '@/features/server/users';
import { ProfileFeed } from './_components/ProfileFeed';

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string, username: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang as SupportedLocale });
  const user = await getProfile(params.username);
  if (!user) return {
      title: upperFirst(t('common.messages.user_not_found')),
  };
  return {
    title: upperFirst(t('pages.user.metadata.title', { full_name: user.full_name!, username: user.username! })),
    description: truncate(upperFirst(t('pages.user.metadata.description', { username: user.username!, app: siteConfig.name })), { length: siteConfig.seo.description.limit }),
    alternates: seoLocales(params.lang, `/@${user.username}`),
    openGraph: {
      siteName: siteConfig.name,
      title: `${upperFirst(t('pages.user.metadata.title', { full_name: user.full_name!, username: user.username! }))} • ${siteConfig.name}`,
      description: truncate(upperFirst(t('pages.user.metadata.description', { username: user.username!, app: siteConfig.name })), { length: siteConfig.seo.description.limit }),
      url: `${siteConfig.url}/${params.lang}/@${user.username}`,
      images: user.avatar_url ? [
        { url: user.avatar_url },
      ] : undefined,
      type: 'profile',
      locale: params.lang,
    },
  };
}

export default async function UserPage(
  props: {
    params: Promise<{ username: string }>;
  }
) {
  const params = await props.params;
  const user = await getProfile(params.username);
  if (!user) return notFound();
  return (
    <ProfileFeed profile={user} />
  );
}
