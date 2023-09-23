import { databases } from "@/lib/appwrite";
import { QueryClient } from "react-query";
import { handleWatch } from "@/components/modules/MovieAction/_components/MovieWatchAction/_queries/movie-action-watch";
import { Query } from "appwrite";

export const handleGetLike = async (userId: string, movieId: number) => {
    try {
        const { documents } = await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
            [
            Query.equal("userId", userId),
            Query.equal("movieId", movieId),
            ]
        );
        const like = {
            state: documents.length ? true : false,
            id: documents.length ? documents[0].$id : null,
        }
        return (like);
    } catch(error) {
        console.error(error);
    }
};

export const handleLike = async (userId: string, movieId: number, queryClient: QueryClient) => {
    try {
        const { $id } = await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
        'unique()',
        {
            userId: userId,
            movieId: movieId,
            user: userId,
        }
        );
    
        queryClient.setQueryData(['movie', movieId, 'like'], {
        state: true,
        id: $id
        });
        
        // const isWatched = queryClient.getQueryData(['movie', movieId, 'watch']) as isWatched;
        await handleWatch(userId, movieId, queryClient)
    } catch(error) {
        console.error(error);
    }
};

export const handleUnlike = async (id: string, movieId: number, queryClient: QueryClient) => {
    try {
        await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
            id
        );
    
        queryClient.setQueryData(['movie', movieId, 'like'], {
            state: false,
            id: null
        });
    } catch(error) {
        console.error(error);
    }
};