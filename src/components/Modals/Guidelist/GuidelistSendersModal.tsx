'use client'

import { useEffect } from "react";

import { useAuth } from "@/context/auth-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInView } from "react-intersection-observer";
import UserCard from "@/components/User/UserCard/UserCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { UserMovieGuidelistView } from "@/types/type.db";

const GuidelistSendersModal = ({
	comments,
  } : {
	comments: UserMovieGuidelistView['senders'],
  }) => {
  
	return (
		<ScrollArea className="h-[40vh]">
			<div className="space-y-2">
				{comments?.map((item: any) => (
					<div
						key={item.user.id}
						className="bg-muted rounded-xl p-2 space-y-2"
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
				))}
			</div>
		</ScrollArea>
	);
};

export default GuidelistSendersModal;