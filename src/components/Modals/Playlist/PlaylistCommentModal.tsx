'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useAuth } from "@/context/auth-context";
import { useModal } from "@/context/modal-context";
import { Playlist, PlaylistGuest, PlaylistItem } from "@/types/type.db";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { useSupabaseClient } from '@/context/supabase-context';
import { playlistKeys } from "@/features/playlist/playlistKeys";
import { usePlaylistIsAllowedToEdit } from "@/features/playlist/playlistQueries";

interface PlaylistCommentModalProps extends ModalType {
	playlistItem: PlaylistItem;
}

const PlaylistCommentModal = ({
	playlistItem,
	...props
} : PlaylistCommentModalProps) => {

	const supabase = useSupabaseClient();
	const { data: isAllowedToEdit } = usePlaylistIsAllowedToEdit(playlistItem?.playlist_id as number);
	const { closeModal } = useModal();

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

	async function onSubmit() {  
	  if (comment == playlistItem?.comment) {
		closeModal(props.id);
		return;
	  }
	  try {
		setIsLoading(true);      
		await updatePlaylistItem({ comment });
		toast.success("Enregistré");
		closeModal(props.id);
	  } catch (error) {
		toast.error("Une erreur s\'est produite");
	  } finally {
		setIsLoading(false);
	  }
	}
  
	return (
		<Modal open={props.open} onOpenChange={(open) => !open && closeModal(props.id)}>
			<ModalHeader>
				<ModalTitle>Commentaire</ModalTitle>
			</ModalHeader>
			<ModalBody>
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
			</ModalBody>
			{isAllowedToEdit &&
				<ModalFooter>
					<Button type="submit" onClick={onSubmit}>Enregistrer</Button>
				</ModalFooter>
			}
		</Modal>
	);
};

export default PlaylistCommentModal;