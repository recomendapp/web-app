import { FilmAction } from "@/types/type.film";
import { User } from "@/types/type.user";

export interface Review {
    id: string,
    created_at: string,
    updated_at: string,
    film_id: string,
    user_id: string,
    user: User,
    title: string,
    body: string,
    action_id: string,
    film_action: FilmAction,
    likes_count: number,
    comments_count: number,
    views_count: number,
}