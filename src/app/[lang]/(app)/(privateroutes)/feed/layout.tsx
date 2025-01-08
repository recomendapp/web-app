import { ReactNode } from 'react';
import { FeedNavbar } from './_components/FeedNavbar';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';

export async function generateMetadata({
	params,
  }: {
	params: {
	  lang: string;
	};
  }) {
	const t = await getTranslations({ locale: params.lang, namespace: 'routes' });
	return {
	  title: upperFirst(t('feed')),
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