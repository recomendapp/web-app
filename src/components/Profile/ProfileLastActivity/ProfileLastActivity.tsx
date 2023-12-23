"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@/types/type.user";
import { supabase } from "@/lib/supabase/client";
import MovieCard from "@/components/Film/Card/MovieCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useInfiniteQuery } from "react-query";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProfileLastActivity({
    profile,
} : {
    profile: User
}) {

    const [ order, setOrder ] = useState("watch-desc")
    const { ref, inView } = useInView();

    const numberOfResult = 10;
  
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

    if (!films?.pages[0]?.length)
        return null;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-center">
                <Link href={`/@${profile?.username}/films`}>
                    <h3 className="font-semibold text-xl text-accent-1">Dernières activités</h3>
                </Link>
                <Button variant={'link'} asChild>
                    <Link href={`/@${profile?.username}/films`}>
                        Tout afficher
                    </Link>
                </Button>
            </div>
            <ScrollArea className="rounded-md">
                <div className="flex space-x-4 pb-4">
                    {films?.pages.map((page, i) => (
                        <Fragment key={i}>
                            {page?.map((film: any, index) => (
                                <div key={film.id} className="w-[150px] pb-2"
                                    {...(i === films.pages.length - 1 && index === page.length - 1
                                        ? { ref: ref }
                                        : {})}
                                >
                                    <MovieCard
                                        filmId={film.film_id}
                                        displayMode={"grid"}
                                        movieActivity={film}
                                    />
                                </div>
                            ))}
                        </Fragment>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {/* <div className="grid grid-cols-4 md:grid-cols-6 2xl:grid-cols-8 gap-2">
                {films.map((film: any) => (
                    <div key={film.film_id} className="">
                        <MovieCard
                            filmId={film.film_id}
                            displayMode="grid"
                            movieActivity={film}
                        />
                    </div>
                ))}
            </div> */}
        </div>
    )
}