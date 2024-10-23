import { useAuth } from '@/context/auth-context';
import UserCard from '../User/UserCard/UserCard';
import { Skeleton } from '../ui/skeleton';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { useUserFolloweesInfinite } from '@/features/user/userQueries';
import Loader from '../Loader/Loader';
import { useSupabaseClient } from '@/context/supabase-context';

export default function FriendsList() {
  const { user } = useAuth();
  const { ref, inView } = useInView();
  const {
		data: followees,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useUserFolloweesInfinite({
		userId: user?.id,
	});

  useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, followees, fetchNextPage]);

  if (!user) return null;

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 20 }).map((item: any, i) => (
          <div
            key={i}
            className="text-sm flex justify-between p-2 rounded-md"
          >
            <div className="flex items-center gap-2">
              {/* USER AVATAR */}
              <Skeleton className="h-[50px] w-[50px] rounded-full" />
              {/* USER NAME */}
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ScrollArea className="space-y-4 h-full">
      {followees?.pages[0]?.length ? (
				followees?.pages.map((page, i) => (
					page?.map(({ followee } : { followee: any }, index) => (
            <UserCard
              key={followee?.id}
              user={followee}
              {...(i === followees.pages.length - 1 &&
                index === page.length - 1
                  ? { ref: ref }
                  : {})}
            />
          ))
        ))
      ) : (
        <p className="text-muted-foreground">Aucune personne suivie</p>
      )}
      {(isLoading || isFetchingNextPage) && <Loader />}
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
