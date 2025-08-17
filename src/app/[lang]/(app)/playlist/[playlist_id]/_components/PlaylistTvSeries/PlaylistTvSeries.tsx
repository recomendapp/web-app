import { Playlist, PlaylistItemTvSeries } from "@/types/type.db";
import { PlaylistTvSeriesHeader } from "./PlaylistTvSeriesHeader";
import { usePlaylistIsAllowedToEditQuery, usePlaylistItemsTvSeriesQuery } from "@/features/client/playlist/playlistQueries";
import { useEffect, useMemo, useState } from "react";
import PlaylistTvSeriesTable from "./PlaylistTvSeriesTable/PlaylistTvSeriesTable";
import useDebounce from "@/hooks/use-debounce";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useAuth } from "@/context/auth-context";
import { useSupabaseClient } from "@/context/supabase-context";
import { usePlaylistItemsTvSeriesRealtimeMutation } from "@/features/client/playlist/playlistMutations";

interface PlaylistTvSeriesProps extends React.ComponentProps<'div'> {
	playlist: Playlist;
}

export const PlaylistTvSeries = ({
	playlist,
} : PlaylistTvSeriesProps) => {
	const { session } = useAuth();
	const supabase = useSupabaseClient();
	// Queries
	const {
		data: items,
		isLoading,
		refetch,
	} = usePlaylistItemsTvSeriesQuery({
		playlistId: playlist.id
	});
	const { data: isAllowedToEdit } = usePlaylistIsAllowedToEditQuery({
		playlistId: playlist.id,
		userId: session?.user.id,
	});
	
	// Mutations
	const playlistItemsRealtime = usePlaylistItemsTvSeriesRealtimeMutation({
		playlistId: playlist.id,
	});

	// States
	const [shouldRefresh, setShouldRefresh] = useState(false);
  	const debouncedRefresh = useDebounce(shouldRefresh, 200);
	const [playlistItems, setPlaylistItems] = useState<PlaylistItemTvSeries[]>(items || []);
	const backdrops = useMemo(() => items?.map(item => item.tv_series.backdrop_path).filter(src => src !== null && src !== undefined), [items]);

	// useEffects
	useEffect(() => {
		if (isAllowedToEdit) {
			let playlistItemsChanges: RealtimeChannel;
			const setupRealtime = async () => {
				if (!session)  return;
				await supabase.realtime.setAuth(session.access_token);
				playlistItemsChanges = supabase
					.channel(`playlist:${playlist.id}`, {
					config: { private: true },
					})
					.on('broadcast', { event: '*' }, ({ event, payload } : { event: string, payload: { old: PlaylistItemTvSeries, new: PlaylistItemTvSeries } }) => {
						playlistItemsRealtime.mutate({
							event,
							payload,
						});
					})
					.subscribe();
				return playlistItemsChanges;
			}
			setupRealtime().catch(console.error);

			return () => {
			if (playlistItemsChanges) {
				supabase.removeChannel(playlistItemsChanges);
			}
			};
		}
	}, [isAllowedToEdit]);
	

	useEffect(() => {
		if (debouncedRefresh) {
			refetch();
			setShouldRefresh(false);
		}
	}, [debouncedRefresh, refetch]);
	useEffect(() => {
		if (items) {
			setPlaylistItems(items);
		}
	}, [items]);

	return (
		<div>
			<PlaylistTvSeriesHeader
			playlist={playlist}
			numberItems={playlistItems.length}
			backdrops={backdrops || []}
			/>
			{items && (
				<PlaylistTvSeriesTable playlist={playlist} playlistItems={playlistItems} setPlaylistItems={setPlaylistItems} />
			)}
		</div>
	)
}