'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { useAuth } from "@/context/auth-context";
import { useModal } from "@/context/modal-context";
import { Playlist, PlaylistGuest, PlaylistItem } from "@/types/type.db";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

const PlaylistCommentModal = ({
	id,
	playlistItem,
  } : {
	id: string,
	playlistItem: PlaylistItem,
  }) => {

	const { closeModal } = useModal();

	const { user } = useAuth();

	const queryClient = useQueryClient();

  	const playlist = queryClient.getQueryData<Playlist>(['playlist', playlistItem?.playlist_id]);
	
	const isAllowedToEdit = Boolean(
		user?.id &&
		playlist &&
		(
			user?.id === playlist?.user_id ||
			(
			playlist?.guests?.some(
				(guest: PlaylistGuest) => guest?.user_id === user?.id && guest?.edit
			) &&
			playlist?.user?.premium
			)
		)
	);

	const { mutateAsync: updatePlaylistItem } = useMutation({
		mutationFn: async ({ comment } : { comment: string}) => {
			if (!playlistItem?.id) throw Error('Missing id');
			const { data, error } = await supabase
			  .from('playlist_item')
			  .update({
				comment: comment,
			  })
			  .eq('id', playlistItem.id)
			  .select(`*`)
			if (error) throw error;
			return data;
		},
	})

	const [isLoading, setIsLoading] = useState<boolean>(false);
  
	const [comment, setComment] = useState<string>(playlistItem?.comment ?? '');

	useEffect(() => {
		setComment(playlistItem?.comment ?? '');
	}, [playlistItem?.comment]);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
	  event.preventDefault();
  
	  if (comment == playlistItem?.comment) {
		closeModal(id);
		return;
	  }
	  try {
		setIsLoading(true);      
		await updatePlaylistItem({ comment });
		toast.success("Enregistré");
		closeModal(id);
	  } catch (error) {
		toast.error("Une erreur s\'est produite");
	  } finally {
		setIsLoading(false);
	  }
	}
  
	return (
		<>
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
		</>
	);
};

export default PlaylistCommentModal;