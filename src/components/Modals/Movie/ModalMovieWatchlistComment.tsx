'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useModal } from "@/context/modal-context";
import { UserMovieWatchlist } from "@/types/type.db";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { useUserMovieWatchlistUpdate } from "@/features/user/userMutations";

interface ModalMovieWatchlistCommentProps extends ModalType {
	watchlistItem: UserMovieWatchlist;
}

const ModalMovieWatchlistComment = ({
	watchlistItem,
	...props
} : ModalMovieWatchlistCommentProps) => {
	const { closeModal } = useModal();
	const updateWatchlist = useUserMovieWatchlistUpdate();
	const [comment, setComment] = useState<string>(watchlistItem?.comment ?? '');

	useEffect(() => {
		setComment(watchlistItem?.comment ?? '');
	}, [watchlistItem?.comment]);

	async function onSubmit() {  
	  if (comment == watchlistItem?.comment) {
		closeModal(props.id);
		return;
	  }
	  await updateWatchlist.mutateAsync({
		watchlistId: watchlistItem?.id,
		comment: comment,
	  }, {
		onSuccess: () => {
			toast.success('Enregistré');
			closeModal(props.id);
		},
		onError: () => {
		  toast.error('Une erreur s\'est produite');
		}
	  });
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
				disabled={updateWatchlist.isPending}
				className="col-span-3 resize-none h-48"
				placeholder='Ajouter un commentaire...'
				/>
			</ModalBody>
			<ModalFooter>
				<Button type="submit" onClick={onSubmit}>Enregistrer</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ModalMovieWatchlistComment;