'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext/auth-context';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '@/lib/supabase/client';

import INSERT_USER_FOLLOWER_MUTATION from '@/components/Profile/ProfileFollowButton/mutations/insertUserFollowerMutation';
import DELETE_USER_FOLLOWER_MUTATION from '@/components/Profile/ProfileFollowButton/mutations/deleteUserFollowerMutation';
import { UserFragment } from '@/graphql/__generated__/graphql';

interface UserFollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: UserFragment;
}

export function ProfileFollowButton({
  className,
  profile,
}: UserFollowButtonProps) {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data: isFollow, isLoading: loading } = useQuery({
    queryKey: ['user', user?.id, 'following', profile.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_follower')
        .select('followee_id')
        .eq('followee_id', profile.id)
        .eq('user_id', user!.id)
        .single();
      return data ? true : false;
    },
    enabled: !!user,
  });

  const { mutateAsync: insertFollowerMutation } = useMutation(
    INSERT_USER_FOLLOWER_MUTATION,
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(
          ['user', variables.user_id, 'following', variables.followee_id],
          data
        );
      },
    }
  );

  const { mutateAsync: deleteFollowerMutation } = useMutation(
    DELETE_USER_FOLLOWER_MUTATION,
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(
          ['user', variables.user_id, 'following', variables.followee_id],
          data
        );
      },
    }
  );

  async function followUser() {
    try {
      user?.id &&
        (await insertFollowerMutation({
          followee_id: profile.id,
          user_id: user?.id,
        }));
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  }

  async function unfollowUser() {
    try {
      user?.id &&
        (await deleteFollowerMutation({
          followee_id: profile.id,
          user_id: user?.id,
        }));
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  }

  if (!user || user.id == profile.id) return null;

  return (
    <div className={cn('flex items-center', className)}>
      {loading ? (
        <Skeleton className="h-10 w-16 rounded-full" />
      ) : (
        <Button
          variant={'accent-1'}
          onClick={() => (isFollow ? unfollowUser() : followUser())}
          className="rounded-full py-0"
        >
          {isFollow ? 'Suivi(e)' : 'Suivre'}
        </Button>
      )}
    </div>
  );
}
