'use client';

import { useAuth } from "@/context/auth-context";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import { useUI } from "@/context/ui-context";
import HeaderRightSide from "@/components/Header/HeaderRightSide";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetMoviesMostRecommended } from "@/components/widgets/WidgetMoviesMostRecommended";
import { WidgetRecomendShowcase } from "@/components/widgets/WidgetRecomendShowcase";
import { WidgetUserMovieGuidelist } from "@/components/widgets/WidgetUserMovieGuidelist";
import { WidgetUserMovieWatchlist } from "@/components/widgets/WidgetUserMovieWatchlist";
import { WidgetUserFriendsPlaylists } from "@/components/widgets/WIdgetUserFriendsPlaylists";
import { WidgetUserFeed } from "@/components/widgets/WidgetUserFeed";
import { WidgetUserDiscovery } from "@/components/widgets/WidgetUserDiscovery";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
							{`${common('word.hello')} `}
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
			<div className="flex text-4xl font-bold col-span-full">
			</div>
			<WidgetMoviesMostRecommended className='col-span-full' />
			{!session ? (
				// Only non-logged users
				<>
				<Button variant="accent-1" className="col-span-full m-auto max-w-lg" asChild>
					<Link href="/auth/login">C&apos;est parti 🎬, c&apos;est gratuit !</Link>
				</Button>
				<WidgetRecomendShowcase className='col-span-full'/>
				</>
			) : null}
			{session ? (
				// Only logged users
				<>
				<WidgetUserMovieGuidelist />
				<WidgetUserMovieWatchlist />
				<WidgetUserFriendsPlaylists />
				<WidgetUserFeed />
				<WidgetUserDiscovery className="h-[600px]" />
				</>
			) : null}
		</div>
	);
}
