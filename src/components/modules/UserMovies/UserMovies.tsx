"use client"

import MoviePlaylistCardSmall from "@/components/elements/MoviePlaylist/MoviePlaylistCard";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import handlePlaylists from "@/hooks/movie/playlist/handlePlaylists";
import { Models } from "appwrite";
import { useInfiniteQuery, useQuery } from "react-query";
import getMovies from "./_queries/getMovies";
import { useUser } from "@/context/UserProvider";
import MovieCardSmall from "@/components/elements/Movie/MovieCardSmall";
import { Fragment, useEffect, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import MovieCard from "@/components/elements/Movie/MovieCard";
import Loader from "@/components/elements/Loader/Loader";
import { useInView } from 'react-intersection-observer';


export default function UserMovies({ userId } : { userId: string }) {

    const { user } = useUser();

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
        queryKey: ['user', userId, 'movies'],
        queryFn: ({pageParam = 1}) => getMovies(userId, pageParam, numberOfResult, 'fr-FR'),
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

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-center">
                <h3 className="font-semibold text-xl text-accent-1">Œuvres</h3>
                <Button variant={'ghost'} onClick={() => setDisplayMode(displayMode == 'grid' ? 'row' : 'grid')}>
                    {displayMode == 'grid' ?
                        <LayoutGrid />
                    :
                        <List />
                    }
                </Button>
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