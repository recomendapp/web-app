import { useT } from "@/lib/i18n/client";
import { LegalNav } from "./_components/LegalNav";
import { siteConfig } from "@/config/site";

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
	const { t } = useT();
	return (
		<div className="p-4 flex flex-col gap-4">
			<div className="">
			<h2 className="text-2xl font-bold">{t('pages.legal.label')}</h2>
			<p className="text-muted-foreground">{t('pages.legal.description', { app: siteConfig.name })}</p>
			</div>
			<div className="flex flex-col lg:flex-row gap-4">
			<aside className=" lg:w-1/5">
				<LegalNav />
			</aside>
			<div className="flex-1 lg:max-w-2xl">{children}</div>
			</div>
		</div>
	);
};

export default LegalLayout;