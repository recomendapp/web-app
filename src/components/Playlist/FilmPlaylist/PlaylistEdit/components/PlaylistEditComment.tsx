"use client"
import { PlaylistItem } from "@/types/type.playlist"
import PlaylistEditCommentInputDesktop from "@/components/Playlist/FilmPlaylist/PlaylistEdit/components/PlaylistEditCommentInputDesktop";
import PlaylistEditCommentBottomSheet from "@/components/Playlist/FilmPlaylist/PlaylistEdit/components/PlaylistEditCommentBottomSheet";

export default function PlaylistEditComment({
    playlistItem,
} : {
    playlistItem: PlaylistItem,
}) {

    return (
        <>
            <div className="hidden text-right @xl:block @xl:text-left">
                <PlaylistEditCommentInputDesktop playlistItem={playlistItem} />
            </div>
            <div className="block text-right @xl:hidden @xl:text-left">
                <PlaylistEditCommentBottomSheet playlistItem={playlistItem} />
            </div>
            {/* {playlistItem.comment} */}
            
        </>
    )
}