import { supabase } from "@/lib/supabase/supabase"

export default async function insertWatchlistMutation ({
    film_id,
    user_id,
} : {
    film_id: number,
    user_id: string,
}) {
    const { data, error } = await supabase
        .from('user_movie_watchlist')
        .insert({
            film_id: film_id,
            user_id: user_id,
        })
        .select()
    if (error) throw error;
    return (data);
}