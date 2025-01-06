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
	  title: capitalize(common('library.collection.guidelist.label')),
	};
}

export default function GuidelistLayout ({ children } : { children: ReactNode}) {
	return (children)
};