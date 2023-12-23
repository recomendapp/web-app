import { Button } from "@/components/ui/button";
import { PlaylistItem } from "@/types/type.playlist";
import { StickyNote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PlaylistEditCommentInputMobile from "./PlaylistEditCommentInputMobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function PlaylistEditCommentBottomSheet({
    playlistItem,
} : {
    playlistItem: PlaylistItem,
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="rounded-full"
                        data-no-dnd="true"
                    >
                        <StickyNote />
                    </Button>
                </DialogTrigger>
                <DialogContent data-no-dnd="true">
                    <DialogHeader>
                        <DialogTitle>Commentaire</DialogTitle>
                    </DialogHeader>
                    <PlaylistEditCommentInputMobile playlistItem={playlistItem} setOpen={setOpen}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}