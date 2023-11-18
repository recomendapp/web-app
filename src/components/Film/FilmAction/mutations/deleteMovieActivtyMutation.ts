import { supabase } from "@/lib/supabase/client"

export default async function deleteMovieActivityMutation ({
    film_id,
    user_id,
} : {
    film_id: number,
    user_id: string,
}) {
    const { data, error } = await supabase
        .from('user_movie_activity')
        .delete()
        .eq('film_id', film_id)
        .eq('user_id', user_id)
    if (error) throw error;
    return (undefined);
}