import { Button } from '@/components/ui/button';
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';
import { MoreHorizontal } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MediaType, UserReview } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { Icons } from '@/config/icons';
import { useModal } from '@/context/modal-context';
import { useUserReviewDeleteMutation } from '@/features/client/user/userMutations';
import { getMediaUrl } from '@/hooks/get-media-details';

export function ReviewSettings({
	review,
	mediaId,
	mediaType,
} : {
	review: UserReview;
	mediaId: number;
	mediaType: MediaType;
}) {
	const { user } = useAuth();
	const common = useTranslations('common');
	const { createConfirmModal } = useModal();
	const pathname = usePathname();
	const router = useRouter();
	const deleteReview = useUserReviewDeleteMutation({
		userId: user?.id,
		mediaId,
		mediaType,
	});

	const handleDeleteReview = async () => {
		await deleteReview.mutateAsync({
			id: review.id,
		}, {
			onSuccess: () => {
				const mediaUrl = getMediaUrl({ id: mediaId, type: mediaType });
				toast.success(upperFirst(common('word.deleted')));
				if (pathname.startsWith(`${mediaUrl}/review/${review.id}`)) {
					router.replace(mediaUrl);
				}
				// if (pathname.startsWith(`@${review?.user?.username}/film/${review?.movie_id}`)) {
				// 	router.refresh();
				// } else if (pathname.startsWith(`/film/${review?.movie_id}/review/${review?.id}`)) {
				// 	router.push(`/film/${review?.movie_id}`);
				// }
			},
			onError: () => {
				toast.error(upperFirst(common('errors.an_error_occurred')));
			}
		});
	};

	if (user?.id != review.user?.id) return null;
  
	return (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
		<Button variant="ghost" size={'icon'} className="rounded-full">
			<span className="sr-only">{upperFirst(common('sr.open_menu'))}</span>
			<MoreHorizontal />
		</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
		{/* {(!user || user.id != review?.user_id) && (
			<DropdownMenuItem onSelect={() => setIsOpen(true)}>
			Signaler la critique
			</DropdownMenuItem>
		)} */}
		{user && user.id == review?.user_id && (
			<DropdownMenuItem
			onSelect={() => createConfirmModal({
				title: 'Supprimer la critique',
				description: 'Voulez-vous vraiment supprimer cette critique ?',
				onConfirm: () => handleDeleteReview(),
			})}
			>
			<Icons.delete />
			{upperFirst(common('word.delete'))}
			</DropdownMenuItem>
		)}
		</DropdownMenuContent>
	</DropdownMenu>
	);
  }
  