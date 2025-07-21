import { Button } from '@/components/ui/button';
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';
import { MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import { Media, User, UserReview } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { Icons } from '@/config/icons';
import { useModal } from '@/context/modal-context';
import { useUserReviewDeleteMutation } from '@/features/client/user/userMutations';
import { getMediaUrl } from '@/utils/get-media-details';
import { usePathname, useRouter } from '@/lib/i18n/routing';

export function ReviewSettings({
	mediaId,
	media,
	review,
	author,
} : {
	mediaId: number;
	media: Media;
	review: UserReview;
	author: User;
}) {
	const { user } = useAuth();
	const common = useTranslations('common');
	const { createConfirmModal } = useModal();
	const pathname = usePathname();
	const router = useRouter();
	const deleteReview = useUserReviewDeleteMutation({
		userId: user?.id,
		mediaId,
	});

	const handleDeleteReview = async () => {
		await deleteReview.mutateAsync({
			id: review.id,
		}, {
			onSuccess: () => {
				const mediaUrl = getMediaUrl({ id: media.id, type: media.media_type! });
				toast.success(upperFirst(common('word.deleted')));
				if (pathname.startsWith(`/review/${review.id}`)) {
					router.replace(mediaUrl);
				}
			},
			onError: () => {
				toast.error(upperFirst(common('errors.an_error_occurred')));
			}
		});
	};

	if (user?.id != author?.id) return null;
  
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
		{user && user.id == author?.id ? (
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
		) : null}
		</DropdownMenuContent>
	</DropdownMenu>
	);
  }
  