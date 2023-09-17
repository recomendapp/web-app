import { isLiked, isRated, isWatched, isWatchlisted } from "@/types/movie/type.movie_action";
import { databases } from "@/db/appwrite";
import { Models, Query } from "appwrite";
import { QueryClient } from "react-query";
import { handleDeleteReview } from "@/api/movie//movie_review";
import { handleUnlike } from "../../MovieLikeAction/_queries/movie-action-like";
import { handleUnrate } from "../../MovieRatingAction/queries/movie-action-rating";
import { handleUnwatchlist } from "../../MovieWatchlistAction/_queries/movie-action-watchlist";
import { MovieReview } from "@/types/movie/type.movie_review";
import { handleDeleteGuidelist } from "../../../../../../api/movie/movie_guidelist";

export const handleGetWatch = async (userId: string, movieId: number) => {
    try {
        const { documents } = await databases.listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
        [
            Query.equal("userId", userId),
            Query.equal("movieId", movieId),
        ]
        );
        const watch = {
        state: documents.length ? true : false,
        id: documents.length ? documents[0].$id : null,
        date: documents.length ? new Date(documents[0].date) : null
        }
        return (watch);
    } catch(error) {
        console.error(error);
    }
};

export const handleWatch = async (userId: string, movieId: number, queryClient: QueryClient) => {
    try {
        const { $id, date } = await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
            'unique()',
            {
            userId: userId,
            movieId: movieId,
            user: userId,
            date: new Date(),
            }
        );
    
        queryClient.setQueryData(['movie', movieId, 'watch'], {
            state: true,
            id: $id,
            date: new Date(date)
        });
    
        const isWatchlisted = queryClient.getQueryData(['movie', movieId, 'watchlist']) as isWatchlisted;
        isWatchlisted && isWatchlisted.id && await handleUnwatchlist(isWatchlisted.id, movieId, queryClient)
        await handleDeleteGuidelist(userId, movieId, queryClient);
    } catch(error) {
        console.error(error);
    }
};

export const handleUnwatch = async (userId: string, isWatched: isWatched, movieId: number, queryClient: QueryClient) => {
    try {
        isWatched.id && await databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
        isWatched.id
        );
    
        queryClient.setQueryData(['movie', movieId, 'watch'], {
        state: false,
        id: null,
        date: null
        });
    
        await handleResetMovieAction(userId, movieId, queryClient);
    } catch(error) {
        console.error(error);
    }
};


export const handleResetMovieAction = async (userId: string, movieId: number, queryClient: QueryClient) => {
    try {
        const isLiked = queryClient.getQueryData(['movie', movieId, 'like']) as isLiked;
        isLiked.id && await handleUnlike(isLiked.id, movieId, queryClient);
        const isRated = queryClient.getQueryData(['movie', movieId, 'rating']) as isRated;
        isRated.id && await handleUnrate(isRated, movieId, queryClient);
        const isReviewed = queryClient.getQueryData(['movie', movieId, 'review', userId]) as MovieReview;
        isReviewed && await handleDeleteReview(isReviewed.$id, userId, movieId, queryClient);

        queryClient.setQueryData(['movie', movieId, 'watch'], {
            state: false,
            id: null
        });
    } catch(error) {
        console.error(error);
    }
};

export const handleUpdateDate = async (date: Date, isWatched: isWatched, movieId: number, queryClient: QueryClient) => {
    try {
        isWatched.id && await databases.updateDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
            isWatched.id,
            {
                date: date,
            }
        )
        queryClient.setQueryData(['movie', movieId, 'watch'], {
            state : isWatched.state,
            id : isWatched.id,
            date: date
        });
    } catch(error) {
        console.error(error);
    }
};