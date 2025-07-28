import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
    }
): Promise<Metadata> {
	const params = await props.params;
	const t = await getTranslations({ locale: params.lang, namespace: 'pages.legal.terms_of_use.metadata' });
	return {
		title: t('title'),
		description: t('description', { app: siteConfig.name }),
	};
};

const TermsOfUsePage = () => {
	return (
		<div>
			<h1>Terms of Use</h1>
			<p>This is the terms of use for our application.</p>
			{/* Add more content as needed */}
		</div>
	);
};

export default TermsOfUsePage;