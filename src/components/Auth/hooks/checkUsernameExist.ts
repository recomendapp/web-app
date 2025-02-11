import { useSupabaseClient } from '@/context/supabase-context';
import { SupabaseClient } from '@supabase/supabase-js';

export default async function checkUsernameExist(supabase: SupabaseClient, username: string) {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .ilike('username', username);
  if (error) throw error;
  if (data?.length) {
    return true;
  } else {
    return false;
  }
}
