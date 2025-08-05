'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/context/modal-context";
import { PlaylistItem } from "@/types/type.db";
import { useMutation } from "@tanstack/react-query";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { useSupabaseClient } from '@/context/supabase-context';
import { usePlaylistIsAllowedToEditQuery } from "@/features/client/playlist/playlistQueries";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";

interface PlaylistCommentModalProps extends ModalType {
	playlistItem: PlaylistItem;
}

const PlaylistCommentModal = ({
	playlistItem,
	...props
} : PlaylistCommentModalProps) => {
	const t = useTranslations();
	const supabase = useSupabaseClient();
	const { data: isAllowedToEdit } = usePlaylistIsAllowedToEditQuery(playlistItem?.playlist_id as number);
	const { closeModal } = useModal();

	const { mutateAsync: updatePlaylistItem } = useMutation({
		mutationFn: async ({ comment } : { comment: string}) => {
			if (!playlistItem?.id) throw Error('Missing id');
			const { error } = await supabase
			  .from('playlist_items')
			  .update({
				comment: comment,
			  })
			  .eq('id', playlistItem.id)
			  .select(`*`)
			if (error) throw error;
			// return data;
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
		toast.success(upperFirst(t('common.messages.saved', { gender: 'male', count: 1 })));
		closeModal(props.id);
	  } catch (error) {
		toast.error(upperFirst(t('common.messages.an_error_occurred')));
	  } finally {
		setIsLoading(false);
	  }
	}
  
	return (
		<Modal open={props.open} onOpenChange={(open) => !open && closeModal(props.id)}>
			<ModalHeader>
				<ModalTitle>{upperFirst(t('common.messages.comment', { count: 1 }))}</ModalTitle>
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
				placeholder={upperFirst(t('common.messages.add_comment', { count: 1 }))}
				readOnly={!isAllowedToEdit}
				/>
			</ModalBody>
			{isAllowedToEdit &&
				<ModalFooter>
					<Button type="submit" onClick={onSubmit}>{upperFirst(t('common.messages.save'))}</Button>
				</ModalFooter>
			}
		</Modal>
	);
};

export default PlaylistCommentModal;