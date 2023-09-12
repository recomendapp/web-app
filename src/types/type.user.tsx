import { Models } from "appwrite";

export interface User extends Models.Document {
    userId: string,
    username: string,
    usernameUpdate: string,
    avatar: string,
    bio: string,
    followers_count: number,
    following_count: number,
    friends_count: number,
    verify: boolean,
    language: string,
}