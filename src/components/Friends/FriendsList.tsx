import { useAuth } from '@/context/AuthContext/auth-context';
import { useQuery } from '@apollo/client';
import USER_FRIENDS_QUERY from '@/graphql/User/Friends/queries/GetUserFriends';
import { Friend } from '@/types/type.user';
import Link from 'next/link';
import UserCard from '../User/UserCard/UserCard';
import { Skeleton } from '../ui/skeleton';
import { GetUserFriendsQuery } from '@/graphql/__generated__/graphql';

export default function FriendsList() {
  const { user } = useAuth();

  const {
    data: userFriendsQuery,
    loading,
    error,
  } = useQuery<GetUserFriendsQuery>(USER_FRIENDS_QUERY, {
    variables: {
      user_id: user?.id,
    },
    skip: !user,
  });
  const friends = userFriendsQuery?.user_friendCollection?.edges;

  if (!user) return null;

  if (loading)
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
    <div>
      {friends?.map(({ node }) => (
        <Link
          key={node.friend_id}
          href={`/@${node.friend.username}`}
          className="flex items-center gap-2"
        >
          <UserCard user={node.friend} />
        </Link>
      ))}
    </div>
  );
}
