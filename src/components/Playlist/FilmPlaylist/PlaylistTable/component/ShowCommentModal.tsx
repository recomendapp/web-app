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
import type { GetPlaylistByIdQuery, PlaylistItemFragment, UpdatePlaylistItemMutation } from "@/graphql/__generated__/graphql";
import { useAuth } from "@/context/auth-context";
import { useLocale } from "next-intl";

const ShowCommentModal = ({
	playlistItem,
	open,
	setOpen,
  } : {
	playlistItem: PlaylistItemFragment,
	open: boolean,
	setOpen: Dispatch<SetStateAction<boolean>>,
  }) => {

	const { user } = useAuth();

	const locale = useLocale();

	const { data: playlistQuery, refetch } = useQuery<GetPlaylistByIdQuery>(GET_PLAYLIST_BY_ID, {
		variables: {
		  id: playlistItem.playlist_id,
		  locale: locale
		},
		skip: !playlistItem.playlist_id || !locale,
	});
	const playlist = playlistQuery?.playlistCollection?.edges[0]?.node;
	
	const isAllowedToEdit = Boolean(
		user?.id &&
		playlist &&
		(
			user?.id === playlist?.user_id ||
			(
			playlist?.guests?.edges.some(
				({ node }) => node.user_id === user?.id && node.edit
			) &&
			playlist?.user?.subscriptions?.edges.length! > 0
			)
		)
	);
  
	const [updatePlaylistItem] = useMutation<UpdatePlaylistItemMutation>(UPDATE_PLAYLIST_ITEM);
  
	const [isLoading, setIsLoading] = useState<boolean>(false);
  
	const [comment, setComment] = useState<string>(playlistItem.comment ?? '');

	useEffect(() => {
		setComment(playlistItem.comment ?? '');
	}, [playlistItem.comment]);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
	  event.preventDefault();
  
	  if (comment == playlistItem.comment) {
		setOpen(false);
		return;
	  }
	  try {
		setIsLoading(true);      
		const { data } = await updatePlaylistItem({
		  variables: {
			id: playlistItem.id,
			comment: comment,
		  }
		})
		if (!data?.updateplaylist_itemCollection.records.length) throw new Error('Nothing updated');
		setOpen(false);
	  } catch (error) {
		toast.error("Une erreur s\'est produite");
	  } finally {
		setIsLoading(false);
	  }
	}
  
	return (
	  <Dialog open={open} onOpenChange={setOpen}>
		<DialogContent className="sm:max-w-[425px]">
		  <DialogHeader>
			<DialogTitle>Commentaire</DialogTitle>
		  </DialogHeader>
			<form onSubmit={onSubmit} className="space-y-2">
			  <Textarea
				id="name"
				value={comment}
				onChange={(e) =>
				  setComment(e.target.value.replace(/\s+/g, ' ').trimStart())
				}
				maxLength={180}
				disabled={isLoading}
				className="col-span-3 resize-none h-48"
				placeholder='Ajouter un commentaire...'
				readOnly={!isAllowedToEdit}
			  />
			  {isAllowedToEdit &&
				<DialogFooter>
				  <Button type="submit">Save changes</Button>
				</DialogFooter>
			  }
			</form>
		</DialogContent>
	  </Dialog>
	);
};

export default ShowCommentModal;