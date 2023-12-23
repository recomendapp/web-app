"use client"

import { Button } from "@/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import MovieCard from "@/components/Film/Card/MovieCard";
import Loader from "@/components/Loader/Loader";
import { useInView } from 'react-intersection-observer';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/types/type.user";
import { useInfiniteQuery } from "react-query";
import { supabase } from "@/lib/supabase/client";

interface UserMoviesProps {
    profile: User;
}

export default function ProfileFilms({
    profile,
} : UserMoviesProps) {

    const [ order, setOrder ] = useState("watch-desc")

    const [ displayMode, setDisplayMode ] = useState<"grid" | "row">('grid');

    const { ref, inView } = useInView();

    const numberOfResult = 20;
  
    const {
        data: films,
        isLoading: loading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        } = useInfiniteQuery({
        queryKey: ['user', profile.id, 'films', order],
        queryFn: async ({ pageParam = 1 }) => {
            let from = (pageParam - 1) * numberOfResult;
            let to = from - 1 + numberOfResult;
            let column;
            let ascending;

            const [tablePart, orderPart] = order.split('-');

            if (tablePart === "like") {
                column = 'created_at';
            } else if (tablePart == "rating") {
                column = 'rating';
            } else {
                column = 'date';
            }

            if (orderPart === "desc")
                ascending = false;
            else
                ascending = true;

            const { data } = await supabase
                .from('user_movie_activity')
                .select('*, user(*), review:user_movie_review(*)')
                .eq('user_id', profile.id)
                .range(from, to)
                .order(column, { ascending });

            return (data);
        },
        getNextPageParam: (data, pages) => {
            return data?.length == numberOfResult ? pages.length + 1 : undefined  
        },
    });
    
    useEffect(() => {
        if (inView && hasNextPage)
            fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage])

    if (loading)
        return 
            <div>Loading</div>
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
                                <SelectLabel>Vus</SelectLabel>
                                <SelectItem value={"watch-desc"}>Plus récents</SelectItem>
                                <SelectItem value={"watch-asc"}>Plus anciens</SelectItem>
                            </SelectGroup>
                            <SelectSeparator />
                            <SelectGroup>
                                <SelectLabel>Notes</SelectLabel>
                                <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem>
                                <SelectItem value={"rating-asc"}>Notes croissantes</SelectItem>
                            </SelectGroup>
                            <SelectSeparator />
                            <SelectGroup>
                                <SelectLabel>Coups de coeur</SelectLabel>
                                <SelectItem value={"like-desc"}>Plus récents</SelectItem>
                                <SelectItem value={"like-asc"}>Plus anciens</SelectItem>
                            </SelectGroup>
                            {/* <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem> */}
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
            {films?.pages[0]?.length ?
                <>
                    <div className={` gap-2
                        ${displayMode == 'row' ? 'flex flex-col' : 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8'}
                    `}
                    >
                        {films?.pages.map((page, i) => (
                            <Fragment key={i}>
                                {page?.map((film: any, index) => (
                                    <div key={film.id}
                                        {...(i === films.pages.length - 1 && index === page.length - 1
                                            ? { ref: ref }
                                            : {})}
                                    >
                                        <MovieCard
                                            filmId={film.film_id}
                                            displayMode={displayMode}
                                            movieActivity={film}
                                        />
                                    </div>
                                ))}
                            </Fragment>
                        ))}
                    </div>
                    {(loading || isFetchingNextPage) && <Loader />}
                </>
            :
                <p className="text-center font-semibold">Aucun film.</p>
            }  
        </div>
    )
}