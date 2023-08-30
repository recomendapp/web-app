'use client';

import { useQuery, useQueryClient } from 'react-query';
import { Button } from '../ui/button';
import { databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
import { useEffect, useState } from 'react';

interface UserFollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  followeeId: string;
}

export function UserFollowButton({
  className,
  userId,
  followeeId,
}: UserFollowButtonProps) {
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
    userId &&
      followeeId &&
      handleIsUserFollowed(userId, followeeId)
        .then((res) => {
          setIsFollow(res.status);
          setIsFollowId(res.id);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [userId, followeeId]);

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
          userId: userId,
          user: userId,
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

  return (
    <Button onClick={() => (isFollow ? unfollowUser() : followUser())}>
      {isFollow ? 'Ne plus suivre' : 'Suivre'}
    </Button>
  );
}
