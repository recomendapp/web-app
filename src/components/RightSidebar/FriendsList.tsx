import { useAuth } from '@/context/auth-context';
// import { useQuery } from '@apollo/client';
// import USER_FRIENDS_QUERY from '@/graphql/User/Friends/queries/GetUserFriends';
import Link from 'next/link';
import UserCard from '../User/UserCard/UserCard';
import { Skeleton } from '../ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
// import { GetUserFriendsQuery } from '@/graphql/__generated__/graphql';

export default function FriendsList() {
  const { user } = useAuth();
  const {
    data: followings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', user?.id, 'followings'],
    queryFn: async () => {
      if (!user) throw new Error('User not found');
      const { data, error } = await supabase
        .from('user_follower')
        .select('*, friend:followee_id(*)')
        .eq('user_id', user.id);
      if (error) throw error;
      return (data);
    },
    enabled: !!user,
  })

  if (!user) return null;

  if (isLoading)
    return (
      <div>
        {Array.from({ length: 20 }).map((item: any) => (
          <div
            key={item}
            className="text-sm flex justify-between p-2 rounded-md"
          >
            <div className="flex items-center gap-2">
              {/* MOVIE COVER */}
              <Skeleton className="h-[50px] w-[50px] rounded-full" />
              {/* MOVIE DATA */}
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className='space-y-2'>
      {followings?.map(({ friend } : { friend: any }) => (
        // <Link
        //   key={friend.id}
        //   href={`/@${friend.username}`}
        //   className="flex items-center gap-2"
        // >
        <UserCard
          key={friend.id}
          user={friend}
        />
        // </Link>
      ))}
    </div>
  );
}
