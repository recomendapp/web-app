import { AlertCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useIsMovieLiked, useLikeMovie } from "@/hooks/action/movie/like";
import { Icons } from "../../icons";
import { LikeMovieSchema } from "@/schema/like.schema";
import { useQuery, useQueryClient } from 'react-query'
import { useRouter } from "next/navigation";

// const getLike = (userId: string, movieId: number) => 
//     fetch(`/api/user/${userId}/movie/${movieId}/getLike`)
//         .then((res) => res.json())
//         .then(LikeMovieSchema.parse)

export function MovieLikeAction ({movieId, userId} : {movieId: number, userId: string}) {
    const router = useRouter()

    const queryClient = useQueryClient()
    const { data: like, isLoading, isError } = useQuery({
        queryKey: ['user', userId, "movie", movieId, "like"],
        queryFn: () => useIsMovieLiked(userId, movieId),
        enabled: userId !== undefined && userId !== null && movieId !== undefined,
        // staleTime: 30_000
    })
    console.log('isLoading', isLoading)
    const handleLikeClick = async () => {
        like && useLikeMovie(userId, movieId, like)
            .then((res) => {
                if (res === 'likedandwatched') {
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "like"])
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "watch"])
                } else {
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "like"])
                }
            })
            .catch((error) => {
                queryClient.invalidateQueries(['user', userId, "movie", movieId, "like"])
            })
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        onClick={() => userId ? handleLikeClick() : router.push('/login')} 
                        disabled={(isLoading || isError) && true} 
                        size="icon" 
                        variant={like?.status ? "accent-1" : "accent-1-enabled"}
                        className='rounded-full'
                    >
                        {isLoading || (!isLoading && !like && userId) ? (
                            <Icons.spinner className="animate-spin" />
                        ) : 
                        isError ? (
                            <AlertCircle />
                        )
                        : (
                            <Heart className={like?.status ? "fill-accent-1-foreground": "transparent"} />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                {like?.status ? (
                    <p>Retirer des coups de coeur</p>
                ) : (
                    <p>Ajouter aux coups de coeur</p>
                )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}