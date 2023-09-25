import { Models } from "appwrite";
import { User as UserSupabase } from "@supabase/supabase-js";

export interface User {
    id: string,
    username: string,
    username_updated_at: string,
    full_name: string,
    avatar_url: string,
    bio: string,
    followers_count: number,
    following_count: number,
    friends_count: number,
    verify: boolean,
    language: string,
    badge: string,
    website: string,
    favorite_color: string,
}