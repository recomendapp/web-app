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

  async function handleIsPersonFollowed(userId: string, personId: number) {
    try {
      
    } catch (error) {
      return {
        id: '',
        status: false,
      };
    }
  }

  async function followPerson() {
    try {
      setIsFollow(true);
    } catch (error) {
      console.error('error:', error);
    }
  }

  async function unfollowPerson() {
    try {
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
