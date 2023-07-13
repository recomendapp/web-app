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

interface MovieWatchActionProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string,
    movieId: number,
    isWatched: boolean | null,
    handleWatch: () => Promise<void>,
    handleUnwatch: () => Promise<void>
}


export function MovieWatchAction ({ movieId, userId, isWatched, handleWatch, handleUnwatch } : MovieWatchActionProps) {
    const router = useRouter()

    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)

    return (
        <AlertDialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {!isWatched ? (
                            <Button
                            onClick={() => {
                                if (userId) {
                                    isWatched ? handleUnwatch() : handleWatch()
                                } else {
                                    router.push('/login')
                                }
                            }} 
                                disabled={(isLoading || isError) && true}  
                                size="icon"
                                variant={isWatched ? "accent-1" : "accent-1-enabled"}
                                className={`rounded-full`}
                            >
                                {isLoading ? (
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
                            <AlertDialogTrigger disabled={!isWatched}>
                                <Button
                                    onClick={() => {
                                        if(userId) {
                                            !isWatched && handleWatch();
                                        } else {
                                            router.push('/login')
                                        }
                                    }}
                                    disabled={(isLoading || isError) && true} 
                                    size="icon"
                                    variant={isWatched ? "accent-1" : "accent-1-enabled"}
                                    className={`rounded-full`}
                                >
                                    {isLoading ? (
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
                    {isWatched ? (
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
                <AlertDialogAction onClick={handleUnwatch}  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground" >Continuer</AlertDialogAction>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}