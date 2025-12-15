import { ReactNode } from 'react';
import { FeedNavbar } from './_components/FeedNavbar';
import { upperFirst } from 'lodash';
import { Metadata } from 'next';
import { getT } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
    title: upperFirst(t('common.messages.feed')),
    robots: {
      index: false,
      follow: false,
    }
  };
}

export default function FeedLayout ({ children } : { children: ReactNode}) {
	return (
		<div className='p-2 flex flex-col items-center'>
			<FeedNavbar />
			{children}
		</div>
	);
};