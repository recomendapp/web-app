"use client"
import MovieCard from "@/components/Film/Card/MovieCard";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext/auth-context";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function PreviewGuidelist() {
    const { user } = useAuth();

    const {
        data: guidelist,
        isLoading: loading,
        } = useQuery({
        queryKey: ['user', user?.id, 'preview', 'guidelist'],
        queryFn: async () => {
            const { data } = await supabase.from('guidelist').select('*, user(*)').eq('receiver_user_id', user?.id);
            return data;
        },
        enabled: !!user,
    });

    if (loading)
        return <SkeletonPreviewGuidelist />
    
    if (!guidelist?.length)
        return (null);

    return (
        <div className=" flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-center">
                <Link href={'/collection/guidelist'}>
                    <h3 className="font-semibold text-xl">Film recommandées</h3>
                </Link>
                <Button variant={'link'} asChild>
                    <Link href={'/collection/guidelist'}>
                        Tout afficher
                    </Link>
                </Button>
                
            </div>
            <ScrollArea>
                <div className="flex space-x-4 pb-4">
                    {guidelist?.map((film: any) => (
                        <div key={film.film_id} className=" w-36">
                            <MovieCard
                                filmId={film.film_id}
                                displayMode="grid"
                                movieActivity={film}
                            />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export function SkeletonPreviewGuidelist() {
    return (
        <div className=" flex flex-col gap-2">
        <div className="flex justify-between gap-4 items-center">
            <Skeleton className=" w-44 h-6"/>
            <Skeleton className=" w-24 h-6"/>
        </div>
        <ScrollArea>
            <div className="flex space-x-4 pb-4">
                {Array.from({ length: 8 }).map((film: any, index) => (
                    <Skeleton key={index} className="aspect-[2/3] w-36"/>
                ))}
            </div>
        </ScrollArea>
        </div>
    )
}