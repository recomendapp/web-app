import { supabase } from '@/lib/supabase/client';

export default async function insertFollowerMutation({
  followee_id,
  user_id,
}: {
  followee_id: string;
  user_id: string;
}) {
  const { data, error } = await supabase.from('user_follower').insert({
    followee_id: followee_id,
    user_id: user_id,
  });
  if (error) throw error;
  return true;
}
