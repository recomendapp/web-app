import { siteConfig } from "@/config/site";
import { SupportedLocale } from "@/translations/locales";
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
	const t = await getTranslations({ locale: params.lang as SupportedLocale });
	return {
		title: t('pages.legal.terms_of_use.metadata.title'),
		description: t('pages.legal.terms_of_use.metadata.description', { app: siteConfig.name }),
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