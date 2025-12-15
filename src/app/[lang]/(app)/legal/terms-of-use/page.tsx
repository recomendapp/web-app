import { siteConfig } from "@/config/site";
import { getT } from "@/lib/i18n";
import { Metadata } from "next";

export async function generateMetadata(
  props: {
    params: Promise<{
      lang: string;
    }>;
    }
): Promise<Metadata> {
	const params = await props.params;
	const { t } = await getT();
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