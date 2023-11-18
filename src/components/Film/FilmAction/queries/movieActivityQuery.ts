import { supabase } from "@/lib/supabase/client";

export default async function movieActivityQuery (film_id: string, user_id: string) {
    const { data, error } = await supabase
        .from('user_movie_activity')
        .select('*')
        .eq('film_id', film_id)
        .eq('user_id', user_id)
        .single()
    if (error) throw error;
    return (data);
}