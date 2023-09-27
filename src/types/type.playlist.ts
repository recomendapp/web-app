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
    items_count: string,
    playlist_item: {
        edges: [
            { item: PlaylistItem }
        ]
    }
}

export interface PlaylistItem {
    id: string,
    created_at: string,
    playlist_id: string,
    film_id: string,
    film: Film,
    user_id: string,
    user: User,
    comment: string | null,
    rank: string,
}