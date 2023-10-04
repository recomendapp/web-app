import { supabase } from "@/lib/supabase/supabase";

export default async function checkUsernameExist(username: string) {
    const { data, error } = await supabase.from('user').select('*').eq('username', username)
    if (error) throw error;
    if (data?.length) {
        return true;
    } else {
        return false;
    }
}