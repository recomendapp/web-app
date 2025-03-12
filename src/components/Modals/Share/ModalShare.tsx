import { useModal } from "@/context/modal-context";
import { Modal, ModalBody, ModalType } from "../Modal";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { FacebookIcon, FacebookShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { MediaType } from "@/types/type.db";
import { ButtonCopy } from "@/components/utils/ButtonCopy";

interface ModalShareProps extends ModalType {
	title?: string | null;
	type?: 'playlist' | MediaType | null;
	path: string;
}

export const ModalShare = ({ title, type, ...props }: ModalShareProps) => {
	const { closeModal } = useModal();
	const url = `${location.origin}${props.path}`;
	return (
		<Modal open={props.open} onOpenChange={(open) => !open && closeModal(props.id)}>
			{/* <ModalHeader>
				<ModalTitle>
					Partager
				</ModalTitle>
				<ModalDescription>
					Partagez <strong>{title}</strong> avec vos amis
				</ModalDescription>
			</ModalHeader> */}
			<ModalBody>
				<div>
					<h3 className="text-lg font-semibold mb-2">Partager <strong>{title}</strong> via</h3>
					<div className="flex gap-2">
						<TwitterShareButton
						url={url}
						via={siteConfig.socials.twitter.username}
						>
							<XIcon size={32} round />
						</TwitterShareButton>
						{/* <FacebookMessengerShareButton
						url={url}
						>
							<FacebookMessengerIcon size={32} round />
						</FacebookMessengerShareButton> */}
						<FacebookShareButton
						url={url}
						>
							<FacebookIcon size={32} round />
						</FacebookShareButton>
						<WhatsappShareButton
						url={url}
						>
							<WhatsappIcon size={32} round />
						</WhatsappShareButton>
						<TelegramShareButton
						url={url}
						>
							<TelegramIcon size={32} round />
						</TelegramShareButton>
						<RedditShareButton
						url={url}
						>
							<RedditIcon size={32} round />
						</RedditShareButton>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-2">Lien</h3>
					<div className="flex space-x-2">
						<Input value={url} readOnly />
						<ButtonCopy text={url} variant={'accent-yellow'} />
					</div>
				</div>

			</ModalBody>
		</Modal>
	);
}