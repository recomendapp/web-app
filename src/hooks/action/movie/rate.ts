import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { watchMovie } from "./watch";

export async function useIsMovieRated(userId: string, movieId: number) {
    try {
        const response = await (await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
            [
                Query.equal('userId', userId),
                Query.equal('movieId', movieId)
            ]
        )).documents[0];
        return {
            id: response.$id,
            status: true,
            rating: response.rating
        }
    } catch (error) {
        console.log('error', error)
        return {
            id: "",
            status: false,
            rating: null,
        }
    }
}


export async function useRateMovie(userId: string, movieId: number, rating: number, actualRatingState: { id: string, status: boolean, rating: number }) {
    if (actualRatingState.id && actualRatingState.status) {
        // await updateRatingMovie(actualWatchState.id, rating)
        await unrateMovie(actualRatingState.id)
        await rateMovie(userId, movieId, rating)
        return "ratingupdated"
    } 
    // LIKE
    else {
        const $id = await rateMovie(userId, movieId, rating)
        try {
            await watchMovie(userId, movieId)
            return "ratedandwatched"
            // return $id
        } catch {
            return "rated"
            // return $id
        }
    }
}




export async function rateMovie(userId: string, movieId: number, rating: number) {
    try {
        const { status } = await useIsMovieRated(userId, movieId)
        if(status) return
        const {$id} = await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED), 
            'unique()', {
                "userId" : userId,
                "movieId" : movieId,
                "rating": rating,
            }
        )
        return $id
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateRatingMovie(ratingId: string, rating: number) {
    try {
        await databases.updateDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED), 
            ratingId, {
                "rating": rating
            }
        )
    } catch (error) {
        throw error
    }
}




export async function unrateMovie(rating: string) {
    try {
        await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED), 
            rating
        )
    } catch (error) {

        throw error
    }
}