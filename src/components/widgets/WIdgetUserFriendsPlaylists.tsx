import { useAuth } from "@/context/auth-context";
import { useUserPlaylistsFriends } from "@/features/user/userQueries";
import { cn } from "@/lib/utils"
import { CardPlaylist } from "../card/CardPlaylist";
import { Button } from "../ui/button";

export const WidgetUserFriendsPlaylists = ({
	className,
} : React.HTMLAttributes<HTMLDivElement>) => {
	const { user } = useAuth();
	const {
		data: playlists,
	} = useUserPlaylistsFriends({
		userId: user?.id,
		filters: {
			resultsPerPage: 8,
		}
	});
	if (!user || !playlists || !playlists.pages[0].length) return null;
	return (
	<div className={cn('@container/widget-user-friends-playlists space-y-4', className)}>
		<Button variant={'link'} className="p-0 w-fit font-semibold text-xl hover:text-primary hover:no-underline cursor-default">
			Playlists de vos amis
		</Button>
		<div className="grid grid-cols-4 @5xl/widget-user-friends-playlists:grid-cols-8 gap-4">
			{playlists.pages[0].map((playlist, index) => (
			<CardPlaylist key={index} playlist={playlist} />
			))}
		</div>
	</div>
  	);
}