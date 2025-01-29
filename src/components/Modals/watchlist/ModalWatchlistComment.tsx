'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useModal } from "@/context/modal-context";
import { UserWatchlist } from "@/types/type.db";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { useUserWatchlistUpdateMutation } from "@/features/client/user/userMutations";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";

interface ModalWatchlistCommentProps extends ModalType {
	watchlistItem: UserWatchlist;
}

const ModalWatchlistComment = ({
	watchlistItem,
	...props
} : ModalWatchlistCommentProps) => {
	const { closeModal } = useModal();
	const common = useTranslations('common');
	const updateWatchlist = useUserWatchlistUpdateMutation();
	const [comment, setComment] = useState<string>(watchlistItem?.comment ?? '');

	useEffect(() => {
		setComment(watchlistItem?.comment ?? '');
	}, [watchlistItem?.comment]);

	async function onSubmit() {  
	  if (comment == watchlistItem?.comment) {
		closeModal(props.id);
		return;
	  }
	  if (!watchlistItem?.id) {
		toast.error(upperFirst(common('errors.an_error_occurred')));
		return;
	  }
	  await updateWatchlist.mutateAsync({
		watchlistId: watchlistItem?.id,
		comment: comment,
	  }, {
		onSuccess: () => {
			toast.success(upperFirst(common('word.saved')));
			closeModal(props.id);
		},
		onError: () => {
		  toast.error(upperFirst(common('errors.an_error_occurred')));
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

export {
	ModalWatchlistComment
}