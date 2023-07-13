import { AlertCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Icons } from "../../icons";
import { useQuery, useQueryClient } from 'react-query'
import { useRouter } from "next/navigation";
import { unrateMovie, useIsMovieRated, useRateMovie } from "@/hooks/action/movie/rate";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

// const getLike = (userId: string, movieId: number) => 
//     fetch(`/api/user/${userId}/movie/${movieId}/getLike`)
//         .then((res) => res.json())
//         .then(LikeMovieSchema.parse)

export function MovieRateAction ({movieId, userId} : {movieId: number, userId: string}) {
    const router = useRouter()

    const [ ratingValue, setRatingValue ] = useState<number>(5)

    const queryClient = useQueryClient()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user', userId, "movie", movieId, "rate"],
        queryFn: () => useIsMovieRated(userId, movieId),
        enabled: userId !== undefined && userId !== null && movieId !== undefined,
        // staleTime: 30_000
    })

    useEffect(() => {
        data?.rating && setRatingValue(data.rating)
    }, [data])

    const handleRateClick = async () => {
        data && useRateMovie(userId, movieId, ratingValue, data)
            .then((res) => {
                if (res === 'ratedandwatched') {
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "rate"])
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "watch"])
                } else {
                    queryClient.invalidateQueries(['user', userId, "movie", movieId, "rate"])
                }
            })
            .catch((error) => {
                queryClient.invalidateQueries(['user', userId, "movie", movieId, "rate"])
            })
    }

    const handleDeleteRating = async () => {
        data && unrateMovie(data?.id)
            .then(() => queryClient.invalidateQueries(['user', userId, "movie", movieId, "rate"]))
            .catch((error) => {
                queryClient.invalidateQueries(['user', userId, "movie", movieId, "rate"])
            })
    }

    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {userId ? (
                            <DialogTrigger asChild>
                                <Button 
                                    // onClick={() => userId ? handleRateClick() : router.push('/login')} 
                                    onClick={() => {
                                        !userId && router.push('/login')
                                    }}
                                    disabled={(isLoading || isError) && true} 
                                    size="icon" 
                                    variant={data?.status ? "accent-1" : "accent-1-enabled"}
                                    className='rounded-full'
                                >
                                    {isLoading || (!isLoading && !data && userId) ? (
                                        <Icons.spinner className="animate-spin" />
                                    ) : 
                                    isError ? (
                                        <AlertCircle />
                                    ) : 
                                    data?.rating ? (
                                        <div>{data.rating}</div>
                                    ):
                                    (
                                        <Star className={data?.status ? "fill-accent-1-foreground": "transparent"} />
                                    )}
                                </Button>
                            </DialogTrigger>
                        ): (
                            <Button 
                                // onClick={() => userId ? handleRateClick() : router.push('/login')} 
                                onClick={() => {
                                    !userId && router.push('/login')
                                }}
                                disabled={(isLoading || isError) && true} 
                                size="icon" 
                                variant={data?.status ? "accent-1" : "accent-1-enabled"}
                                className='rounded-full'
                            >
                                {isLoading || (!isLoading && !data && userId) ? (
                                    <Icons.spinner className="animate-spin" />
                                ) : 
                                isError ? (
                                    <AlertCircle />
                                ) : 
                                data?.rating ? (
                                    <div>{data.rating}</div>
                                ):
                                (
                                    <Star className={data?.status ? "fill-accent-1-foreground": "transparent"} />
                                )}
                            </Button>
                        )}
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                    {data?.status ? (
                        <p>Retirer la note</p>
                    ) : (
                        <p>Ajouter une note</p>
                    )}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Note</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="flex">
                        {/* <Label htmlFor="name" className="text-right sr-only">No
                        </Label> */}
                        <Input 
                            defaultValue={ratingValue}
                            min={0}
                            max={10}
                            step={0.5}
                            type="number" 
                            id="name"
                            className="w-full" 
                            onChange={(e) => setRatingValue(Number(e.currentTarget.value))}
                            // required
                        />
                    </div>

                    
                    </div>
                    <DialogFooter>
                        {data?.rating && (
                            <DialogClose asChild>
                                <Button variant="destructive" onClick={handleDeleteRating}>Supprimer la note</Button>
                            </DialogClose>
                        )}
                        <DialogClose asChild>
                            <Button onClick={handleRateClick}>Enregistrer</Button>
                        </DialogClose>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}