import { Metadata } from 'next';
import { ReactNode } from 'react';
import { FeedNavbar } from './_components/FeedNavbar';

export const metadata: Metadata = {
	title: 'Feed',
};

export default function FeedLayout ({ children } : { children: ReactNode}) {
	return (
		<div className='p-2 flex flex-col items-center'>
			<FeedNavbar />
			{children}
		</div>
	);
};