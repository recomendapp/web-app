import { Subscription } from "@/types/type.stripe";

export interface User {
    id: string,
    username: string,
    username_updated_at: string,
    full_name: string,
    avatar_url: string,
    background_url: string,
    bio: string,
    verify: boolean,
    language: string,
    badge: string,
    website: string,
    favorite_color: string,
    favorite_films: string[],
    followers_count: string,
    following_count: string,
    friends_count: string,
    premium: boolean
    verified: boolean,
}

export interface Follower {
    followee_id: string,
    followee: User,
    user_id: string,
    user: User,
}

export interface Friend {
    id: string,
    friend_id: string,
    friend: User,
    user_id: string,
}