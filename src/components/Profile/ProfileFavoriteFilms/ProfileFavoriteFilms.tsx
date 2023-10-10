"use client"

import MovieCard from "@/components/Film/MovieCard";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { FilmAction } from "@/types/type.film";
import { User } from "@/types/type.user";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProfileFavoriteFilms({
    profile
} : {
    profile: User
}) {

    const { user } = useAuth();

    if (!profile?.favorite_films?.length && profile.id != user?.id)
        return null

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl text-accent-1">Films favoris</h3>
            <ScrollArea className="pb-4">
                <div className="grid grid-cols-4  md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-4">
                    {profile?.favorite_films?.map((filmId: string) => (
                        <div key={filmId} className="">
                            <MovieCard
                                filmId={filmId}
                                displayMode={"grid"}
                            />
                        </div>
                    ))}
                    {(profile.favorite_films?.length < 4) &&
                        <div className="w-full h-full flex items-center justify-center bg-muted rounded-md">
                            <Plus />
                        </div>
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}