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
		title: t('pages.legal.privacy_policy.metadata.title'),
		description: t('pages.legal.privacy_policy.metadata.description', { app: siteConfig.name }),
	};
};

const PrivacyPolicyPage = () => {
	return (
	<div>
	  <h1>Privacy Policy</h1>
	  <p>This is the privacy policy for our application.</p>
	  {/* Add more content as needed */}
	</div>
  	);
};

export default PrivacyPolicyPage;