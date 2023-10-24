'use client';

import { Button } from '../../ui/button';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { User } from '@/types/type.user';
import { Skeleton } from '@/components/ui/skeleton';

import DELETE_FOLLOWER_MUTATION from '@/components/Profile/ProfileFollowButton/mutations/deleteFollowerMutation'
import INSERT_FOLLOWER_MUTATION from '@/components/Profile/ProfileFollowButton/mutations/insertFollowerMutation'
import FOLLOWER_QUERY from '@/components/Profile/ProfileFollowButton/queries/followerQuery'
import { cn } from '@/lib/utils/utils';

interface UserFollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: User;
}

export function ProfileFollowButton({
  className,
  profile,
}: UserFollowButtonProps) {
  const { user } = useAuth();

  const { data: followerQuery, loading, error } = useQuery(FOLLOWER_QUERY, {
    variables: {
      followeeId: profile.id,
      follower_id: user?.id,
    },
    skip: !user
  })

  const isFollow = followerQuery?.followerCollection?.edges[0]?.follower

  const [ deleteFollowerMutation, { error: errorDeletingFollower } ] = useMutation(DELETE_FOLLOWER_MUTATION, {
    update: (store) => {
    //   const profileData = store.readQuery<{ userCollection: { edges: [{ user: User}]}}>({
    //     query: PROFILE_QUERY,
    //     variables: {
    //       username: profile.username
    //     },
    //   })
    //   const newFollowerCount = String(Number(profileData?.userCollection.edges[0].user.followers_count) - 1)

    //   store.writeQuery({
    //     query: PROFILE_QUERY,
    //     variables: {
    //       username: profile.username
    //     },
    //     data: {
    //       userCollection: {
    //         edges: [
    //           {
    //             user: {
    //               ...profileData!.userCollection.edges[0].user,
    //               followers_count: newFollowerCount
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   })
      // UPDATE FOLLOWING STATE
      store.writeQuery({
        query: FOLLOWER_QUERY,
        variables: {
          followeeId: profile.id,
          follower_id: user?.id,
        },
        data: {
          followerCollection: {
            edges: []
          }
        }
      })
    },
  });
  const [ insertFollowerMutation, { error: errorAddingFollower} ] = useMutation(INSERT_FOLLOWER_MUTATION, {
    update: (store, { data }) => {
      // const profileData = store.readQuery<{ userCollection: { edges: [{ user: User}]}}>({
      //   query: PROFILE_QUERY,
      //   variables: {
      //     username: profile.username
      //   },
      // })
      // console.log('profileData', profileData)
      // const newFollowerCount = String(Number(profileData?.userCollection.edges[0].user.followers_count) + 1)
      // store.writeQuery({
      //   query: PROFILE_QUERY,
      //   variables: {
      //     username: profile.username
      //   },
      //   data: {
      //     userCollection: {
      //       edges: [
      //         {
      //           user: {
      //             ...profileData!.userCollection.edges[0].user,
      //             followers_count: newFollowerCount
      //           }
      //         }
      //       ]
      //     }
      //   }
      // })

      // UPDATE FOLLOWING STATE
      store.writeQuery({
        query: FOLLOWER_QUERY,
        variables: {
          followeeId: profile.id,
          follower_id: user?.id,
        },
        data: {
          followerCollection: {
            edges: [
              { action: data.insertIntofollowerCollection.records[0] }
            ]
          }
        }
      })
    },
  });

  async function followUser() {
    try {
      const { errors } = await insertFollowerMutation({
        variables: {
          followee_id: profile.id,
          follower_id: user?.id
        }
      });
      if (errors) throw errors;
    } catch (error) {
      console.log(error)
      toast.error('Une erreur s\'est produite');
    }
  }

  async function unfollowUser() {
    try {
      const { errors } = await deleteFollowerMutation({
        variables: {
          followee_id: profile.id,
          follower_id: user?.id
        }
      });
      if (errors) throw errors;
    } catch (error) {
      toast.error('Une erreur s\'est produite');
    }
  }


  if (!user || user.id == profile.id)
    return null;

  return (
    <div className={cn('flex items-center', className)}>
      {loading ? 
        <Skeleton className="h-10 w-16 rounded-full" />
      :
        <Button variant={'accent-1'} onClick={() => (isFollow ? unfollowUser() : followUser())} className='rounded-full py-0'>
          {isFollow ? 'Ne plus suivre' : 'Suivre'}
        </Button>
      }
    </div>
  );
}
