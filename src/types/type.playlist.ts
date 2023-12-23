import { User } from "@/types/type.user";
import { Film } from "@/types/type.film";

export interface Playlist {
    id: string,
    created_at: string,
    user_id: string,
    user: User,
    title: string,
    description: string,
    is_public: boolean,
    poster_url: string,
    items_count: number,
    playlist_item: {
        edges: [
            { item: PlaylistItem }
        ]
    }
    guests: {
        edges: [
            { guest: PlaylistGuest }
        ]
    },
    featured: boolean
}

export interface PlaylistItem {
    id?: number
    created_at?: string
    playlist_id: number
    film_id: number
    film: Film,
    user_id: string
    user: User,
    rank?: number
    comment?: string | null
}

export interface PlaylistGuest {
    id: string,
    created_at: string,
    playlist_id: string,
    user_id: string,
    user: User,
    edit: boolean,
}