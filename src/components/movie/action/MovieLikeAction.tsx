import { AlertCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Icons } from "../../icons";
import { LikeMovieSchema } from "@/schema/like.schema";
import { useQuery, useQueryClient } from 'react-query'
import { useRouter } from "next/navigation";
import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";

const like = (userId: string, movieId: number) =>
    fetch(`/api/user/${userId}/movie/${movieId}/like`)
        .then((res) => res.json())
const unlike = (userId: string, movieId: number) =>
    fetch(`/api/user/${userId}/movie/${movieId}/unlike`)
        .then((res) => res.json())

interface MovieLikeActionProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string,
    movieId: number,
    isLiked: boolean | null,
    handleLike: () => Promise<void>,
    handleUnlike: () => Promise<void>
}

export function MovieLikeAction ({ userId, movieId, isLiked, handleLike, handleUnlike } : MovieLikeActionProps) {
    const router = useRouter()

    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)

    
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        onClick={() => {
                            if (userId) {
                                isLiked ? handleUnlike() : handleLike()
                            } else {
                                router.push('/login')
                            }
                        }} 
                        disabled={(isLoading || isError) && true} 
                        size="icon" 
                        variant={isLiked? "accent-1" : "accent-1-enabled"}
                        className='rounded-full'
                    >
                        {isLoading ? (
                            <Icons.spinner className="animate-spin" />
                        ) : 
                        isError ? (
                            <AlertCircle />
                        )
                        : (
                            <Heart className={isLiked ? "fill-accent-1-foreground": "transparent"} />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                {isLiked ? (
                    <p>Retirer des coups de coeur</p>
                ) : (
                    <p>Ajouter aux coups de coeur</p>
                )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}