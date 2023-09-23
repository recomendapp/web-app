import { getMovieDetails } from "@/hooks/tmdb";
import { User } from "@/types/type.user";
import { databases } from "@/lib/appwrite";
import { Models, Query } from "appwrite";
import { QueryClient } from "react-query";

export const handleGetPlaylist = async (id: string) => {
    try {
        return await databases.getDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
            id
        );
    } catch(error) {
        console.error(error);
    }
};

export const handleGetPlaylistItems = async (playlistId: string, user: User) => {
    try {
        const { documents } = await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
            [
                Query.equal('playlistId', playlistId),
                Query.orderAsc('rank')
            ]
        );
        if (!documents.length)
            return ;

        const playlist = await Promise.all(
            documents.map(async (movie: any) => {
                const movieDetails = await getMovieDetails(movie.movieId, user.language)
                const movieWithDetails = {
                    ...movie,
                    ...movieDetails,
            };
            return movieWithDetails;
            })
        );
        return (playlist);
    } catch(error) {
        console.error(error);
    }
};

export const handleDeletePlaylistItemFromId = async (id: string, movieId: number, queryClient: QueryClient) => {
    try {
        await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM),
            id
        );
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