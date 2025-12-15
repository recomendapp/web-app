import { siteConfig } from "@/config/site";
import { getT } from "@/lib/i18n";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT();
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
	</div>
  	);
};

export default PrivacyPolicyPage;