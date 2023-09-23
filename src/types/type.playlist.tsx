export interface Playlist {
    id: BigInt,
    created_at: Date,
    user_id: string,
    title: string,
    description: string,
    is_public: boolean,
    poster_url: string,
}