'use client';

import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils"
import { WidgetMoviesMostRecommended } from "../widgets/WidgetMoviesMostRecommended";
import { WidgetRecomendShowcase } from "../widgets/WidgetRecomendShowcase";
import { WidgetUserMovieGuidelist } from "../widgets/WidgetUserMovieGuidelist";
import { WidgetUserMovieWatchlist } from "../widgets/WidgetUserMovieWatchlist";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import { WidgetUserFeed } from "../widgets/WidgetUserFeed";
import { WidgetUserFriendsPlaylists } from "../widgets/WIdgetUserFriendsPlaylists";

export const Dashboard = ({
	isLogged,
	className,
} : React.HTMLAttributes<HTMLDivElement> & { isLogged: boolean }) => {
	const { user } = useAuth();
	const t = useTranslations('word');
	return (
		<div className={cn('p-4 gap-4 grid grid-cols-1 @4xl/main:grid-cols-2', className)}>
			<div className="text-4xl font-bold col-span-full">
				{isLogged ? `${t('hello')} ${user?.full_name}` : `Bienvenue sur ${siteConfig.name}.`}
			</div>
			<WidgetMoviesMostRecommended isLogged={isLogged} className='col-span-full' />
			{!isLogged ? <WidgetRecomendShowcase className='col-span-full'/> : null}
			{isLogged ? (
				<>
				<WidgetUserMovieGuidelist />
				<WidgetUserMovieWatchlist />
				<WidgetUserFriendsPlaylists />
				<WidgetUserFeed className="h-[500px]"/>
				</>
			) : null}
		</div>
	);
}