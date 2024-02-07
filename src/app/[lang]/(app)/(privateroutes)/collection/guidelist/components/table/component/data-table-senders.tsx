import GuidelistSendersModal from "@/components/Modals/Guidelist/GuidelistSendersModal";
import UserAvatar from "@/components/User/UserAvatar/UserAvatar";
import { useModal } from "@/context/modal-context";
import { UserMovieGuidelist, UserMovieGuidelistItem } from "@/types/type.db";
import { Row } from "@tanstack/react-table";
import { Text } from "lucide-react";

export default function Senders({
	row,
} : {
	row: Row<UserMovieGuidelist>
}) {
	const senderToShow = 2;

	const { openModal } = useModal();

	return (
		<div
			onClick={() => openModal({
				id: `guidelist-${row.original?.id}-senders`,
				header: {
					title: 'Reco par',
				},
				content: <GuidelistSendersModal id={`guidelist-${row.original?.id}-senders`} guidelist_id={row.original?.id!}/>,
			})}
			className="flex w-fit items-center -space-x-2  cursor-pointer "
		>
			<div className="flex justify-end flex-row-reverse -space-x-4 space-x-reverse">
				{row.original?.senders?.slice(0, senderToShow).reverse().map((item: UserMovieGuidelistItem) => (
				<div key={item?.id} className='relative'>
					<UserAvatar user={item?.user} className=" border-2 border-background"/>
					{item?.comment && <Text size={15} className='absolute -top-1 -right-1 rounded-full bg-background text-accent-1 p-1'/>}
				</div>
				))}
			</div>
			{row.original?.senders_count![0].count! > senderToShow && (
				<div className="flex items-center justify-center bg-muted rounded-full h-8 w-8 text-sm">
					+{row.original?.senders_count![0].count! - senderToShow}
				</div>
			)}
		</div>
	)
}