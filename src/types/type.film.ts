import { Review } from "@/types/type.review";
import { User } from "@/types/type.user";

export interface Film {
    id: string,
    [key: string]: any;
}

export interface FilmAction {
    id: string,
    created_at: string,
    film_id: string,
    film: Film,
    user_id: string,
    user: User,
    is_liked: boolean,
    is_watched: boolean,
    watched_date: string,
    rating: number,
    is_watchlisted: boolean,
    review_id: string,
    review: Review,
}