import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/supabase";
import { PlaylistItem } from "@/types/type.playlist";
import { Check, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function PlaylistEditCommentInputMobile({
    playlistItem,
    setOpen,
} : {
    playlistItem: PlaylistItem,
    setOpen: Dispatch<SetStateAction<boolean>>
}) {
    const [ comment, setComment ] = useState('');

    useEffect(() => {
        setComment(playlistItem.comment ?? '')
    }, [playlistItem.comment])

    const handleSaveComment = async () => {
        if (comment == playlistItem.comment) {
            setOpen(false)
            return ;
        }
        try {
            await supabase
                .from('playlist_item')
                .update({ comment: comment })
                .eq('id', playlistItem.id)
            setComment(comment);
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAbord = () => {
        setComment(playlistItem.comment ?? '');
        setOpen(false);
    }

    return (
        <div className="relative flex flex-col gap-2">
            <Textarea 
                onChange={(e) => setComment(e.target.value.replace(/\s+/g, ' ').trimStart())}
                value={comment}
                placeholder={"Ajouter un commentaire..."}
                maxLength={180}
                className="
                    w-full
                     h-36
                    border-none
                    overflow-hidden
                    resize-none
                    bg-muted
                "
                data-no-dnd="true"
            />
            <Button
                size={'sm'}
                onClick={handleSaveComment}
                data-no-dnd="true"
            >
                Enregistrer
            </Button>
            <Button
                size={'sm'}
                variant={'destructive'}
                className="hover:bg-destructive"
                onClick={handleAbord}
                data-no-dnd="true"
            >
                Annuler
            </Button>
        </div>
    )
}