"use client"

import { Button } from "@/components/ui/button";
import { Models } from "appwrite";
import { useInfiniteQuery } from "react-query";
import getMovies from "./queries/getMovies";
import { useUser } from "@/context/UserProvider";
import { Fragment, useEffect, useState } from "react";
import { LayoutGrid, List, Plus } from "lucide-react";
import MovieCard from "@/components/elements/Movie/MovieCard";
import Loader from "@/components/elements/Loader/Loader";
import { useInView } from 'react-intersection-observer';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface UserMoviesProps {
    userId: string;
    horizontal?: boolean;
    limit?: boolean;
}

export default function UserMovies({
    userId,
    horizontal = false,
    limit,
} : UserMoviesProps) {

    const { user } = useUser();

    const [ sort, setSort ] = useState("added-asc")

    const [ displayMode, setDisplayMode ] = useState('grid');

    const { ref, inView } = useInView();

    const numberOfResult = 8;

    const {
        data: movies,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
      } = useInfiniteQuery({
        queryKey: ['user', userId, 'movies', sort],
        queryFn: ({pageParam = 1}) => getMovies(userId, pageParam, numberOfResult, sort, user?.language),
        getNextPageParam: (results, pages) => {
            return results?.length == numberOfResult ? pages.length + 1 : undefined  
        },
        enabled: userId !== undefined && userId !== null,
    });

    useEffect(() => {
        if (inView && hasNextPage)
            fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage])

    if (isLoading)
    {
        return (
            <div>Loading</div>
        )
    }

    if (!movies)
        return (null)

    if (horizontal)
        return (
            <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-4 items-center">
                    <Link href={`/@${user?.username}/films`}>
                        <h3 className="font-semibold text-xl text-accent-1">Films</h3>
                    </Link>
                    <div className="flex gap-2">
                        {hasNextPage &&
                                <Button variant={'link'} asChild>
                                    <Link href={`/@${user?.username}/films`}>
                                        Tout afficher
                                    </Link>
                                </Button>
                        }
                        <Select onValueChange={setSort} defaultValue={sort}>
                            <SelectTrigger className="w-fit">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="end">
                                <SelectGroup>
                                    <SelectLabel>Date</SelectLabel>
                                    <SelectItem value={"added-asc"}>Ajouté récemment</SelectItem>
                                    <SelectItem value={"added-desc"}>Ajouté anciennement</SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectGroup>
                                    <SelectLabel>Notes</SelectLabel>
                                    <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem>
                                    <SelectItem value={"rating-asc"}>Notes croissantes</SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                </div>
                <ScrollArea className="pb-4">
                    <div className="flex gap-4">
                        {movies.pages.map((page, i) => (
                            <Fragment key={i}>
                                {page?.map((movie: Models.Document) => (
                                    <div key={movie.$id} className="w-48">
                                        <MovieCard
                                            movie={movie.details}
                                            displayMode={displayMode}
                                            isLiked={movie.isLiked}
                                            isRated={movie.isRated}
                                            rating={movie.rating}
                                            isReviewed={movie.isReviewed}
                                            review={movie.review}
                                        />
                                    </div>
                                ))}
                            </Fragment>
                        ))}
                        {hasNextPage && 
                            <div className="w-24 flex items-center justify-center">
                                <Button variant={'ghost'} size={'icon'} className="rounded-full" asChild>
                                    <Link href={`/@${user?.username}/playlists`}>
                                        <Plus />
                                    </Link>
                                </Button>
                            </div>
                        }
                        {/* {playlists.slice(0, numberOfResult).map((playlist: Models.Document) => (
                            <MoviePlaylistCard key={playlist.$id} playlist={playlist} className={'w-48'}/>
                        ))} */}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        )

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-center">
                <h3 className="font-semibold text-xl text-accent-1">Films</h3>
                <div className="flex gap-2">
                    <Select onValueChange={setSort} defaultValue={sort}>
                        <SelectTrigger className="w-fit">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectGroup>
                                <SelectLabel>Date</SelectLabel>
                                <SelectItem value={"added-asc"}>Ajouté récemment</SelectItem>
                                <SelectItem value={"added-desc"}>Ajouté anciennement</SelectItem>
                            </SelectGroup>
                            <SelectSeparator />
                            <SelectGroup>
                                <SelectLabel>Notes</SelectLabel>
                                <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem>
                                <SelectItem value={"rating-asc"}>Notes croissantes</SelectItem>
                            </SelectGroup>
                            <SelectSeparator />
                            <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant={'ghost'} onClick={() => setDisplayMode(displayMode == 'grid' ? 'row' : 'grid')}>
                        {displayMode == 'grid' ?
                            <LayoutGrid />
                        :
                            <List />
                        }
                    </Button>
                </div>    
            </div>
            <div className={` gap-4
                ${displayMode == 'row' ? 'flex flex-col gap-4' : 'grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8'}
            `}
            >
                {movies.pages.map((page, i) => (
                    <Fragment key={i}>
                        {page?.map((movie: Models.Document) => (
                            <div key={movie.$id} ref={ref}>
                                <MovieCard
                                    movie={movie.details}
                                    displayMode={displayMode}
                                    isLiked={movie.isLiked}
                                    isRated={movie.isRated}
                                    rating={movie.rating}
                                    isReviewed={movie.isReviewed}
                                    review={movie.review}
                                />
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
            {isFetchingNextPage && <Loader />}
        </div>
    )
}