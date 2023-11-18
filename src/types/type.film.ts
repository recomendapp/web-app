import { Review } from "@/types/type.review";
import { User } from "@/types/type.user";

export interface Film {
    id: string,
    [key: string]: any;
}

export interface FilmAction {
    id: number,
    created_at: string,
    updated_at: string,
    film_id: number,
    user_id: string,
    user: User,
    is_liked: boolean,
    rating: number,
    date: string,
    review: Review,
    // watch: {
    //     edges: [
    //         { watch: FilmWatch }
    //     ]
    // },
    // like: {
    //     edges: [
    //         { like: FilmLike }
    //     ]
    // },
    // rating: {
    //     edges: [
    //         { rating: FilmRating }
    //     ]
    // },
    // watchlist: {
    //     edges: [
    //         { watchlist: FilmWatchlist }
    //     ]
    // },
    // review: {
    //     edges: [
    //         { review: Review }
    //     ]
    // }
}

export interface FilmWatch {
    id: string,
    created_at: string,
    updated_at: string,
    film_id: number,
    user_id: string,
    date: string,
    film: any,
}

export interface FilmLike {
    id: string,
    created_at: string,
    film_id: number,
    user_id: string,
    film: any,
}

export interface FilmRating {
    id: string,
    created_at: string,
    updated_at: string,
    film_id: number,
    user_id: string,
    rating: number,
    film: any,
}

export interface FilmWatchlist {
    id: string,
    created_at: string,
    film_id: number,
    user_id: string,
    film: any,
}