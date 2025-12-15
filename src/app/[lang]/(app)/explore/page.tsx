import { Metadata } from 'next';
import { Map } from '@/components/Map/Map';
import { truncate } from 'lodash';
import { siteConfig } from '@/config/site';
import { SupportedLocale } from '@/translations/locales';
import { getT } from '@/lib/i18n';

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getT();
  return {
    title: t('pages.explore.metadata.title'),
    description: truncate(t('pages.explore.metadata.description'), { length: siteConfig.seo.description.limit }),
    // alternates: seoLocales(params.lang, '/explore'),
    openGraph: {
      siteName: siteConfig.name,
      title: `${t('pages.explore.metadata.title')} • ${siteConfig.name}`,
      description: truncate(t('pages.explore.metadata.description'), { length: siteConfig.seo.description.limit }),
      // TODO
      // images: [

      // ]
      url: `${siteConfig.url}/${params.lang}/explore`,
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
