import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// CONTEXT
import { useUiContext } from '@/context/ui-context';
// UI
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/context/auth-context';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
// COMPONENTS
import SidebarCollectionContainerIcon from '@/components/Sidebar/Collection/SidebarCollectionContainerIcon';
import Loader from '@/components/Loader/Loader';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { Playlist } from '@/types/type.db';

export default function SidebarCollectionPlaylists() {
	const { user } = useAuth();
	const { isSidebarCollapsed } = useUiContext();
	const pathname = usePathname();
	const { ref, inView } = useInView();
	const numberOfResult = 20;

  const {
    data: playlists,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user', user?.id, 'playlists', { order: 'updated_at-desc'}],
    queryFn: async ({ pageParam = 1 }) => {
      if (!user?.id) return;
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      const { data, error } = await supabase
        .from('playlist')
        .select(`*`)
        .eq('user_id', user.id)
        .range(from, to)
        .order('updated_at', { ascending: false});
      if (error) throw error;
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, playlists, fetchNextPage]);

  if (isLoading) return <Loader />;

  if (!user) return null;

  if (!isLoading && !playlists?.pages[0]?.length) return null;

  return (
    <>
      {playlists?.pages.map((page, i) => (
        page?.map((playlist: Playlist, index) => (
			isSidebarCollapsed ? (
				<Tooltip key={index}>
					<TooltipTrigger asChild>
					<Button
						key={playlist?.id}
						variant={pathname === `/playlist/${playlist?.id}` ? 'secondary' : 'ghost'}
						className={`justify-start p-2`}
						ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
						asChild
					>
						<Link
						href={`/playlist/${playlist?.id}`}
						className={`
							relative flex items-center justify-center
							font-medium rounded-md transition-all w-full h-full
							${
							pathname === `/playlist/${playlist?.id}`
								? 'text-primary-foreground'
								: 'text-primary-subued hover:text-primary-foreground'
							}
						`}
						>
						<SidebarCollectionContainerIcon>
							<ImageWithFallback
								src={playlist?.poster_url ?? ''}
								alt={playlist?.title ?? ''}
								fill
								className='object-cover'
								type='playlist'
							/>
						</SidebarCollectionContainerIcon>
						</Link>
					</Button>
					</TooltipTrigger>
					<TooltipContent side="right" className="flex items-center gap-4">
						{playlist?.title}
						<span className="ml-auto text-muted-foreground">
							{playlist?.items_count}
						</span>
					</TooltipContent>
				</Tooltip>
			) : (
				<Button
					key={index}
					variant={pathname === `/playlist/${playlist?.id}` ? 'secondary' : 'ghost'}
					className={`justify-start p-2`}
					ref={(i === playlists.pages?.length - 1) && (index === page?.length - 1) ? ref : undefined }
					asChild
				>
					<Link
					href={`/playlist/${playlist?.id}`}
					className={`
						relative h-fit flex items-center p-2
						font-medium rounded-md
						${!isSidebarCollapsed ? 'w-full' : 'w-fit'}
					`}
					>
					<SidebarCollectionContainerIcon>
						<ImageWithFallback
							src={playlist?.poster_url ?? ''}
							alt={playlist?.title ?? ''}
							fill
							className='object-cover'
							type='playlist'
						/>
					</SidebarCollectionContainerIcon>
					<div
						className={`
							overflow-hidden transition-all line-clamp-1
							${!isSidebarCollapsed ? ' ml-3' : 'w-0'}
						`}
					>
						<p className="line-clamp-1">{playlist?.title}</p>
                  		<p className='text-muted-foreground line-clamp-1'>{playlist?.items_count} film{playlist?.items_count! > 1 && 's'}</p>
					</div>
					</Link>
				</Button>
			)
			))
		))}
    </>
  )
}

