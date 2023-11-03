import { supabase } from "@/lib/supabase/supabase"

export default async function deleteWatchlistMutation ({
    film_id,
    user_id,
} : {
    film_id: string,
    user_id: string,
}) {
    const { data, error } = await supabase
        .from('user_movie_watchlist')
        .delete()
        .eq('film_id', film_id)
        .eq('user_id', user_id)
    if (error) throw error;
    return (undefined);
}