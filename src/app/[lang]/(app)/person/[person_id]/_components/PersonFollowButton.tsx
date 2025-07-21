'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useUserFollowPersonQuery } from '@/features/client/user/userQueries';
import { useUserFollowPersonInsertMutation, useUserUnfollowPersonDeleteMutation } from '@/features/client/user/userMutations';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';

interface PersonFollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  personId: number;
}

export function PersonFollowButton({
  className,
  personId,
}: PersonFollowButtonProps) {
  const { user } = useAuth();
  const common = useTranslations('common');

  const {
    data: isFollow,
    isLoading: loading
  } = useUserFollowPersonQuery({
    personId: personId,
    userId: user?.id,
  });
  const insertFollow = useUserFollowPersonInsertMutation();
  const deleteFollow = useUserUnfollowPersonDeleteMutation();

  const followPerson = async () => {
    user?.id &&
      (await insertFollow.mutateAsync({
        userId: user?.id,
        personId: personId,
      }, {
        onError: (error) => {
          toast.error(upperFirst(common('errors.an_error_occurred')));
        }
      }));
  };

  const unfollowUser = async () => {
    user?.id &&
      (await deleteFollow.mutateAsync({
        userId: user?.id,
        personId: personId,
      }, {
        onError: (error) => {
          toast.error(upperFirst(common('errors.an_error_occurred')));
        }
      }));
  };

  if (!user) return (null);

  return (
    <div className={cn('flex items-center', className)}>
      {(loading) ? (
        <Skeleton className="h-10 w-16 rounded-full" />
      ) : (
        <Button
          variant={'accent-yellow'}
          onClick={isFollow ? unfollowUser : followPerson}
          className="rounded-full py-0"
        >
          {isFollow ? 'Suivi(e)' : 'Suivre'}
        </Button>
      )}
    </div>
  );
}
