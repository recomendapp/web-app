import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { PlaylistItem } from "@/types/type.playlist";
import { useMutation } from "@apollo/client";
import { Column, Row, Table } from "@tanstack/react-table";
import { Check, Cross, FileEdit, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import UPDATE_PLAYLIST_ITEM_MUTATION from '@/components/modules/MoviePlaylist/mutations/updatePlaylistItemMutation'
import { supabase } from "@/lib/supabase/supabase";

export function DataComment({
    data,
    table,
    row,
    column,
} : {
    data: PlaylistItem,
    table: Table<PlaylistItem>,
    row: Row<PlaylistItem>,
    column: Column<PlaylistItem, unknown>,
}) {

    const { user } = useAuth();
    const [ backup, setBackup ] = useState("");
    const [ comment, setComment ] = useState("");
    const [ edit, setEdit ] = useState(false);  

    useEffect(() => {
        setComment(data.comment ?? '')
        setBackup( data.comment ?? '')
    }, [data])

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
      useEffect(() => {
        if (textAreaRef && textAreaRef.current) {
          textAreaRef.current.style.height = "0px";
          const scrollHeight = textAreaRef.current.scrollHeight;
          textAreaRef.current.style.height = scrollHeight + "px";
        }
      }, [textAreaRef, comment]);

      const handleSaveComment = async () => {
        if (comment == backup) {
            setEdit(false)
            return ;
        }
        try {
            await supabase
                .from('playlist_item')
                .update({ comment: comment })
                .eq('id', data.id)
            table.options.meta?.updateComment(row.index, comment);
            setBackup(comment);
            toast.success("Le commentaire a été mis à jour");
            setEdit(false);
        } catch (error) {
            console.log(error);
        }
        
      }

      const handleAbord = () => {
        setComment(backup);
        setEdit(false);
      }
  
    return (
        <div className="relative flex flex-col gap-2 group/edit">
            <Textarea 
                ref={textAreaRef}
                onChange={(e) => setComment(e.target.value.replace(/\s+/g, ' ').trimStart())}
                value={comment}
                readOnly={!edit}
                placeholder={data.user?.id == user?.id ? "Ajouter un commentaire..." : ""}
                maxLength={180}
                className={`
                    w-full
                    h-fit
                    border-none
                    overflow-hidden
                    resize-none
                    ${!edit && 'line-clamp-5'}
                `}
            />
            {data.user?.id == user?.id && 
            <div className="flex gap-2">
                {edit ? 
                    <>
                        <Button 
                            variant={'ghost'}
                            size={"sm"}
                            onClick={handleSaveComment}
                        >
                            <Check />
                        </Button>
                        <Button 
                            variant={'ghost'}
                            size={"sm"}
                            onClick={handleAbord}
                        >
                            <X />
                        </Button>
                    </>
                :
                    <Button
                        variant={'ghost'}
                        size={"sm"}
                        onClick={() => setEdit(true)}
                        className=" rounded-full lg:absolute lg:hidden top-0 right-0 lg:group-hover:block lg:group-hover/edit:block"
                    >
                        <FileEdit />
                    </Button>
                }
            </div>}
        </div>

    )
}

const handleUpdateComment = async (id: string, comment: string) => {
    try {
        // const { $id, rating } = await databases.updateDocument(
        //     String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        //     String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
        //     id,
        //     {
        //         comment: comment
        //     }
        // );
    } catch (error) {
        console.error(error);
    }
}