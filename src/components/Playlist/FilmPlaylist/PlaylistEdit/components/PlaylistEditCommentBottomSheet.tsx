import { Button } from "@/components/ui/button";
import { PlaylistItem } from "@/types/type.playlist";
import { StickyNote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import PlaylistEditCommentInputMobile from "@/components/Playlist/FilmPlaylist/PlaylistEdit/components/PlaylistEditCommentInputMobile";

export default function PlaylistEditCommentBottomSheet({
    playlistItem,
} : {
    playlistItem: PlaylistItem,
}) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <div className="lg:hidden">
            <Button
                variant={'ghost'}
                size={'icon'}
                className="rounded-full"
                onClick={() => setOpen(!open)}
                data-no-dnd="true"
            >
                <StickyNote />
            </Button>
            <BottomSheet
                open={open}
                onDismiss={() => setOpen(false)}
                snapPoints={({ maxHeight }) => [contentRef?.current?.clientHeight + 50 + 80, contentRef?.current?.clientHeight + 50 + 80]}
                defaultSnap={0.83}
                // blocking={false}
                className="lg:hidden z-[100]"
                data-no-dnd="true"
            >
                <div ref={contentRef} className="flex flex-col gap-2 px-4">
                    <p className="text-center text-2xl">Commentaire</p>
                    <PlaylistEditCommentInputMobile playlistItem={playlistItem} setOpen={setOpen}/>
                </div>
            </BottomSheet>
        </div>
    );
}