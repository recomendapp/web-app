import MovieCard from "@/components/Film/Card/MovieCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { User } from "@/types/type.user";

export default function ProfileFavoriteFilms({
    profile
} : {
    profile: User
}) {

    if (!profile?.favorite_films?.length)
        return null

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-xl text-accent-1">Films favoris</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 2xl:grid-cols-8 gap-2">
                {profile?.favorite_films?.map((filmId: number) => (
                    <MovieCard
                        key={filmId}
                        filmId={filmId}
                        displayMode={"grid"}
                    />
                ))}
            </div>
        </div>
    )
}