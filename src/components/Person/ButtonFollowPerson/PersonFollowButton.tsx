'use client';

import { Button } from '../../ui/button';
import { useState } from 'react';

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
      console.log('ok');
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
      console.log('ok');
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
