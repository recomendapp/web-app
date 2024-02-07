import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: 'Watchlist',
};

export default function WatchlistLayout ({ children } : { children: ReactNode}) {
	return (children)
};