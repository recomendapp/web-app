'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// GRAPHQL
import { useMutation, useQuery } from "@apollo/client";
import GET_PLAYLIST_BY_ID from '@/graphql/Playlist/Playlist/queries/GetPlaylistById';
import UPDATE_PLAYLIST_ITEM from '@/graphql/Playlist/PlaylistItem/mutations/UpdatePlaylistItem';
import type { GetPlaylistByIdQuery, GetUserMovieGuidelistItemQuery, PlaylistItemFragment, UpdatePlaylistItemMutation } from "@/graphql/__generated__/graphql";
import { useAuth } from "@/context/auth-context";
import { useLocale } from "next-intl";
import { useModal } from "@/context/modal-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInView } from "react-intersection-observer";
import GET_USER_MOVIE_GUIDELIST_ITEM from "@/graphql/User/Movie/Guidelist/queries/GetUserMovieGuidelistItem";
import UserCard from "@/components/User/UserCard/UserCard";

const GuidelistSendersModal = ({
	id,
	guidelist_id
  } : {
	id: string,
	guidelist_id: string,
  }) => {

	const { closeModal } = useModal();

	const { ref, inView } = useInView();

	const numberOfResult = 20;

	const {
		data: guidelistItemQuery,
		loading,
		fetchMore,
	  } = useQuery<GetUserMovieGuidelistItemQuery>(GET_USER_MOVIE_GUIDELIST_ITEM, {
		variables: {
		  filter: {
			guidelist_id: { eq: guidelist_id },
		  },
		  first: numberOfResult,
		},
		skip: !guidelist_id,
	  });
	  const guidelistItem = guidelistItemQuery?.user_movie_guidelist_itemCollection?.edges;
	  const pageInfo = guidelistItemQuery?.user_movie_guidelist_itemCollection?.pageInfo;
	
	  useEffect(() => {
		if (inView && pageInfo?.hasNextPage) {
		  fetchMore({
			variables: {
				filter: {
					guidelist_id: { eq: guidelist_id },
				},
			  	first: numberOfResult,
			  	after: pageInfo?.endCursor,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
			  return {
				...previousResult,
				userCollection: {
				  ...previousResult.user_movie_guidelist_itemCollection!,
				  edges: [
					...previousResult.user_movie_guidelist_itemCollection!.edges,
					...fetchMoreResult.user_movie_guidelist_itemCollection!.edges,
				  ],
				  pageInfo: fetchMoreResult.user_movie_guidelist_itemCollection!.pageInfo,
				},
			  };
			},
		  });
		}
	  }, [fetchMore, inView, pageInfo, guidelist_id]);
  
	return (
		<ScrollArea className="h-[40vh]">
			<div className="space-y-2">
				{guidelistItem?.map(({ node }, index) => (
					<div
						key={node.id}
						className="bg-muted rounded-xl p-2 space-y-2"
						ref={index === guidelistItem.length - 1 ? ref : undefined}
					>
						<UserCard user={node.user} />
						{node.comment && (
							<div className="pl-8">
								<div className="bg-background rounded-md p-2">
									{node.comment}
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