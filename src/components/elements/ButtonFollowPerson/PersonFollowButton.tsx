'use client';

import { useQuery, useQueryClient } from 'react-query';
import { Button } from '../../ui/button';
import { Query } from 'appwrite';
import { useEffect, useState } from 'react';

interface PersonFollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  personId: number;
}

export function PersonFollowButton({
  className,
  userId,
  personId,
}: PersonFollowButtonProps) {
  const [isFollow, setIsFollow] = useState<boolean | null>(null);
  const [isFollowId, setIsFollowId] = useState<string | null>(null);

  useEffect(() => {
    userId &&
      personId &&
      handleIsPersonFollowed(userId, personId)
        .then((res) => {
          setIsFollow(res.status);
          setIsFollowId(res.id);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [userId, personId]);

  async function handleIsPersonFollowed(userId: string, personId: number) {
    try {
      const response = await (
        await databases.listDocuments(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PERSON_FOLLOWER),
          [Query.equal('personId', personId), Query.equal('userId', userId)]
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

  async function followPerson() {
    try {
      const { $id } = await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PERSON_FOLLOWER),
        'unique()',
        {
          personId: personId,
          userId: userId,
        }
      );
      setIsFollow(true);
      setIsFollowId($id);
    } catch (error) {
      console.error('error:', error);
    }
  }

  async function unfollowPerson() {
    try {
      isFollowId &&
        (await databases.deleteDocument(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PERSON_FOLLOWER),
          isFollowId
        ));
      setIsFollow((current) => !current);
      setIsFollowId(null);
    } catch (error) {
      console.error('error:', error);
    }
  }

  return (
    <Button onClick={() => (isFollow ? unfollowPerson() : followPerson())}>
      {isFollow ? 'Ne plus suivre' : 'Suivre'}
    </Button>
  );
}
