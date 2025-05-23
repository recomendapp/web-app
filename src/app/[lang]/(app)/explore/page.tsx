import { Metadata } from 'next';
import { Map } from '@/components/Map/Map';
import { getTranslations } from 'next-intl/server';
import { truncate } from 'lodash';
import { siteConfig } from '@/config/site';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang, namespace: 'pages.explore' });
  return {
    title: t('metadata.title'),
    description: truncate(t('metadata.description'), { length: siteConfig.seo.description.limit }),
    alternates: {
      canonical: `${siteConfig.url}/explore`,
    },
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('metadata.title')} • ${siteConfig.name}`,
      description: truncate(t('metadata.description'), { length: siteConfig.seo.description.limit }),
      // TODO
      // images: [

      // ]
      url: `${siteConfig.url}/explore`,
      type: 'website',
      locale: params.lang,
    },
  };
};

export default function MapPage(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
) {
  return <Map />;
}
