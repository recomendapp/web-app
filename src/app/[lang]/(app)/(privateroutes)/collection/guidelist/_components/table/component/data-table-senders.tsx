import { GuidelistSendersModal } from "@/components/modals/Guidelist/GuidelistSendersModal";
import { UserAvatar } from "@/components/User/UserAvatar/UserAvatar";
import { useModal } from "@/context/modal-context";
import { UserMovieGuidelistView } from "@/types/type.db";
import { Row } from "@tanstack/react-table";
import { Text } from "lucide-react";

export default function Senders({
	row,
} : {
	row: Row<UserMovieGuidelistView>
}) {
	const senderToShow = 2;

	const { openModal } = useModal();

	return (
		<div
			onClick={() => openModal(GuidelistSendersModal, { comments: row.original?.senders })}
			className="flex w-fit items-center -space-x-2  cursor-pointer "
		>
			<div className="flex justify-end flex-row-reverse -space-x-4 space-x-reverse">
				{row.original?.senders?.slice(0, senderToShow).reverse().map((item: any) => (
				<div key={item?.id} className='relative'>
					<UserAvatar className=" border-2 border-background" avatar_url={item.user.avatar_url} username={item.user.username} />
					{item?.comment && <Text size={15} className='absolute -top-1 -right-1 rounded-full bg-background text-accent-1 p-1'/>}
				</div>
				))}
			</div>
			{row.original?.senders?.length! > senderToShow && (
				<div className="flex items-center justify-center bg-muted rounded-full h-8 w-8 text-sm">
					+{row.original?.senders?.length! - senderToShow}
				</div>
			)}
		</div>
	)
}