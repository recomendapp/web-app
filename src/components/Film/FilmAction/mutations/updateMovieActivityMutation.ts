import { supabase } from "@/lib/supabase/supabase"

export default async function updateMovieActivityMutation ({
    film_id,
    user_id,
    data,
} : {
    film_id: number,
    user_id: string,
    data: any
}) {
    const { data: response, error } = await supabase
        .from('user_movie_activity')
        .update(data)
        .eq('film_id', film_id)
        .eq('user_id', user_id)
        .select()
        .single()
    if (error) throw error;
    return (response);
}