import { Playlist, PlaylistItemMovie } from "@recomendapp/types/dist";
import { PlaylistMovieHeader } from "./PlaylistMovieHeader";
import { usePlaylistIsAllowedToEditQuery, usePlaylistItemsMovieQuery } from "@/features/client/playlist/playlistQueries";
import { useEffect, useMemo, useState } from "react";
import PlaylistMovieTable from "./PlaylistMovieTable/PlaylistMovieTable";
import useDebounce from "@/hooks/use-debounce";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useAuth } from "@/context/auth-context";
import { useSupabaseClient } from "@/context/supabase-context";
import { usePlaylistItemsMovieRealtimeMutation } from "@/features/client/playlist/playlistMutations";

interface PlaylistMovieProps extends React.ComponentProps<'div'> {
	playlist: Playlist;
}

export const PlaylistMovie = ({
	playlist,
} : PlaylistMovieProps) => {
	const { session } = useAuth();
	const supabase = useSupabaseClient();
	// Queries
	const {
		data: items,
		isLoading,
		refetch,
	} = usePlaylistItemsMovieQuery({
		playlistId: playlist.id
	});
	const { data: isAllowedToEdit } = usePlaylistIsAllowedToEditQuery({
		playlistId: playlist.id,
		userId: session?.user.id,
	});
	
	// Mutations
	const playlistItemsRealtime = usePlaylistItemsMovieRealtimeMutation({
		playlistId: playlist.id,
	});

	// States
	const [shouldRefresh, setShouldRefresh] = useState(false);
  	const debouncedRefresh = useDebounce(shouldRefresh, 200);
	const [playlistItems, setPlaylistItems] = useState<PlaylistItemMovie[]>(items || []);
	const backdrops = useMemo(() => items?.map(item => item.movie.backdrop_path).filter(src => src !== null && src !== undefined), [items]);

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
					.on('broadcast', { event: '*' }, ({ event, payload } : { event: string, payload: { old: PlaylistItemMovie, new: PlaylistItemMovie } }) => {
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
			<PlaylistMovieHeader
			playlist={playlist}
			numberItems={playlistItems.length}
			backdrops={backdrops || []}
			/>
			{items && (
				<PlaylistMovieTable playlist={playlist} playlistItems={playlistItems} setPlaylistItems={setPlaylistItems} />
			)}
		</div>
	)
}