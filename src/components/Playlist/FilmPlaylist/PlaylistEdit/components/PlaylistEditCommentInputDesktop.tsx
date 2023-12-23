import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/client";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PlaylistEditCommentInputDesktop({
    playlistItem,
} : {
    playlistItem: Database['public']['Tables']['playlist_item']['Row'],
}) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ comment, setComment ] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setComment(playlistItem.comment ?? '')
    }, [playlistItem.comment])

    useEffect(() => {
        if (textAreaRef && textAreaRef.current) {
          textAreaRef.current.style.height = "0px";
          const scrollHeight = textAreaRef.current.scrollHeight;
          textAreaRef.current.style.height = scrollHeight + "px";
        }
    }, [textAreaRef, comment]);

    const handleSaveComment = async () => {
        if (comment == playlistItem.comment) {
            setIsEditing(false)
            return ;
        }
        try {
            await supabase
                .from('playlist_item')
                .update({ comment: comment })
                .eq('id', playlistItem.id)
            setComment(comment);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAbord = () => {
        setComment(playlistItem.comment ?? '');
        setIsEditing(false);
    }

    return (
        <div className="relative flex items-center gap-2">
            <Textarea 
                ref={textAreaRef}
                onChange={(e) => setComment(e.target.value.replace(/\s+/g, ' ').trimStart())}
                value={comment}
                readOnly={!isEditing}
                placeholder={"Ajouter un commentaire..."}
                maxLength={180}
                className={`
                    w-full
                    h-fit
                    border-none
                    overflow-hidden
                    resize-none
                    bg-muted
                    group-hover:bg-background
                    transition
                    ${!isEditing && 'line-clamp-5'}
                `}
                data-no-dnd="true"
                onClick={() => {
                    // if (!comment)
                    setIsEditing(true)
                }}
            />
           <div>
                <Button
                    size={'sm'}
                    variant={'ghost'}
                    className={`
                        ${isEditing ? 'opacity-100' : 'opacity-0'}
                    `}
                    onClick={handleSaveComment}
                    data-no-dnd="true"
                >
                    <Check />
                </Button>
                <Button
                    size={'sm'}
                    variant={'ghost'}
                    className={`
                        hover:bg-destructive
                        ${isEditing ? 'opacity-100' : 'opacity-0'}
                    `}
                    onClick={handleAbord}
                    data-no-dnd="true"
                >
                    <X />
                </Button>
           </div>
        </div>
    )
}