export type isWatched = {
    state: boolean;
    id: string | null;
    date: Date | null;
}

export type isLiked = {
    state: boolean;
    id: string | null;
}

export type isRated = {
    state: boolean;
    rating: number | null;
    id: string | null;
}

export type isWatchlisted = {
    state: boolean;
    id: string | null;
}