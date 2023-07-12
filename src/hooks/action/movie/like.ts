import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { watchMovie } from "./watch";

export async function useIsMovieLiked(userId: string, movieId: number) {
    try {
        const { documents } = await (await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
            [
                Query.equal('userId', userId),
                Query.equal('movieId', movieId)
            ]
        ));
        if(documents.length > 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


export async function useLikeMovie(userId: string, movieId: number, actualLikeState: { id: string, status: boolean}) {
    if (actualLikeState.id && actualLikeState.status) {
        await unlikeMovie(actualLikeState.id)
        return "unliked"

    } 
    // LIKE
    else {
        const $id = await likeMovie(userId, movieId)
        try {
            await watchMovie(userId, movieId)
            return "likedandwatched"
        } catch {
            return "liked"
        }
    }
}




export async function likeMovie(userId: string, movieId: number) {
    try {
        const { status } = await useIsMovieLiked(userId, movieId)
        if(status) return
        const {$id} = await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED), 
            'unique()', {
                "userId" : userId,
                "movieId" : movieId,
            }
        )
        console.log('id', $id)
        return $id
    } catch (error) {
        throw error
    }
}

export async function unlikeMovie(like: string) {
    try {
        await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED), 
            like
        )
    } catch (error) {

        throw error
    }
}