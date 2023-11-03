"use client"

import { useAuth } from '@/context/AuthContext/AuthProvider';
import { supabase } from '@/lib/supabase/supabase';
import { useQuery, useQueryClient } from 'react-query';
import { Activity } from '@/components/Feed/Activity/Activity';
import { Activity as ActivityType } from '@/types/type.feed';

export default function Feed() {

  const { user } = useAuth();

  const {
    data: following,
    isLoading: followingLoading,
  } = useQuery({
    queryKey: ['user', user?.id, 'following'],
    queryFn: async () => {
      const { data } = await supabase
        .from('follower')
        .select('followee_id')
        .eq('user_id', user?.id)
      const followeeIds = data?.map(item => item.followee_id) || [];
      followeeIds.push(user?.id);
      return (followeeIds)
    },
    enabled: user !== undefined && user !== null,
  });

  

  return (
      <div className='w-full max-w-xl'>
          {/* {activities?.map((activity) => (
              <Activity key={activity.id} activity={activity}/>
          ))} */}
      </div>
  )
}