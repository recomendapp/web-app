import { useEffect, useState } from "react";
import { databases, graphql } from "@/utils/appwrite";

import { MovieLikeAction } from "./MovieLikeAction";
import { MovieWatchAction } from "./MovieWatchAction";
import { MovieRateAction } from "./MovieRateAction";
import { MovieWatchDateAction } from "./MovieWatchDateAction";

import { 
    handleIsMovieLiked,
    handleIsMovieWatched,
    handleIsMovieRated,
    handleIsMovieWatchlisted
} from "@/hooks/action/movie";
import { MovieWatchlistAction } from "./MovieWatchlistAction";
import { MoviePlaylistAction } from "./MoviePlaylistAction";
import { MovieSendAction } from "./MovieSendAction";
import { Query } from "appwrite";


export function MovieAction( { movieId, userId } : { movieId: number, userId: string }) {
    const [ isLiked, setIsLiked ] = useState<boolean | null>(null)
    const [ isLikedId, setIsLikedId ] = useState<string | null>(null) // APPWRITE DOCUMENT ID
    const [ isWatched, setIsWatched ] = useState<boolean | null>(null)
    const [ isWatchedId, setIsWatchedId ] = useState<string | null>(null) // APPWRITE DOCUMENT ID
    const [ watchedDate, setWatchedDate ] = useState<Date | null>(null)
    const [ isRated, setIsRated ] = useState<number | null>(null)
    const [ isRatedId, setIsRatedId ] = useState<string | null>(null) // APPWRITE DOCUMENT ID
    const [ isWatchlisted, setIsWatchlisted ] = useState<boolean | null>(null)
    const [ isWatchlistedId, setIsWatchlistedId ] = useState<string | null>(null) // APPWRITE DOCUMENT ID

    useEffect(() => {
        if(userId && movieId) {
            // init()
            handleIsMovieLiked(userId, movieId)
                .then((response) =>{
                    setIsLiked(response.status)
                    setIsLikedId(response.id)
                })
            handleIsMovieWatched(userId, movieId)
                .then((response) => {
                    setIsWatched(response.status)
                    setIsWatchedId(response.id)
                    setWatchedDate(new Date(response.date))
                })
            handleIsMovieRated(userId, movieId)
                .then((response) => {
                    setIsRated(response.rating)
                    setIsRatedId(response.id)
                })
            handleIsMovieWatchlisted(userId, movieId)
                .then((response) => {
                    setIsWatchlisted(response.status)
                    setIsWatchlistedId(response.id)
                })
        }
    }, [userId, movieId])

    const init = async () => {
        const getLike = `
            query likes {
                databasesListDocuments(
                    databaseId: "${String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS)}",
                    collectionId: "${String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED)}",
                    queries: ["equal('userId', ${userId})", "equal('movieId', ${movieId})"]
                ) {
                    total
                    documents {
                        _id
                        _collectionId
                        _databaseId
                        _createdAt
                        _updatedAt
                        _permissions
                        data
                    }
                }
            }
        `
        const getWatch = `
            query watch {
                databasesListDocuments(
                    databaseId: "${String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS)}",
                    collectionId: "${String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED)}",
                    queries: ["equal('userId', ${userId})", "equal('movieId', ${movieId})"]
                ) {
                    total
                    documents {
                        _id
                        _collectionId
                        _databaseId
                        _createdAt
                        _updatedAt
                        _permissions
                        data
                    }
                }
            }
        `

        try {
            const q = await graphql.query([
                {
                    query: `
                        ${getLike}
                        `,
                }
            ])
            console.log('graphql', q)
            
        } catch (error) {
            console.log(error)
        }
    }

    const reset = async () => {
        isLiked && await handleUnlike()
        isRated && await handleUnrate()
        return
    }

    const handleLike = async () => {
        const { $id } = await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED), 
            'unique()', {
                "userId" : userId,
                "movieId" : movieId,
                "user": userId,
            }
        )
        setIsLiked((current) => !current)
        setIsLikedId($id)

        !isWatched && await handleWatch()

        return
    }

    const handleUnlike = async () => {
        isLikedId && await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED), 
            isLikedId
        )
        setIsLiked((current) => !current)
        setIsLikedId(null)

        return
    }

    const handleWatch = async () => {
        const { $id, date } = await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED), 
            'unique()', {
                "userId" : userId,
                "movieId" : movieId,
                "user": userId,
                "date": new Date(),
            }
        )
        setIsWatched((current) => !current)
        setIsWatchedId($id)
        setWatchedDate(new Date(date))

        isWatchlisted && await handleUnwatchlist()
        await handleDeleteGuidelist()

        return
    }

    const handleUnwatch = async () => {
        isWatchedId && await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED), 
            isWatchedId
        )
        setIsWatched((current) => !current)
        setIsWatchedId(null)
        setWatchedDate(null)

        await reset()
        return
    }

    const handleUpdateDate = async (date: Date) => {
        isWatchedId && await databases.updateDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED), 
            isWatchedId, {
                "date": date
            }
        )
        setWatchedDate(date)

        return

    }

    const handleRate = async (ratingTMP: Number) => {
        if(isRated && isRatedId) {
            await handleUpdateRate(ratingTMP)
            return
        } else {
            const { $id, rating } = await databases.createDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED), 
                'unique()', {
                    "userId" : userId,
                    "movieId" : movieId,
                    "user": userId,
                    "rating": ratingTMP
                }
            )
            setIsRated(rating)
            setIsRatedId($id)
    
            !isWatched && await handleWatch()

            return
        }
        
    }

    const handleUpdateRate = async (ratingTMP: Number) => {
        isRatedId && await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED), 
            isRatedId
        )
        const { $id, rating } = await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED), 
            'unique()', {
                "userId" : userId,
                "movieId" : movieId,
                "user": userId,
                "rating": ratingTMP
            }
        )
        setIsRated(rating)
        setIsRatedId($id)
        return
    }

    const handleUnrate = async () => {
        isRatedId && await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED), 
            isRatedId
        )
        setIsRated(null)
        setIsRatedId(null)
        return
    }

    const handleWatchlist = async () => {
        const { $id } = await databases.createDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED), 
            'unique()', {
                "userId" : userId,
                "movieId" : movieId,
                "user": userId,
            }
        )
        setIsWatchlisted((current) => !current)
        setIsWatchlistedId($id)

        return
    }

    const handleUnwatchlist = async () => {
        isWatchlistedId && await databases.deleteDocument(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED), 
            isWatchlistedId
        )
        setIsWatchlisted((current) => !current)
        setIsWatchlistedId(null)

        return

    }

    const handleDeleteGuidelist = async () => {
        const { documents } = await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED), 
            [
                Query.equal("movieId", movieId),
                Query.equal("userId", userId)
            ]
        )
        if (documents.length > 0) {
            await databases.deleteDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED), 
                documents[0].$id
            )
            return
        } else {
            return
        }
    }

    return (
        <div className="flex gap-4">
            <MovieRateAction 
                userId={userId}
                movieId={movieId}  
                isRated={isRated}
                handleRate={handleRate}
                handleUnrate={handleUnrate}
            />
            <MovieLikeAction 
                userId={userId} 
                movieId={movieId} 
                isLiked={isLiked}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
            />
            <MovieWatchAction 
                userId={userId} 
                movieId={movieId} 
                isWatched={isWatched}
                handleWatch={handleWatch}
                handleUnwatch={handleUnwatch}
            />
            <MovieWatchlistAction
                userId={userId}
                movieId={movieId}  
                isWatchlisted={isWatchlisted}
                handleWatchlist={handleWatchlist}
                handleUnwatchlist={handleUnwatchlist}
                isWatched={isWatched}
            />
            <MoviePlaylistAction
                userId={userId}
                movieId={movieId}
            />
            <MovieSendAction
                userId={userId}
                movieId={movieId}
            />
            {isWatched && watchedDate && (
                <MovieWatchDateAction 
                    userId={userId} 
                    movieId={movieId} 
                    date={watchedDate}
                    handleUpdateDate={handleUpdateDate} 
                />
            )}
        </div>
    )
}