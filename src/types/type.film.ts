import { Review } from "@/types/type.review";

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
    is_liked: boolean,
    is_watched: boolean,
    rating: number,
    is_watchlisted: boolean,
    review_id: string,
    review: Review,
}