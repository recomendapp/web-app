import { useAuth } from "@/context/auth-context";
import { useUserPlaylistsFriendsInfiniteQuery } from "@/features/client/user/userQueries";
import { cn } from "@/lib/utils"
import { CardPlaylist } from "../Card/CardPlaylist";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";

export const WidgetUserFriendsPlaylists = ({
	className,
} : React.HTMLAttributes<HTMLDivElement>) => {
	const { session } = useAuth();
	const t = useTranslations('common');
	const {
		data: playlists,
	} = useUserPlaylistsFriendsInfiniteQuery({
		userId: session?.user.id,
		filters: {
			resultsPerPage: 8,
		}
	});
	if (!session || !playlists || !playlists.pages[0].length) return null;
	return (
	<div className={cn('@container/widget-user-friends-playlists space-y-4', className)}>
		<Button variant={'link'} className="p-0 w-fit font-semibold text-xl hover:text-primary hover:no-underline cursor-default">
			{upperFirst(t('messages.friends_playlists'))}
		</Button>
		<div className="grid grid-cols-4 @5xl/widget-user-friends-playlists:grid-cols-8 gap-4">
			{playlists.pages[0].map((playlist, index) => (
			<CardPlaylist key={index} playlist={playlist} />
			))}
		</div>
	</div>
  	);
}