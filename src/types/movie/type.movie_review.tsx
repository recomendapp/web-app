import { User } from "@/types/type.user";
import { Models } from "appwrite";

export interface MovieReview extends Models.Document {
    movieId: number,
    title: string | null,
    body: string,
    comments_count: number,
    likes_count: number,
    views_count: number,
    movie_liked: boolean,
    movie_rating: number,
    user: User,
    userId: string,
}