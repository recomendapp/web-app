import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { unlikeMovie, useIsMovieLiked } from "./like";
import { unrateMovie, useIsMovieRated } from "./rate";

export async function useIsMovieWatched(userId: string, movieId: number) {
    try {
        const response = await (await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
            [
                Query.equal('userId', userId),
                Query.equal('movieId', movieId)
            ]
        )).documents[0];
        console.log('responseeeee', response)
        return {
            id: response.$id,
            status: true,
            date: response.date
        }
    } catch (error) {
        return {
            id: "",
            status: false,
            date: null,
        }
    }
}


export async function useWatchMovie(userId: string, movieId: number, actualWatchState: { id: string, status: boolean}) {
    if (actualWatchState.id && actualWatchState.status) {
        await unwatchMovie(actualWatchState.id)
        await deleteAllMovie(userId, movieId)
        return "unwatched"
    } 
    // LIKE
    else {
        await watchMovie(userId, movieId)
        return "watched"
    }
}




export async function watchMovie(userId: string, movieId: number) {
    try {
        const { status } = await useIsMovieWatched(userId, movieId)
        if(status) return
        await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED), 
            'unique()', {
                "userId" : userId,
                "movieId" : movieId,
                "date": new Date(),
            }
        )
    } catch (error) {
        throw error
    }
}

async function unwatchMovie(watch: string) {
    try {
        await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED), 
            watch
        )

    } catch (error) {
        throw error
    }
}

async function deleteAllMovie(userId: string, movieId: number) {
    // DELETE LIKE & RATED
    const { id: idLiked } = await useIsMovieLiked(userId, movieId)
    const { id: idRated } = await useIsMovieRated(userId, movieId)
    idLiked && await unlikeMovie(idLiked)
    idRated && await unrateMovie(idRated)
}

export async function watchDate(watchId: string, newDate: Date) {
    try {
        await databases.updateDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED), 
            watchId, {
                "date": newDate
            }
        )
    } catch (error) {
        throw error
    }

}