"use client"
import { PlaylistItem } from "@/types/type.playlist"
import PlaylistEditCommentInputDesktop from "./PlaylistEditCommentInputDesktop";
import PlaylistEditCommentBottomSheet from "./PlaylistEditCommentBottomSheet";

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