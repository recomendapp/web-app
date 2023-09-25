import { FilmAction } from "@/types/type.film";

export interface Review {
    id: string,
    created_at: string,
    updated_at: string,
    film_id: string,
    user_id: string,
    title: string,
    body: string,
    action_id: string,
    action: FilmAction,
    likes_count: number,
    comments_count: number,
    views_count: number,
}