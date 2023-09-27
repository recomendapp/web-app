"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils/utils";
import { ImageWithFallback } from "../Tools/ImageWithFallback";
import { Models } from "appwrite";
import Link from "next/link";
import { Playlist } from "@/types/type.playlist";

interface MoviePlaylistCardProps extends React.HTMLAttributes<HTMLElement> {
    playlist: Playlist
}

export default function MoviePlaylistCard({ className, playlist } : MoviePlaylistCardProps) {
    return (
    <Link href={`/playlist/${playlist.id}`} className={cn("flex flex-col gap-2 bg-muted rounded-md p-2", className)}>
        <div className={`w-full shadow-2xl`}>
            <AspectRatio ratio={1 / 1}>
                <ImageWithFallback
                src={playlist.poster_url ?? ''}
                alt={playlist.title}
                fill
                className="rounded-md object-cover"
                />
            </AspectRatio>
        </div>
        <div>
            <p className="text-center line-clamp-1 break-words">{playlist.title}</p>
            <p className="text-center text-muted-foreground">{playlist.items_count} film{Number(playlist.items_count) > 1 && "s"}</p>
        </div>
    </Link>
        
    )
}