import { truncate, upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';
import { getProfile } from '@/features/server/users';
import { Metadata } from 'next';
import { seoLocales } from '@/lib/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string, username: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.user.metadata' });
  const user = await getProfile(params.username);
  if (!user) return {
      title: upperFirst(common('errors.user_not_found')),
  };
  return {
    title: upperFirst(t('title', { full_name: user.full_name!, username: user.username! })),
    description: truncate(upperFirst(t('description', { username: user.username!, app: siteConfig.name })), { length: siteConfig.seo.description.limit }),
    alternates: {
      canonical: `${siteConfig.url}/@${user.username}`,
      languages: Object.fromEntries([
        ['x-default', `${siteConfig.url}/@${user.username}`],
        ...seoLocales.map((locale) => [locale, `${siteConfig.url}/${locale}/@${user.username}`])
      ])
    },
    openGraph: {
      siteName: siteConfig.name,
      title: `${upperFirst(t('title', { full_name: user.full_name!, username: user.username! }))} • ${siteConfig.name}`,
      description: truncate(upperFirst(t('description', { username: user.username!, app: siteConfig.name })), { length: siteConfig.seo.description.limit }),
      url: `${siteConfig.url}/${params.lang}/@${user.username}`,
      images: user.avatar_url ? [
        { url: user.avatar_url },
      ] : undefined,
      type: 'profile',
      locale: params.lang,
    },
  };
}

export default async function UserLayout(
  props: {
    params: Promise<{
      lang: string,
      username: string
    }>;
    children: React.ReactNode;
  }
) {

  return props.children;
}
