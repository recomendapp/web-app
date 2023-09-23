'use client';

import { useQuery, useQueryClient } from 'react-query';
import { Button } from '../../ui/button';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserProvider';

interface UserFollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  followeeId: string;
}

export function UserFollowButton({
  className,
  followeeId,
}: UserFollowButtonProps) {
  const { user } = useUser();
  const [isFollow, setIsFollow] = useState<boolean | null>(null);
  const [isFollowId, setIsFollowId] = useState<string | null>(null);
  // const queryClient = useQueryClient()
  // const { data: follow, isLoading, isError } = useQuery({
  //     queryKey: ['user', userId, "following", followeeId, "follow"],
  //     queryFn: () => handleIsUserFollowed(userId, followeeId),
  //     enabled: userId !== undefined && userId !== null && followeeId !== undefined,
  //     // staleTime: 30_000
  // })

  useEffect(() => {
    user &&
      followeeId &&
      handleIsUserFollowed(user.$id, followeeId)
        .then((res) => {
          setIsFollow(res.status);
          setIsFollowId(res.id);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [user, followeeId]);

  async function handleIsUserFollowed(userId: string, followeeId: string) {
    try {
      const response = await (
        await databases.listDocuments(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER),
          [Query.equal('followeeId', followeeId), Query.equal('userId', userId)]
        )
      ).documents[0];
      return {
        id: response.$id,
        status: true,
      };
    } catch (error) {
      return {
        id: '',
        status: false,
      };
    }
  }

  async function followUser() {
    try {
      const { $id } = await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER),
        'unique()',
        {
          followeeId: followeeId,
          followee: followeeId,
          userId: user.$id,
          user: user.$id,
        }
      );
      setIsFollow(true);
      setIsFollowId($id);
    } catch (error) {
      console.error('error:', error);
    }
  }

  async function unfollowUser() {
    try {
      isFollowId &&
        (await databases.deleteDocument(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER),
          isFollowId
        ));
      setIsFollow((current) => !current);
      setIsFollowId(null);
    } catch (error) {
      console.error('error:', error);
    }
  }

  if (!user || user.$id == followeeId)
    return null;

  return (
    <Button variant={'accent-1'} onClick={() => (isFollow ? unfollowUser() : followUser())} className='rounded-full'>
      {isFollow ? 'Ne plus suivre' : 'Suivre'}
    </Button>
  );
}
