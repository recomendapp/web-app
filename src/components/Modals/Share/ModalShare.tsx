import { useModal } from "@/context/modal-context";
import { Modal, ModalBody, ModalDescription, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/config/icons";
import { useState } from "react";
import copyToClipboard from "@/hooks/copy-to-clipboard";
import { siteConfig } from "@/config/site";
import { FacebookIcon, FacebookShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { MediaType } from "@/types/type.db";

interface ModalShareProps extends ModalType {
	title?: string | null;
	type?: 'playlist' | MediaType | null;
	path: string;
}

export const ModalShare = ({ title, type, ...props }: ModalShareProps) => {
	const { closeModal } = useModal();
	const [copyDone, setCopyDone] = useState(false);
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
						<Button
						variant={'accent-1'}
						className="shrink-0"
						onClick={() => {
							copyToClipboard(url);
							setCopyDone(true);
						}}
						>
							<span className="sr-only">Copy Link</span>
							{copyDone ? <Icons.copyDone /> : <Icons.copy />}
						</Button>
					</div>
				</div>

			</ModalBody>
		</Modal>
	);
}