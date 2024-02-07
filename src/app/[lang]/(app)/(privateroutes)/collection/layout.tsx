import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Bibliothèque',
};

export default function CollectionLayout ({ children } : { children: ReactNode}) {
	return (children)
};