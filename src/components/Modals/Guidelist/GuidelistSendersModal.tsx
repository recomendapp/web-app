'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import UserCard from "@/components/User/UserCard/UserCard";
import { UserMovieGuidelistView } from "@/types/type.db";
import { Modal, ModalBody, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { useModal } from "@/context/modal-context";

interface GuidelistSendersModalProps extends ModalType {
	  comments: UserMovieGuidelistView['senders'];
}

export const GuidelistSendersModal = ({
	comments,
	...props
  } : GuidelistSendersModalProps) => {
	const { closeModal } = useModal();
	return (
		<Modal
			open={props.open}
			onOpenChange={(open) => !open && closeModal(props.id)}
		>
			<ModalHeader>
				<ModalTitle>Recos</ModalTitle>
			</ModalHeader>
			<ModalBody>
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
			</ModalBody>
		</Modal>
	);
};