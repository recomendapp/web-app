import { useAuth } from "@/context/auth-context";
import { Inbox } from "@novu/react";
import { createHmac } from "crypto";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const tabs = [
	{
	  label: 'All Notifications',
	  filter: { tags: [] },
	},
	{
	  label: 'Général',
	  filter: { tags: ['general'] },
	}
  ];

export const NovuInbox = () => {
	const { user } = useAuth();
	const locale = useLocale();
	const router = useRouter();
	const hmac = (subscriberId: string, secret: string) => {
		return createHmac('sha256', secret)
			.update(subscriberId)
			.digest('hex');
	}
	if (!user) return null;
	return (
	<Inbox
	applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER!}
	subscriberId={user.id}
	subscriberHash={hmac(user.id, process.env.NEXT_PUBLIC_NOVU_API_KEY!)}
	tabs={tabs}
	// backendUrl="https://eu.api.novu.co"
  	// socketUrl="https://eu.ws.novu.co"
	routerPush={(path) =>  router.push(path)}
	localization={{
		locale: locale,
	}}
	/>
	)
};