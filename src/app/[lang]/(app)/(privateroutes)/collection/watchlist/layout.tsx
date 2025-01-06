import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

export async function generateMetadata({
	params,
}: {
	params: {
	  lang: string;
	};
}) {
	const common = await getTranslations({ locale: params.lang, namespace: 'common' });
	return {
	  title: common('library.collection.watchlist.label'),
	};
}

export default function WatchlistLayout ({ children } : { children: ReactNode}) {
	return (children)
};