import { capitalize } from 'lodash';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Collection from './_components/Collection';

export async function generateMetadata(
  props: {
      params: Promise<{
        lang: string;
      }>;
    }
): Promise<Metadata> {
  const params = await props.params;
  const common = await getTranslations({ locale: params.lang, namespace: 'common' });
  return {
    title: capitalize(common('library.label')),
    robots: {
      index: false,
      follow: false,
    }
  };
}

export default function CollectionPage () {
	return <Collection />
};