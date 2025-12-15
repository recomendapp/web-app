'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/context/modal-context";
import { UserWatchlistTvSeries } from "@recomendapp/types";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { useUserWatchlistTvSeriesUpdateMutation } from "@/features/client/user/userMutations";
import { upperFirst } from "lodash";
import { useT } from "@/lib/i18n/client";

interface ModalUserWatchlistTvSeriesCommentProps extends ModalType {
	watchlistItem: UserWatchlistTvSeries;
}

const ModalUserWatchlistTvSeriesComment = ({
	watchlistItem,
	...props
} : ModalUserWatchlistTvSeriesCommentProps) => {
	const { closeModal } = useModal();
	const { t } = useT();
	const [comment, setComment] = useState<string>(watchlistItem?.comment ?? '');
	const updateWatchlistTvSeries = useUserWatchlistTvSeriesUpdateMutation();

	useEffect(() => {
		setComment(watchlistItem?.comment ?? '');
	}, [watchlistItem?.comment]);

	async function onSubmit() {  
		if (comment == watchlistItem?.comment) {
			closeModal(props.id);
			return;
		}
		if (!watchlistItem?.id) {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
			return;
		}
		await updateWatchlistTvSeries.mutateAsync({
			watchlistId: watchlistItem?.id,
			comment: comment,
		}, {
			onSuccess: () => {
				toast.success(upperFirst(t('common.messages.saved', { gender: 'male', count: 1 })));
				closeModal(props.id);
			},
			onError: () => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')));
			}
		});
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
				disabled={updateWatchlistTvSeries.isPending}
				className="col-span-3 resize-none h-48"
				placeholder={upperFirst(t('common.messages.add_comment', { count: 1 }))}
				/>
			</ModalBody>
			<ModalFooter>
				<Button type="submit" onClick={onSubmit}>{upperFirst(t('common.messages.save'))}</Button>
			</ModalFooter>
		</Modal>
	);
};

export {
	ModalUserWatchlistTvSeriesComment
}