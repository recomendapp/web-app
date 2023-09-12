import { isWatchlisted } from "@/types/movie/type.movie_action";
import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { QueryClient } from "react-query";

export const handleGetWatchlist = async (userId: string, movieId: number) => {
    try {
        const { documents } = await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED),
            [
            Query.equal("userId", userId),
            Query.equal("movieId", movieId),
            ]
        );
        const watchlist = {
            state: documents.length ? true : false,
            id: documents.length ? documents[0].$id : null,
        }
        return (watchlist);
    } catch(error) {
        console.error(error);
    }
};

export const handleWatchlist = async (userId: string, movieId: number, queryClient: QueryClient) => {
    try {
        const { $id } = await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED),
            'unique()',
            {
                userId: userId,
                movieId: movieId,
                user: userId,
            }
        );
    
        queryClient.setQueryData(['movie', movieId, 'watchlist'], {
            state: true,
            id: $id
        });
    } catch(error) {
        console.error(error);
    }
};

export const handleUnwatchlist = async (watchlistedId: string, movieId: number, queryClient: QueryClient) => {
    try {
        watchlistedId && await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED),
            watchlistedId
        );
    
        queryClient.setQueryData(['movie', movieId, 'watchlist'], {
            state: false,
            id: null
        });
    } catch(error) {
        console.error(error);
    }
};