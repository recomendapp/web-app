'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';

interface PersonFollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  personId: number;
}

export function PersonFollowButton({
  className,
  personId,
}: PersonFollowButtonProps) {
  const supabase = useSupabaseClient();
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data: isFollow, isLoading: loading } = useQuery({
    queryKey: ['user', user?.id, 'person', personId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_person_follower')
        .select('*')
        .eq('person_id', personId)
        .eq('user_id', user!.id)
        .maybeSingle();
      if (error) throw error;
      return (data);
    },
    meta: {
      normalize: false
    },
    enabled: !!user && !!personId,
  });

  const { mutateAsync: insertFollowerMutation } = useMutation({
    mutationFn: async ({ person_id, user_id } : { person_id: number, user_id: string}) => {
      const { data, error } = await supabase
        .from('user_person_follower')
        .insert({
          person_id: person_id,
          user_id: user_id,
        })
      if (error) throw error;
      return (true);
    },
    onSuccess: (data, variables) => {
      // Update follow status
      queryClient.setQueryData(
        ['user', user?.id, 'person', variables.person_id],
        data
      );
      // Todo: Invalidate personnalities feed
    },
    onError: (error) => {
      toast.error("Une erreur s'est produite");
    }
  });

  const { mutateAsync: deleteFollowerMutation } = useMutation({
    mutationFn: async ({ person_id, user_id } : { person_id: number, user_id: string}) => {
      if (!user_id || !person_id) throw new Error('Invalid user_id or person_id');
      const { error } = await supabase
        .from('user_person_follower')
        .delete()
        .eq('person_id', person_id)
        .eq('user_id', user_id);
      if (error) throw error;
      return (false);
    },
    onSuccess: (data, variables) => {
      // Update follow status
      queryClient.setQueryData(
        ['user', user?.id, 'person', variables.person_id],
        data
      );
      // Todo: Invalidate personnalities feed
    },
    onError: (error) => {
      toast.error("Une erreur s'est produite");
    }
  });

  if (!user) return (null);

  return (
    <div className={cn('flex items-center', className)}>
      {(loading) ? (
        <Skeleton className="h-10 w-16 rounded-full" />
      ) : (
        <Button
          variant={'accent-yellow'}
          onClick={() => {
            isFollow ?
              deleteFollowerMutation({
                person_id: personId,
                user_id: user?.id,
              })
            :
              insertFollowerMutation({
                person_id: personId,
                user_id: user?.id,
              })}}
          className="rounded-full py-0"
        >
          {isFollow ? 'Suivi(e)' : 'Suivre'}
        </Button>
      )}
    </div>
  );
}
