import { useEffect, useState } from "react";
import { MovieLikeAction } from "./MovieLikeAction";
import { MovieWatchAction } from "./MovieWatchAction";
import { MovieRateAction } from "./MovieRateAction";
import { useIsMovieLiked } from "@/hooks/action/movie/like";

export function MovieAction( { movieId, userId } : { movieId: number, userId: string }) {
    const [ isLiked, setIsLiked ] = useState<boolean | null>(null)
    const [ isWatched, setIsWatched ] = useState<boolean | null>(null)
    const [ watchedDate, setWatchedDate ] = useState<boolean | null>(null)

    useEffect(() => {
        userId && movieId && useIsMovieLiked(userId, movieId)
            .then((response) =>{
                setIsLiked(response)
            })
    }, [userId, movieId])


    return (
        <div className="flex gap-4">
            <MovieRateAction movieId={movieId} userId={userId} />
            <MovieLikeAction userId={userId} movieId={movieId} isLiked={isLiked} setIsLiked={setIsLiked} isWatched={isWatched}/>
            <MovieWatchAction movieId={movieId} userId={userId} />
        </div>
    )
}