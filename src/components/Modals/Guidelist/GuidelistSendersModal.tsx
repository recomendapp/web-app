'use client'

import { useEffect } from "react";

import { useAuth } from "@/context/auth-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInView } from "react-intersection-observer";
import UserCard from "@/components/User/UserCard/UserCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

const GuidelistSendersModal = ({
	id,
	guidelist_id
  } : {
	id: string,
	guidelist_id: number,
  }) => {

	const { user } = useAuth();

	const { ref, inView } = useInView();

	const numberOfResult = 20;

	const {
		data: guidelistItem,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['user', user?.id, 'guidelist', guidelist_id],
		queryFn: async ({ pageParam = 1 }) => {
			if (!guidelist_id) throw Error('Missing guidelist id');
			let from = (pageParam - 1) * numberOfResult;
			let to = from - 1 + numberOfResult;
		
			const { data, error } = await supabase
				.from('user_movie_guidelist_item')
				.select(`*, user(*)`)
				.eq('guidelist_id', guidelist_id)
				.range(from, to)
				.order('created_at', { ascending: true });
			if (error) throw error;
			return data;
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
		  return lastPage?.length == numberOfResult ? pages.length + 1 : undefined;
		},
		enabled: !!user?.id && !!guidelist_id,
	});	

	useEffect(() => {
		if (inView && hasNextPage)
		  fetchNextPage();
	}, [inView, hasNextPage, guidelistItem, fetchNextPage]);
  
	return (
		<ScrollArea className="h-[40vh]">
			<div className="space-y-2">
				{guidelistItem?.pages.map((page, i) => (
					page?.map((item, index) => (
						<div
							key={item.id}
							className="bg-muted rounded-xl p-2 space-y-2"
							ref={(i === guidelistItem.pages.length - 1) && (index === page.length - 1) ? ref : undefined }
							>
							<UserCard user={item.user} />
							{item.comment && (
								<div className="pl-8">
									<div className="bg-background rounded-md p-2">
										{item.comment}
									</div>
								</div>
							)}
						</div>
					))
				))}
			</div>
		</ScrollArea>
	);
};

export default GuidelistSendersModal;