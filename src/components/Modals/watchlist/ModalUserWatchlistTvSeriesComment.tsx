'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/context/modal-context";
import { UserWatchlistTvSeries } from "@/types/type.db";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { useUserWatchlistTvSeriesUpdateMutation } from "@/features/client/user/userMutations";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";

interface ModalUserWatchlistTvSeriesCommentProps extends ModalType {
	watchlistItem: UserWatchlistTvSeries;
}

const ModalUserWatchlistTvSeriesComment = ({
	watchlistItem,
	...props
} : ModalUserWatchlistTvSeriesCommentProps) => {
	const { closeModal } = useModal();
	const common = useTranslations('common');
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
			toast.error(upperFirst(common('messages.an_error_occurred')));
			return;
		}
		await updateWatchlistTvSeries.mutateAsync({
			watchlistId: watchlistItem?.id,
			comment: comment,
		}, {
			onSuccess: () => {
				toast.success(upperFirst(common('messages.saved', { gender: 'male', count: 1 })));
				closeModal(props.id);
			},
			onError: () => {
				toast.error(upperFirst(common('messages.an_error_occurred')));
			}
		});
	}
  
	return (
		<Modal open={props.open} onOpenChange={(open) => !open && closeModal(props.id)}>
			<ModalHeader>
				<ModalTitle>{upperFirst(common('messages.comment', { count: 1 }))}</ModalTitle>
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
				placeholder={upperFirst(common('messages.add_comment', { count: 1 }))}
				/>
			</ModalBody>
			<ModalFooter>
				<Button type="submit" onClick={onSubmit}>{upperFirst(common('messages.save'))}</Button>
			</ModalFooter>
		</Modal>
	);
};

export {
	ModalUserWatchlistTvSeriesComment
}