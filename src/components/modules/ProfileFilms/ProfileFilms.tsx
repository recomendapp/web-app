"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserProvider";
import { Fragment, useEffect, useState } from "react";
import { LayoutGrid, List, Plus } from "lucide-react";
import MovieCard from "@/components/elements/Movie/MovieCard";
import Loader from "@/components/elements/Loader/Loader";
import { useInView } from 'react-intersection-observer';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { User } from "@/types/type.user";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { useQuery } from "@apollo/client";
import { FilmAction } from "@/types/type.film";
import PROFILE_FILM_QUERY from "@/components/modules/ProfileFilms/queries/profileFilmsQuery";

interface UserMoviesProps {
    profile: User;
    horizontal?: boolean;
    limit?: boolean;
}

export default function ProfileFilms({
    profile,
    horizontal = false,
    limit,
} : UserMoviesProps) {

    const [ order, setOrder ] = useState("recent")

    const [ displayMode, setDisplayMode ] = useState('grid');

    const { ref, inView } = useInView();

    const numberOfResult = 8;

    const { data: profileFilmsQuery, loading, error, fetchMore } = useQuery(PROFILE_FILM_QUERY, {
        variables: {
            user_id: profile?.id,
            order: order == 'recent' ? { "updated_at": "DescNullsLast"} : { "likes_count": "DescNullsLast"},
            first: numberOfResult,
        },
        skip: !profile
    })
    const films: [ { film_action: FilmAction }] = profileFilmsQuery?.film_actionCollection?.edges;
    const pageInfo: { hasNextPage: boolean, endCursor: string,} = profileFilmsQuery?.film_actionCollection?.pageInfo;


    useEffect(() => {
        if (inView && pageInfo?.hasNextPage) {
            console.log('fetchMore')
            fetchMore({
                variables: {
                    user_id: profile.id,
                    order: order == 'recent' ? { "updated_at": "DescNullsFirst"} : { "likes_count": "DescNullsLast"},
                    first: numberOfResult,
                    after: pageInfo?.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    return {
                      film_actionCollection: {
                        edges: [
                            ...previousResult.film_actionCollection.edges,
                            ...fetchMoreResult.film_actionCollection.edges,
                        ],
                        pageInfo: fetchMoreResult.film_actionCollection.pageInfo
                      }
                    };
                  }
            });
        }
    }, [inView, pageInfo])

    if (loading)
    {
        return (
            <div>Loading</div>
        )
    }

    if (!films)
        return (null)

    if (horizontal)
        return (
            <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-4 items-center">
                    <Link href={`/@${profile?.username}/films`}>
                        <h3 className="font-semibold text-xl text-accent-1">Films</h3>
                    </Link>
                    <div className="flex gap-2">
                        <Button variant={'link'} asChild>
                            <Link href={`/@${profile?.username}/films`}>
                                Tout afficher
                            </Link>
                        </Button>

                        <Select onValueChange={setOrder} defaultValue={order}>
                            <SelectTrigger className="w-fit">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="end">
                                <SelectGroup>
                                    <SelectLabel>Date</SelectLabel>
                                    <SelectItem value={"recent"}>Ajouté récemment</SelectItem>
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
                        {films.map(({ film_action } : { film_action: FilmAction}) => (
                            <MovieCard
                                film={film_action.film}
                                displayMode={displayMode}
                                isLiked={film_action.is_liked}
                                rating={film_action.rating}
                                review={film_action.review_id}
                            />
                        ))}
                        {pageInfo.hasNextPage && 
                            <div className="w-24 flex items-center justify-center">
                                <Button variant={'ghost'} size={'icon'} className="rounded-full" asChild>
                                    <Link href={`/@${profile?.username}/playlists`}>
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
                    <Select onValueChange={setOrder} defaultValue={order}>
                        <SelectTrigger className="w-fit">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectGroup>
                                <SelectLabel>Date</SelectLabel>
                                <SelectItem value={"recent"}>Ajouté récemment</SelectItem>
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
                {films.map(({ film_action } : { film_action: FilmAction}, index) => (
                    <div key={film_action.id} ref={index === films.length - 1 ? ref : undefined}>
                        <MovieCard
                            film={film_action.film}
                            displayMode={displayMode}
                            isLiked={film_action.is_liked}
                            rating={film_action.rating}
                            review={film_action.review_id}
                        />
                    </div>
                ))}
            </div>
            {loading && <Loader />}
        </div>
    )
}