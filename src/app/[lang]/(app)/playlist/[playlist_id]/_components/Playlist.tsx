'use client';
import { usePlaylistQuery } from "@/features/client/playlist/playlistQueries";
import { Playlist as TPlaylist } from "@recomendapp/types/dist";
import { PlaylistMovie } from "./PlaylistMovie/PlaylistMovie";
import { PlaylistTvSeries } from "./PlaylistTvSeries/PlaylistTvSeries";

interface PlaylistProps extends React.ComponentProps<'div'> {
	playlist: TPlaylist;
}

export const Playlist = ({
	playlist: playlistProps,
} : PlaylistProps) => {
	const {
		data: playlist,
	} = usePlaylistQuery({
		playlistId: playlistProps.id,
		initialData: playlistProps,
	});
	if (!playlist) return null;
	return (
		<div className="h-full">
			{playlist.type === 'movie' ? (
				<PlaylistMovie playlist={playlist} />
			) : playlist.type === 'tv_series' ? (
				<PlaylistTvSeries playlist={playlist} />
			) : null}
		</div>
	)
};