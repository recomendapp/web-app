import { useAuth } from "@/context/auth-context";
import { useUserPlaylistsFriendsInfiniteQuery } from "@/features/client/user/userQueries";
import { cn } from "@/lib/utils"
import { CardPlaylist } from "../Card/CardPlaylist";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export const WidgetUserFriendsPlaylists = ({
	className,
} : React.HTMLAttributes<HTMLDivElement>) => {
	const { user } = useAuth();
	const t = useTranslations('widgets');
	const {
		data: playlists,
	} = useUserPlaylistsFriendsInfiniteQuery({
		userId: user?.id,
		filters: {
			resultsPerPage: 8,
		}
	});
	if (!user || !playlists || !playlists.pages[0].length) return null;
	return (
	<div className={cn('@container/widget-user-friends-playlists space-y-4', className)}>
		<Button variant={'link'} className="p-0 w-fit font-semibold text-xl hover:text-primary hover:no-underline cursor-default">
			{t('user_friends_playlists.label')}
		</Button>
		<div className="grid grid-cols-4 @5xl/widget-user-friends-playlists:grid-cols-8 gap-4">
			{playlists.pages[0].map((playlist, index) => (
			<CardPlaylist key={index} playlist={playlist} />
			))}
		</div>
	</div>
  	);
}