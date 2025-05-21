import { capitalize } from "lodash";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

export async function generateMetadata(
    props: {
        params: Promise<{
          lang: string;
        }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const common = await getTranslations({ locale: params.lang, namespace: 'common' });
    return {
	  title: capitalize(common('library.collection.my_recos.label')),
	};
}

export default function MyRecosLayout ({ children } : { children: ReactNode}) {
	return (children)
};