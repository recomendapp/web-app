import { capitalize } from "lodash";
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
	  title: capitalize(common('library.collection.my_recos.label')),
	};
}

export default function MyRecosLayout ({ children } : { children: ReactNode}) {
	return (children)
};