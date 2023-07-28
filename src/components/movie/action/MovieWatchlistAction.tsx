import { AlertCircle, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Icons } from "../../icons";
import { useRouter } from "next/navigation";

const like = (userId: string, movieId: number) =>
    fetch(`/api/user/${userId}/movie/${movieId}/like`)
        .then((res) => res.json())
const unlike = (userId: string, movieId: number) =>
    fetch(`/api/user/${userId}/movie/${movieId}/unlike`)
        .then((res) => res.json())

interface MovieWatchlistActionProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string,
    movieId: number,
    isWatchlisted: boolean | null,
    handleWatchlist: () => Promise<void>,
    handleUnwatchlist: () => Promise<void>,
    isWatched: boolean | null
}

export function MovieWatchlistAction ({ userId, movieId, isWatchlisted, handleWatchlist, handleUnwatchlist, isWatched } : MovieWatchlistActionProps) {
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
                                isWatchlisted ? handleUnwatchlist() : handleWatchlist()
                            } else {
                                router.push('/login')
                            }
                        }} 
                        disabled={(isLoading || isError) && true} 
                        size="icon" 
                        variant={isWatchlisted? "accent-1" : "accent-1-enabled"}
                        className='rounded-full'
                    >
                        {isLoading ? (
                            <Icons.spinner className="animate-spin" />
                        ) : 
                        isError ? (
                            <AlertCircle />
                        )
                        : (
                            <Bookmark className={isWatchlisted ? "fill-accent-1-foreground": "transparent"} />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                {isWatched ? (
                    <p>Envie de le revoir</p>
                ) : (
                    <p>Envie de le voir</p>
                )}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}