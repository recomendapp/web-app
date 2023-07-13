import { AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Icons } from "../../icons";
import { useIsMovieWatched, useWatchMovie } from "@/hooks/action/movie/watch";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { MovieWatchDateAction } from "./MovieWatchDateAction";
import { useQueryClient, useQuery } from 'react-query'
import { useRouter } from "next/navigation";


export function MovieWatchAction ({ movieId, userId } : { movieId: number, userId: string }) {
    const router = useRouter()
    
    const queryClient = useQueryClient()
    const { data: watch, isLoading, isError } = useQuery({
        queryKey: ['user', userId, "movie", movieId, "watch"],
        queryFn: () => useIsMovieWatched(userId, movieId),
        enabled: userId !== undefined && userId !== null && movieId !== undefined,
        // staleTime: 30_000
    })

    const handleWatchClick = async () => {
        watch && useWatchMovie(userId, movieId, watch)
            .then((res) => {
                if(res === 'watched') {
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "watch"])
                } else {
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "watch"])
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "like"])
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "rate"])
                }
            })
            .catch((error) => {
                queryClient.invalidateQueries(['user', userId, "movie", movieId, "watch"])
            })
    }

    return (
        <>
            <AlertDialog>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {!watch?.status ? (
                                <Button
                                    onClick={() => {
                                        if(userId) {
                                            !watch?.status && handleWatchClick();
                                        } else {
                                            router.push('/login')
                                        }
                                    }}
                                    disabled={(isLoading || isError) && true}  
                                    size="icon"
                                    variant={watch?.status ? "accent-1" : "accent-1-enabled"}
                                    className={`rounded-full`}
                                >
                                    {isLoading || (!isLoading && !watch && userId) ? (
                                        <Icons.spinner className="animate-spin" />
                                    ) : 
                                    isError ? (
                                        <AlertCircle />
                                    )
                                    : (
                                        <Check />
                                    )}
                                </Button>
                            ) : (
                                <AlertDialogTrigger disabled={!watch.status}>
                                    <Button
                                        onClick={() => {
                                            if(userId) {
                                                !watch?.status && handleWatchClick();
                                            } else {
                                                router.push('/login')
                                            }
                                        }}
                                        disabled={(isLoading || isError) && true} 
                                        size="icon"
                                        variant={watch.status ? "accent-1" : "accent-1-enabled"}
                                        className={`rounded-full`}
                                    >
                                        {isLoading || (!isLoading && !watch && userId) ? (
                                            <Icons.spinner className="animate-spin" />
                                        ) : 
                                        isError ? (
                                            <AlertCircle />
                                        )
                                        : (
                                            <Check />
                                        )}
                                    </Button>
                                </AlertDialogTrigger>
                            )}
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                        {watch?.status ? (
                            <p>Retirer des films vus</p>
                        ) : (
                            <p>Marquer comme vu</p>
                        )}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Oula, tu es sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Voulez-vous supprimer toutes vos actions effectuées sur cette oeuvre ?
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction onClick={handleWatchClick}  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground" >Continuer</AlertDialogAction>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {watch?.status && (
                <MovieWatchDateAction defaultDate={watch.date} watchId={watch.id} movieId={movieId} userId={userId} />
            )}
        </>
    )
}