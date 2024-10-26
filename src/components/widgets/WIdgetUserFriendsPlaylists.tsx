import { useAuth } from "@/context/auth-context";
import { useUserPlaylistsFriends } from "@/features/user/userQueries";
import { cn } from "@/lib/utils"
import { CardPlaylist } from "../card/CardPlaylist";

export const WidgetUserFriendsPlaylists = ({
	className,
} : React.HTMLAttributes<HTMLDivElement>) => {
	const { user } = useAuth();
	const {
		data: playlists,
		isLoading,
	} = useUserPlaylistsFriends({
		userId: user?.id,
		filters: {
			resultsPerPage: 8,
		}
	});
	if (!user || !playlists || !playlists.pages[0].length) return null;
	return (
	<div className={cn('@container/widget-user-friends-playlists space-y-4', className)} onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); console.log('click on div')}}>
		<h3 className="p-0 w-fit font-semibold text-xl" onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); console.log('click on h3')}}>
		Playlists de vos amis
		</h3>
		<div className="grid grid-cols-4 @5xl/widget-user-friends-playlists:grid-cols-8 gap-4">
			{playlists.pages[0].map((playlist, index) => (
			<CardPlaylist key={index} playlist={playlist} />
			// <div>
			// 	ok
			// </div>
			))}
		</div>
	</div>
  	);
}