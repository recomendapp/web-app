import { Subscription, SubscriptionWithProduct } from "@/types/type.stripe";
import { Json } from "@/types/type.db";

export interface User {
    avatar_url: string | null
    background_url: string | null
    billing_address: Json | null
    bio: string | null
    created_at: string
    favorite_color: string | null
    favorite_films: number[] | null
    followers_count: number
    following_count: number
    friends_count: number
    full_name: string
    id: string
    language: string
    payment_method: Json | null
    premium: boolean
    updated_at: string | null
    username: string
    username_updated_at: string | null
    verified: boolean
    website: string | null,
    subscriptions: {
        edges: [
            {node: SubscriptionWithProduct}
        ]
    },
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