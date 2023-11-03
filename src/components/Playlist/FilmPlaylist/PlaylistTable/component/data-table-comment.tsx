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
} : {
    data: PlaylistItem,
}) {
    const [ comment, setComment ] = useState("");

    useEffect(() => {
        setComment(data.comment ?? '')
    }, [data])

  
    return (
        <p className="line-clamp-5 break-all">
            {comment}
        </p>

    )
}