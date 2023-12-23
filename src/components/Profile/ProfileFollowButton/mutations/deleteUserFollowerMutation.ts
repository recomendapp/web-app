import { supabase } from "@/lib/supabase/client"

export default async function deleteFollowerMutation ({
    followee_id,
    user_id,
} : {
    followee_id: string,
    user_id: string,
}) {
    const { data, error } = await supabase
        .from('user_follower')
        .delete()
        .eq('followee_id', followee_id)
        .eq('user_id', user_id)
    if (error) throw error;
    return false;
}