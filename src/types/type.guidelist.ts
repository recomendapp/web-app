import { User } from "@/types/type.user";
import { Film } from "@/types/type.film";

export interface Guidelist {
    id: string,
    film_id: number,
    film: Film,
    receiver_user_id: string,
    sender_user_id: string,
    sender_user: User,
    comment: string,
}