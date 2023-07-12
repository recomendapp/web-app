import { AlertCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useIsMovieLiked, useLikeMovie } from "@/hooks/action/movie/like";
import { Icons } from "../icons";
import { LikeMovieSchema } from "@/schema/like.schema";
import { useQuery, useQueryClient } from 'react-query'
import { useRouter } from "next/navigation";
import { client, databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { MovieDetails } from "../movie/MovieDetails";

// const getLike = (userId: string, movieId: number) => 
//     fetch(`/api/user/${userId}/movie/${movieId}/getLike`)
//         .then((res) => res.json())
//         .then(LikeMovieSchema.parse)

export function MovieActionCounter ({movie} : {movie: any}) {
    const router = useRouter()
    const [ movieLikedCounter, setMovieLikedCounter ] = useState<number | null>(movie ? movie.likes_count : null)
    const [ movieWatchedCounter, setMovieWatchedCounter ] = useState<number | null>(movie ? movie.watch_count : null)
    const [ movieRatedCounter, setMovieRatedCounter ] = useState<string | null>(movie ? movie.rating_count : null)
    const [ totalMovieRated, setTotalMovieRated ] = useState<number | null>(movie ? useTotalMovieRated(movie.rating_count) : null)
    const [ movieAverageRating, setMovieAverageRating ] = useState<number | null>(movie ? useMovieAverageRating(movie.rating_count) : null)


    function useMovieAverageRating(rating_count: string) {
        const ratingArray = JSON.parse(rating_count)
        let totalVotes = 0;
        let sumOfProducts = 0;

        for (const key in ratingArray) {
        const rating = parseFloat(key);
        const votes = ratingArray[key];

        totalVotes += votes;
        sumOfProducts += rating * votes;
        }

        return totalVotes > 0 ? sumOfProducts / totalVotes : 0;
    }

    function useTotalMovieRated(rating_count: string) {
        const ratingArray = JSON.parse(rating_count)
        return Number(Object.values(ratingArray).reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0))
    }





    useEffect(() => {
        movieRatedCounter && setTotalMovieRated(useTotalMovieRated(movieRatedCounter))
        movieRatedCounter && setMovieAverageRating(useMovieAverageRating(movieRatedCounter))
    }, [movieRatedCounter])

    useEffect(() => {
        movie && client.subscribe(
            `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS}.collections.${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE}.documents.${movie.$id}`,
            (response: { payload: any }) => {
                setMovieLikedCounter(response.payload.likes_count)
                setMovieWatchedCounter(response.payload.watch_count)
                setMovieRatedCounter(response.payload.rating_count)

            }    
        )
    }, [])

    return (
        <div>
            NOTE: {movieAverageRating}
            Rating: {totalMovieRated}
            Likes: {movieLikedCounter}
            Watch: {movieWatchedCounter}
        </div>
    )
}