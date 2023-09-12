import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { handleWatch } from "./movie_action_watch";
import { isRated, isWatched } from "@/types/movie/type.movie_action";
import { QueryClient } from "react-query";

export const handleGetRating = async (userId: string, movieId: number) => {
    try {
        const { documents } = await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
            [
                Query.equal("userId", userId),
                Query.equal("movieId", movieId),
            ]
        );
        const rating = {
            state: documents.length ? true : false,
            rating: documents.length ? documents[0].rating : null,
            id: documents.length ? documents[0].$id : null,
        }
        return (rating);
    } catch(error) {
        console.error(error);
    }
};

export const handleRate = async (userId: string, isRated: isRated | null, movieId: number, queryClient: QueryClient, ratingTMP: Number) => {
    try {
        if (isRated && isRated.id) {
            await handleUpdateRate(isRated, movieId, queryClient, ratingTMP);
        } else {
            const { $id, rating } = await databases.createDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
                'unique()',
                {
                    userId: userId,
                    movieId: movieId,
                    user: userId,
                    rating: ratingTMP,
                }
            );

            queryClient.setQueryData(['movie', movieId, 'rating'], {
                state: true,
                rating: rating,
                id: $id
            });

            await handleWatch(userId, movieId, queryClient)
        }
    } catch(error) {
        console.error(error);
    }
};

export const handleUnrate = async (isRated: isRated, movieId: number, queryClient: QueryClient) => {
    try {
        isRated.id && await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
            isRated.id
        );
    
        queryClient.setQueryData(['movie', movieId, 'rating'], {
            state: false,
            rating: null,
            id: null
        });
    } catch(error) {
        console.error(error);
    }
};

export const handleUpdateRate = async (isRated: isRated, movieId: number, queryClient: QueryClient, ratingTMP: Number) => {
    try {
        if (isRated.id) {
            const { $id, rating } = await databases.updateDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
                isRated.id,
                {
                    prev_rating: isRated.rating,
                    rating: ratingTMP
                }
            );

            queryClient.setQueryData(['movie', movieId, 'rating'], {
                state: true,
                rating: rating,
                id: $id
            });
        }
    } catch(error) {
        console.error(error);
    }
};