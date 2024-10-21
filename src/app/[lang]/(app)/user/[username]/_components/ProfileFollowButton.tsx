'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';

interface UserFollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  profileId: string;
}

export function ProfileFollowButton({
  className,
  profileId,
}: UserFollowButtonProps) {
  const supabase = useSupabaseClient();
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data: isFollow, isLoading: loading } = useQuery({
    queryKey: ['user', user?.id, 'followers', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_follower')
        .select('*')
        .eq('followee_id', profileId)
        .eq('user_id', user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    meta: {
      normalize: false
    },
    enabled: !!user,
  });

  const { mutateAsync: insertFollowerMutation } = useMutation({
    mutationFn: async ({ followee_id, user_id } : { followee_id: string, user_id: string}) => {
      const { data, error } = await supabase
        .from('user_follower')
        .insert({
          followee_id: followee_id,
          user_id: user_id,
        })
        .select('*, friend:followee_id(*)')
        .single();
      if (error) throw error;
      return (data);
    },
    onSuccess: (data, variables) => {
      // Update follow status
      queryClient.setQueryData(
        ['user', variables.user_id, 'followers', variables.followee_id],
        data
      );
      // Add the followee to the user's following list only if the follow is not pending
      !data.is_pending && queryClient.setQueryData(
        ['user', variables.user_id, 'followings'],
        (existData: any) => {
          return existData ? [...existData, data] : [data];
        }
      );
    },
  });

  const { mutateAsync: deleteFollowerMutation } = useMutation({
    mutationFn: async ({ followee_id, user_id } : { followee_id: string, user_id: string}) => {
      const { error } = await supabase
        .from('user_follower')
        .delete()
        .eq('followee_id', followee_id)
        .eq('user_id', user_id);
      if (error) throw error;
      return false;
    },
    onSuccess: (data, variables) => {
      // Update follow status
      queryClient.setQueryData(
        ['user', variables.user_id, 'followers', variables.followee_id],
        data
      );
      // Delete the followee from the user's followeing list
      queryClient.setQueryData(
        ['user', variables.user_id, 'followings'],
        (data: any) => {
          return data?.filter((item: any) => item.followee_id !== variables.followee_id);
        }
      );
    },
  });

  async function followUser() {
    try {
      user?.id &&
        (await insertFollowerMutation({
          followee_id: profileId,
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
          followee_id: profileId,
          user_id: user?.id,
        }));
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  }

  if (!user || user.id == profileId) return null;

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
          {isFollow ? (
            isFollow.is_pending ? 'Demande envoyée' : 'Suivi(e)'
          ) : (
            'Suivre'
          )}
        </Button>
      )}
    </div>
  );
}
