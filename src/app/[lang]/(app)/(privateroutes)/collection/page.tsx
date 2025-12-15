import { upperFirst } from 'lodash';
import { Metadata } from 'next';
import Collection from './_components/Collection';
import { getT } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: upperFirst(t('common.messages.library')),
    robots: {
      index: false,
      follow: false,
    }
  };
}

export default function CollectionPage () {
	return <Collection />
};