import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@/types/type.user";
import { supabase } from "@/lib/supabase/supabase";
import MovieCard from "@/components/Film/Card/MovieCard";

export default async function ProfileLastActivity({
    profile,
} : {
    profile: User
}) {

    const {
        data: films
    } = await supabase
        .from('user_movie_activity')
        .select('*, user(*), review(*)')
        .eq('user_id', profile.id)
        .limit(4)
        .order('created_at', { ascending: false });

    if (!films?.length)
        return null;

    return (
        <div className="@container flex flex-col gap-2">
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
            <div className="grid grid-cols-4 @2xl:grid-cols-6 @5xl:grid-cols-8 gap-1">
                {films.map((film: any) => (
                    <div key={film.film_id} className="">
                        <MovieCard
                            filmId={film.film_id}
                            displayMode="grid"
                            movieActivity={film}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}