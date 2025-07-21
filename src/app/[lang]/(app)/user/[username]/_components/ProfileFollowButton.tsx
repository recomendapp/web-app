'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';
import { useUserFollowProfileQuery } from '@/features/client/user/userQueries';
import { useUserFollowProfileInsertMutation, useUserUnfollowProfileDeleteMutation } from '@/features/client/user/userMutations';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';

interface UserFollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  profileId: string;
}

export function ProfileFollowButton({
  className,
  profileId,
}: UserFollowButtonProps) {
  const common = useTranslations('common');
  const { user } = useAuth();

  const {
    data: isFollow,
    isLoading: loading,
  } = useUserFollowProfileQuery({
    userId: user?.id,
    followeeId: profileId,
  });

  const insertFollow = useUserFollowProfileInsertMutation();
  const deleteFollowerMutation = useUserUnfollowProfileDeleteMutation();

  const followUser = async () => {
    user?.id &&
      (await insertFollow.mutateAsync({
        userId: user?.id,
        followeeId: profileId,
      }, {
        onError: (error) => {
          toast.error(upperFirst(common('errors.an_error_occurred')));
        }
      }));
  }

  const unfollowUser = async () => {
    user?.id &&
      (await deleteFollowerMutation.mutateAsync({
        userId: user?.id,
        followeeId: profileId,
      }, {
        onError: (error) => {
          toast.error(upperFirst(common('errors.an_error_occurred')));
        }
      }));
  }

  if (!user || user.id == profileId) return null;

  return (
    <div className={cn('flex items-center', className)}>
      {loading ? (
        <Skeleton className="h-10 w-16 rounded-full" />
      ) : (
        <Button
          variant={'accent-yellow'}
          onClick={() => (isFollow ? unfollowUser() : followUser())}
          className="rounded-full py-0"
        >
          {isFollow ? (
            isFollow.is_pending ? upperFirst(common('messages.request_sent')) : upperFirst(common('messages.followed'))
          ) : upperFirst(common('messages.follow'))}
        </Button>
      )}
    </div>
  );
}
