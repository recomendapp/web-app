import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Feed',
};

export default function FeedLayout ({ children } : { children: ReactNode}) {
	return (children)
};