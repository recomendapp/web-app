import { User } from "@/types/type.user";
import { FilmWatch } from "./type.film";

export interface Activity {
    id: number,
    updated_at: string,
    user_id: string,
    user: User,
    table: string,
    activity_id: number,
    event_type: string,
}