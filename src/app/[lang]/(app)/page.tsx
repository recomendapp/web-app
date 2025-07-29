'use client';

import { useAuth } from "@/context/auth-context";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import { useUI } from "@/context/ui-context";
import HeaderRightSide from "@/components/Header/HeaderRightSide";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetRecomendShowcase } from "@/components/widgets/WidgetRecomendShowcase";
import { WidgetUserFriendsPlaylists } from "@/components/widgets/WIdgetUserFriendsPlaylists";
import { WidgetUserFeed } from "@/components/widgets/WidgetUserFeed";
import { WidgetUserDiscovery } from "@/components/widgets/WidgetUserDiscovery";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import { upperFirst } from "lodash";
import { WidgetMostRecommended } from "@/components/widgets/WidgetMostRecommended";
import { WidgetUserRecos } from "@/components/widgets/WidgetUserRecos";
import { WidgetUserWatchlist } from "@/components/widgets/WidgetUserWatchlist";

export default function Home() {
	const { session, user } = useAuth();
	const { device } = useUI();
	const common = useTranslations('common');
	return (
		<div className="p-4 gap-4 gap-x-8 grid grid-cols-1 @4xl/main:grid-cols-2">
			<div className="flex justify-between items-center w-full">
				<div className="flex gap-2 items-center text-xl md:text-4xl">
					{session ?
					(
						<span className="line-clamp-1 break-all">
							{`${upperFirst(common('messages.hello'))} `}
							{user?.full_name ?? <Skeleton className='w-32' />}
						</span>
					) : (
						<span className="line-clamp-2 break-all">
							{`Bienvenue sur ${siteConfig.name}.`}
						</span>
					)}
				</div>
				{device === "mobile" ? <HeaderRightSide /> : null}
			</div>
			<WidgetMostRecommended className='col-span-full' />
			{!session ? (
				// Only non-logged users
				<>
				<Button variant="accent-yellow" className="col-span-full m-auto max-w-lg" asChild>
					<Link href="/auth/login">{upperFirst(common('messages.get_started_its_free'))}</Link>
				</Button>
				<WidgetRecomendShowcase className='col-span-full'/>
				</>
			) : null}
			{session ? (
				// Only logged users
				<>
				<WidgetUserRecos />
				<WidgetUserWatchlist />
				<WidgetUserFriendsPlaylists />
				<WidgetUserFeed />
				<WidgetUserDiscovery className="h-[600px]" />
				</>
			) : null}
		</div>
	);
}