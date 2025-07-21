'use client';

import { Link } from "@/lib/i18n/routing";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';
import { CardUser } from "@/components/Card/CardUser";
import { useSearchUsersInfinite } from "@/features/client/search/searchQueries";

export default function SearchUsersSmall({
  query,
  className,
}: {
  query: string | undefined;
  className?: string;
}) {
  const common = useTranslations('common');
  const {
		data: users,
		isLoading,
	} = useSearchUsersInfinite({
    query: query,
  });

  const showSkeleton = users === undefined || isLoading;

  if ((!showSkeleton && !users) || users?.pages[0]?.length == 0) return null;

  return (
    <div className={cn(" w-full flex flex-col gap-2", className)}>
      {showSkeleton
        ? <Skeleton className="h-8 w-32" />
        : (
          <Button
          variant={'link'}
          className="text-2xl font-bold justify-start p-0"
          asChild
          >
            <Link href={`/search/users?q=${query}`}>{upperFirst(common('messages.user', { count: 2}))}</Link>
          </Button>
        )}
      {/* USERS CONTAINER */}
      <ScrollArea className="pb-4">
        <div className="flex gap-4">
          {showSkeleton ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="flex flex-col items-center bg-secondary h-full rounded-xl p-2 gap-2"
              >
                <Skeleton className=" h-[150px] w-[150px] rounded-full" />
                <Skeleton className=" h-5 w-20" />
                <Skeleton className=" h-5 w-20 rounded-full" />
              </Skeleton>
            ))
          ) : users?.pages.map((page, i) => (
            page?.map((user, index) => (
              <CardUser
              variant="vertical"
              key={`${user.id}-${i}-${index}`}
              user={user}
              linked
              />
            ))
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
