import { getMovieDetails } from "@/hooks/tmdb";
import { User } from "@/types/type.user";
import { databases } from "@/utils/appwrite";
import { Models, Query } from "appwrite";
import { QueryClient } from "react-query";

export const handleGetGuidelist = async (user: User) => {
    try {
        const { documents } = await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED),
            [
                // Query.limit(25), 
                Query.equal('userId', user.$id)
            ]
        );
        if (!documents.length)
            return ;

        const guidelist = await Promise.all(
            documents.map(async (movie: any) => {
                const movieDetails = await getMovieDetails(movie.movieId, user.language)
                const movieWithDetails = {
                    ...movie,
                    ...movieDetails,
            };
            return movieWithDetails;
            })
        );
        return (guidelist);
    } catch(error) {
        console.error(error);
    }
};

export const handleDeleteGuidelistFromId = async (id: string, movieId: number, queryClient: QueryClient) => {
    try {
        await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED),
            id
        );
        const guidelist = queryClient.getQueryData(['collection', 'guidelist']) as Models.Document;
        guidelist && queryClient.setQueryData(['collection', 'guidelist'], guidelist.filter((movie: any) => movie.movieId != movieId))
    } catch(error) {
        console.error(error);
    }
};

export const handleDeleteGuidelist = async (userId: string, movieId: number, queryClient: QueryClient) => {
    try {
        const { documents } = await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED),
            [
                Query.equal('movieId', movieId),
                Query.equal('userId', userId)
            ]
        );
        if (documents.length > 0) {
            await databases.deleteDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED),
                documents[0].$id
            );
            const guidelist = queryClient.getQueryData(['collection', 'guidelist']) as Models.Document;
            guidelist && queryClient.setQueryData(['collection', 'guidelist'], guidelist.filter((movie: any) => movie.movieId != movieId))
        }
    } catch(error) {
        console.error(error);
    }
};